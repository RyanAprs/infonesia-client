import { useParams } from "react-router-dom";
import { getArticleByTitle } from "../../services/ArticleService";
import { useEffect, useRef, useState } from "react";
import { Calendar, Clock, Tag } from "lucide-react";
import LoadingPage from "../../components/Loading/LoadingPage";
import ErrorConnection from "../../components/errorConnection/errorConnection";
import { DateFormat } from "../../utils/DateFormat";
import Comment from "../../components/Comment/Comment";
import { postComment } from "../../services/CommentService";
import UseAuthManager from "../../store/AuthProvider";
import { Toast } from "primereact/toast";
import { ZodError } from "zod";
import { CommentSchema } from "../../validations/CommentSchema";

const baseUrl = `${import.meta.env.VITE_API_BASE_URI}/uploads/images/`;

const DetailArticle = () => {
  const { slug } = useParams();
  const { token } = UseAuthManager();
  const [comment, setComment] = useState("");
  const [loadingPage, setLoadingPage] = useState(false);
  const [data, setData] = useState(null);
  const [isConnectionError, setIsConnectionError] = useState(false);
  const [id, setId] = useState("");
  const toast = useRef(null);
  const [errors, setErrors] = useState({});

  const fetchData = async () => {
    try {
      setLoadingPage(true);
      const response = await getArticleByTitle(slug);

      setId(response.id);
      setData(response);
    } catch (error) {
      if (
        error.code === "ERR_NETWORK" ||
        error.code === "ETIMEDOUT" ||
        error.code === "ECONNABORTED" ||
        error.code === "ENOTFOUND" ||
        error.code === "ECONNREFUSED" ||
        error.code === "EAI_AGAIN" ||
        error.code === "EHOSTUNREACH" ||
        error.code === "ECONNRESET" ||
        error.code === "EPIPE"
      ) {
        setIsConnectionError(true);
      }
    } finally {
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    setLoadingPage(true);
    setErrors({});

    try {
      CommentSchema.parse({ content: comment });

      const response = await postComment(token, id, comment);

      if (response && response.status === 201) {
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Comment posted successfully",
          life: 3000,
        });

        setComment("");

        await fetchData();
      }
    } catch (error) {
      console.error("Comment submission error:", error);

      if (error instanceof ZodError) {
        const newErrors = {};
        error.errors.forEach((e) => {
          newErrors[e.path[0]] = e.message;
        });
        setErrors(newErrors);

        toast.current?.show({
          severity: "error",
          summary: "Validation Error",
          detail: "Please check your comment",
          life: 3000,
        });
      } else if (
        error.code === "ERR_NETWORK" ||
        error.code === "ETIMEDOUT" ||
        error.code === "ECONNABORTED" ||
        error.code === "ENOTFOUND" ||
        error.code === "ECONNREFUSED" ||
        error.code === "EAI_AGAIN" ||
        error.code === "EHOSTUNREACH" ||
        error.code === "ECONNRESET" ||
        error.code === "EPIPE"
      ) {
        setIsConnectionError(true);

        toast.current?.show({
          severity: "error",
          summary: "Connection Error",
          detail: "Please check your internet connection",
          life: 3000,
        });
      }
    } finally {
      setLoadingPage(false);
    }
  };

  if (loadingPage) {
    return <LoadingPage />;
  }

  if (isConnectionError) {
    return <ErrorConnection fetchData={fetchData} />;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen ">
      <Toast
        ref={toast}
        position={window.innerWidth <= 767 ? "top-center" : "top-right"}
        style={{ zIndex: 10000 }}
      />
      <div className=" bg-white  mx-auto md:px-28 md:py-8 px-8 py-4">
        {/* Category */}
        <div className="mb-4">
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            {data.category.name}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          {data.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-gray-600 mb-6">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span className="text-sm">{DateFormat(data.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span className="text-sm">5 min read</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-video w-full mb-8 rounded-lg overflow-hidden bg-blue-100">
          {data.bannerImage ? (
            <img
              src={`${baseUrl}${data.bannerImage}`}
              alt={data.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-blue-500">
              Featured Image Placeholder
            </div>
          )}
        </div>

        {/* Content */}
        <div className="prose max-w-none mb-8">
          <p className="text-gray-700 leading-relaxed">{data.content}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12">
          <Tag size={16} className="text-blue-600" />
          {data.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm hover:bg-blue-100 transition cursor-pointer"
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* Comments Section */}
        <Comment
          error={errors}
          comment={comment}
          data={data}
          handleSubmitComment={handleSubmitComment}
          setComment={setComment}
        />
      </div>
    </div>
  );
};

export default DetailArticle;
