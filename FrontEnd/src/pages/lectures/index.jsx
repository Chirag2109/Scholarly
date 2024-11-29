import VideoCard from "../../components/VideoCard";
import "./style.css";

const lectures=[
    {
        id: 1,
        title:"abc",
        description:"def",
        creator:"ghi",
        date:"28/11/24",
    },
    {
        id: 2,
        title:"abc",
        description:"def",
        creator:"ghi",
        date:"28/11/24",
    },
    {
        id: 3,
        title:"abc",
        description:"def",
        creator:"ghi",
        date:"28/11/24",
    }
];

function Lectures() {
    return (
        <div className="lectures-container">
            {lectures.map((lecture) => (
                <VideoCard key={lecture.id} lecture={lecture} />
            ))}
        </div>
    );
}

export default Lectures;