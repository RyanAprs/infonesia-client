import { useParams } from "react-router-dom";
import { getArticleByTitle } from "../../services/ArticleService";
import { useEffect } from "react";

const DetailArticle = () => {
  const { slug } = useParams();

  const fetchData = async () => {
    try {
      const response = await getArticleByTitle(slug);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(slug);
  }, []);
  return <div>DetailArticle</div>;
};

export default DetailArticle;
