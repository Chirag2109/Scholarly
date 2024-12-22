import NewsCard from "../../components/NewsCard";
import "./style.css";

const news=[
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

function News() {
    return (
        <div className="news-container">
            {news.map((section) => (
                <NewsCard key={section.id} section={section} />
            ))}
        </div>
    );
}

export default News;