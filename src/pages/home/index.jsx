import React from "react";
import Filter from "./../../components/filter/index";
import { useSelector } from "react-redux";
import Error from "./../../components/error/index";
import Loader from "./../../components/loader/index";
import Card from "./../../components/card/index";

import "./home.scss";
const Home = () => {
  const { jobs, isLoading, error } = useSelector((store) => store.job);
  return (
    <div className="home-page">
      <Filter />

      <div className="cards-wrapper">
        {isLoading ? <Loader /> : error && <Error />}
        {jobs.map((job) => (
          <Card key={job.id} job={job} />
        ))}
      </div>
      {jobs.length === 0 && (
        <div className="empty">
          Arama yaptığınızda herhangi bir iş bulunamadı
        </div>
      )}
    </div>
  );
};

export default Home;
