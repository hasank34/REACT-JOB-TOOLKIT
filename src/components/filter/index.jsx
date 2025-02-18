import React, { useEffect, useState } from "react";
import Input from "./../../pages/create/Input";
import Select from "./../../pages/create/Select";
import { sortOpt, statusOpt, typeOpt } from "./../../api/constants";
import api from "./../../api/index";
import { useDispatch } from "react-redux";
import { setError, setJobs, setLoading } from "../../redux/slices/jobSlice";

const Filter = () => {
  const [text, setText] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const [sort, setSort] = useState();
  const [debouncedText, setDebouncedText] = useState();
  const dispacth = useDispatch();
  /*
   * Debounce
   * Bir fonksiyonun çok sık gerçekleşmesini önlemek için kullanılır.Her tuşa
   * basıldığında arama yapmak yerine, kullanıcının yazmayı bitirmesini bekleyip,
   * belirli bir süre geçtikten sonra arama yapar.
   * Bu işlem performansı arttırır gereksiz ağ isteklerini ve renderları önler.
   */
  useEffect(() => {
    // if (!text) return;
    // her tuş vuruşunda bir sayaç başlat ve sayaç bitiminde elde edilen metni state'e aktar
    const timer = setTimeout(() => {
      setDebouncedText(text);
    }, 1000);

    // eğer süre bitmeden useEffect tekrar çalışırsa (yeni tuşa basılırsa) önceki sayısı iptal et
    return () => {
      clearTimeout(timer);
    };
  }, [text]);
  // filtrelere göre apiden verileri al
  useEffect(() => {
    const params = {
      q: debouncedText || undefined,
      status: status || undefined,
      type: type || undefined,
      _sort: sort === "a-z" || sort === "z-a" ? "company" : "date",
      _order: sort === "a-z" || sort === "En Eski" ? "asc" : "desc",
    };
    dispacth(setLoading());
    api
      .get("/jobs", { params })
      .then((res) => {
        dispacth(setJobs(res.data));
      })
      .catch((err) => dispacth(setError(err.message)));
  }, [debouncedText, status, type, sort]);

  // bütün filtreleri sıfırla
  const handleReset = (e) => {
    // inputları sıfırla
    e.target.reset();
    // stateleri sıfırla
    setText();
    setStatus();
    setType();
    setSort();
    setDebouncedText();
    // filtreleri sıfırlarken loading durumunu kaldır
    dispacth(setLoading(false));
    // error durumunu sıfırla
    dispacth(setError(null));
  };
  return (
    <div className="filter-sec">
      <h2>Filtreleme Formu</h2>

      <form onReset={handleReset}>
        <Input label="Ara" handleChange={(e) => setText(e.target.value)} />

        <Select
          label="Durum"
          options={statusOpt}
          handleChange={(e) => setStatus(e.target.value)}
        />
        <Select
          label="Tür"
          options={typeOpt}
          handleChange={(e) => setType(e.target.value)}
        />
        <Select
          label="Sırala"
          options={sortOpt}
          handleChange={(e) => setSort(e.target.value)}
        />

        <div className="btn-wrapper">
          <button type="reset" className="btn-shine">
            <span>Filtreleri Sıfırla</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(Filter);
