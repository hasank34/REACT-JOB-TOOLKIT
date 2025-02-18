import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Create from "./pages/create";
import Header from "./components/Header";
import { useEffect } from "react";
import api from "./api";
import { useDispatch } from "react-redux";
import { setError, setJobs, setLoading } from "./redux/slices/jobSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    api
      .get("/jobs", {
        params: {
          _sort: "date",
          _order: "desc",
        },
      })
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => setError(err.message));
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
