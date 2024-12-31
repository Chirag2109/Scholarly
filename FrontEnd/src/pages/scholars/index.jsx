import PersonCard from "../../components/PersonCard";
import { useEffect, useState } from "react";
import "./style.css";

function Scholars() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `${import.meta.env.VITE_NODEJS_BACKEND}/user/`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch scholars.");
                }
                const data = await response.json();
                setUsers(data || []); // Adjust based on the API response
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAchievements();
    }, []);

    return (
        <div className="PersonCard">
            <h1>People You May Know</h1>
            <div className="scholar-list">
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : error ? (
                    <div className="error">{error}</div>
                ) : (
                    <PersonCard users={users} />
                )}
            </div>
        </div>
    );
}

export default Scholars;