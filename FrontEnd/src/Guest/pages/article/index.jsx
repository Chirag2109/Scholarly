import ArticleCard from "../../components/ArticleCard";
import "./style.css";

const articles=[
    {
        id: 1,
        topic:"abc",
        description:"def",
        author:"ghi",
        date:"28/11/24",
    },
    {
        id: 2,
        topic:"abc",
        description:"def",
        author:"ghi",
        date:"28/11/24",
    },
    {
        id: 3,
        topic:"abc",
        description:"def",
        author:"ghi",
        date:"28/11/24",
    }
];

function Article() {
    return (
        <div className="container">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
}

export default Article;