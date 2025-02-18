import React from "react";
import Input from "./Input";
import Select from "./Select";
import { statusOpt, typeOpt } from "../../api/constants";
import "./create.scss";
import api from "./../../api/index";
import { useDispatch } from "react-redux";
import { createJob } from "../../redux/slices/jobSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // form gönderilme
  const handleSubmit = (e) => {
    e.preventDefault();
    // formData oluştur
    const formData = new FormData(e.target);
    const jobData = Object.fromEntries(formData.entries());
    // tarih ekleme
    jobData.date = Date.now();

    // apiye kaydetme
    api
      .post("/jobs", jobData)
      .then((res) => {
        dispatch(createJob(res.data));
        navigate("/");
        toast.success("İş başarıyla eklendi");
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("İş eklenirken bir sorun oluştu");
      });
  };
  return (
    <div className="add-page">
      <section className="container">
        <h2>Yeni İş Ekle</h2>
        <form onSubmit={handleSubmit}>
          <Input label="Pozisyon" name="position" />
          <Input label="Şirket" name="company" />
          <Input label="Lokasyon" name="location" />
          <Select label="Durum" name="status" options={statusOpt} />
          <Select label="Tür" name="type" options={typeOpt} />
          <div className="btn-wrapper">
            <button className="btn-shine">
              <span>Gönder</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Create;
