import React, { useState, useEffect } from "react";
import "./style.css";
import Lectures from "../../components/Lectures";

const Videos = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_NODEJS_BACKEND}/videos/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch achievements.");
        }
        const data = await response.json();
        setLectures(data.videos || []); // Adjust based on the API response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-body">
        <div className="content">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <Lectures lectures={lectures} get={true} upload={false}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Videos;