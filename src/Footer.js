import React, { useState, useEffect } from "react";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://covidapi.info/api/v1/",
  loading: true,
});

const Footer = () => {
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchDate = async () => {
    try {
      let response = await instance.get(`global`);
      let fetchedData = response.data;
      if (loading) {
        setDate(fetchedData.date);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDate();
  });

  return (
    <footer className="sticky-footer">
      <div className="container">
        <div className="text-center">
          <small>
            Copyright © <a href="https://github.com/moe9195">Mohammad Rahmeh</a>{" "}
            2020<br></br> Data Obtained From{" "}
            <a href="https://github.com/backtrackbaba/covid-api">
              CovidAPI.info
            </a>{" "}
            <br></br>Last Updated: {loading ? "" : `${date}`}
            <br></br>
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
