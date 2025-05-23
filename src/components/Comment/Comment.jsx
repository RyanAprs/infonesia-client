import { MessageCircle, MoreVertical, Trash, Pencil } from "lucide-react";
import { DateFormat } from "../../utils/DateFormat";
import UseAuthManager from "../../store/AuthProvider";
import { Link } from "react-router-dom";
import { getUserById } from "../../services/UserService";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { CommentSchema } from "../../validations/CommentSchema";
import { ZodError } from "zod";
import { deleteComment, updateComment } from "../../services/CommentService";
import LoadingPage from "../Loading/LoadingPage";
import ErrorConnection from "../errorConnection/errorConnection";

const Comment = ({
  data,
  handleSubmitComment,
  comment,
  setComment,
  error,
  fetchData,
}) => {
  const { isAuthenticated, token } = UseAuthManager();
  const [users, setUsers] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [showDropdown, setShowDropdown] = useState(null);
  const [loadingPage, setLoadingPage] = useState(false);
  const [isConnectionError, setIsConnectionError] = useState(false);
  const [errors, setErrors] = useState({});

  const decoded = jwtDecode(token);
  const id = decoded.id;

  const comments = data.comments;
  const uniqueUserIds = comments.reduce((acc, comment) => {
    acc[comment.userId] = true;
    return acc;
  }, {});

  const fetchUsers = async () => {
    try {
      const userPromises = Object.keys(uniqueUserIds).map((userId) =>
        getUserById(userId)
      );

      console.log(data);

      const fetchedUsers = await Promise.all(userPromises);

      const usersObject = fetchedUsers.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});

      setUsers(usersObject);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditContent(content);
    setShowDropdown(null);
    setErrors({});
  };

  const handleUpdateComment = async (commentId) => {
    setLoadingPage(true);
    try {
      CommentSchema.parse({ content: editContent });

      const response = await updateComment(token, commentId, editContent);

      if (response && response.status === 200) {
        setEditingCommentId(null);
        setEditContent("");
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
      }
    } finally {
      setLoadingPage(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    setLoadingPage(true);
    try {
      const response = await deleteComment(token, commentId);

      if (response && response.status === 200) {
        setShowDropdown(null);
        await fetchData();
      }
    } catch (error) {
      console.log(error);
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

  const CommentActions = ({ comment }) => {
    if (!isAuthenticated || id !== comment.userId) return null;

    return (
      <div className="relative">
        <button
          onClick={() =>
            setShowDropdown(showDropdown === comment.id ? null : comment.id)
          }
          className="p-1 hover:bg-gray-200 rounded-full"
        >
          <MoreVertical size={16} />
        </button>

        {showDropdown === comment.id && (
          <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-lg py-1 w-32 z-10">
            <button
              onClick={() => handleEdit(comment.id, comment.content)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
            >
              <Pencil size={16} />
              Edit
            </button>
            <button
              onClick={() => handleDeleteComment(comment.id)}
              className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 flex items-center gap-2"
            >
              <Trash size={16} />
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="border-t pt-8">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle size={20} className="text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          Comments ({data._count.comments})
        </h2>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        {isAuthenticated ? (
          <>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Leave a comment..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              rows={3}
            />

            <div className="flex flex-col">
              {error && <span className="text-red-500">{error.content}</span>}
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Post Comment
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center">
            <Link
              to="/login"
              className="bg-blue-600 w-1/4 text-white p-4 text-center rounded-lg"
            >
              Login For Comment
            </Link>
          </div>
        )}
      </form>

      <div className="space-y-4">
        {data.comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  {users[comment.userId]?.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {users[comment.userId]?.fullName || "Anonymous"}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {DateFormat(comment.createdAt)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CommentActions comment={comment} />
              </div>
            </div>

            {editingCommentId === comment.id ? (
              <div className="mt-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  rows={3}
                />
                {errors && (
                  <span className="text-red-500">{errors.content}</span>
                )}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleUpdateComment(comment.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingCommentId(null)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-700">{comment.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
