import { MessageCircle } from "lucide-react";
import { DateFormat } from "../../utils/DateFormat";
import UseAuthManager from "../../store/AuthProvider";
import { Link } from "react-router-dom";
import { getUserById } from "../../services/UserService";
import { useEffect, useState } from "react";

const Comment = ({ data, handleSubmitComment, comment, setComment, error }) => {
  const { isAuthenticated } = UseAuthManager();
  const [users, setUsers] = useState({});

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

      const fetchedUsers = await Promise.all(userPromises);

      const usersObject = fetchedUsers.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});

      console.log(usersObject);

      setUsers(usersObject);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

            <div className="flex flex-col ">
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
          <div className="flex justify-center items-center ">
            <Link to="/login" className="bg-blue-600 w-1/4 text-white p-4 ">
              Login For Comment
            </Link>
          </div>
        )}
      </form>

      <div className="space-y-3">
        {data.comments.map((comment) => (
          <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">
                {users[comment.userId]?.fullName || "Anonymous"}
              </h3>
              <span className="text-sm text-gray-500">
                {DateFormat(comment.createdAt)}
              </span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
