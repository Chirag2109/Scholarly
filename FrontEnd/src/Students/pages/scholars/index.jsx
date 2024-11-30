import PersonCard from "../../components/PersonCard";
import "./style.css";

const scholar = [
    {
        image: "https://via.placeholder.com/150",
        name: "John Doe",
        title: "Software Engineer at TechCorp",
    },
    {
        image: "https://via.placeholder.com/150",
        name: "Jane Smith",
        title: "Product Manager at Innovate Inc.",
    },
    {
        image: "https://via.placeholder.com/150",
        name: "Mike Johnson",
        title: "UI/UX Designer at Creative Studio",
    },
];

function Scholars() {
    return (
        <div className="PersonCard">
            <h1>People You May Know</h1>
            <div className="scholar-list">
                {scholar.map((person, index) => (
                    <PersonCard key={index} person={person}/>
                ))}
            </div>
        </div>
    );
}

export default Scholars;