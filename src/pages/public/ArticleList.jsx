import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MessageCircle, Search, User } from "lucide-react";
import { getAllPublishedNews } from "../../services/ArticleService";
import ErrorConnection from "../../components/errorConnection/errorConnection";
import LoadingPage from "../../components/Loading/LoadingPage";
import { DateFormat } from "../../utils/DateFormat";

const baseUrl = `${import.meta.env.VITE_API_BASE_URI}/uploads/images/`;

const ArtikelList = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isConnectionError, setIsConnectionError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getAllPublishedNews();

      setArticles(response || []);
      setFilteredArticles(response || []);
      setLoading(false);
      setIsConnectionError(false);
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
      } else if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
          setIsConnectionError(false);
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const categories = articles
    ? [
        ...new Map(
          articles
            .map((item) =>
              item.category ? [item.category.id, item.category] : []
            )
            .filter((item) => item.length > 0)
        ).values(),
      ]
    : [];

  useEffect(() => {
    if (!articles) return;

    let filtered = [...articles];

    if (selectedCategory) {
      filtered = filtered.filter(
        (article) =>
          article.category && article.category.id === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          (article.title &&
            article.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (article.summary &&
            article.summary.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredArticles(filtered);
  }, [selectedCategory, searchTerm, articles]);

  if (loading) {
    <LoadingPage />;
  }

  if (isConnectionError) {
    <ErrorConnection fetchData={fetchData} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main content */}
      <main className="flex flex-col px-4 py-8">
        {/* Search and filter section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Cari berita..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  !selectedCategory
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                Semua
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {!loading &&
            !isConnectionError &&
            filteredArticles &&
            filteredArticles.length > 0 && (
              <div
                onClick={() => navigate(`/artikel/${filteredArticles[0].slug}`)}
                className="flex flex-col gap-4 bg-white p-2 rounded-xl cursor-pointer"
              >
                <div className="relative  h-64 md:h-96">
                  <img
                    src={`${baseUrl}${filteredArticles[0].bannerImage}`}
                    alt={filteredArticles[0].title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className=" rounded-xl p-6 ">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-5 text-sm text-gray-600">
                      {filteredArticles[0].author && (
                        <span className="flex items-center">
                          <User size={14} className="mr-1" />
                          {filteredArticles[0].author.fullName}
                        </span>
                      )}
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {DateFormat(filteredArticles[0].createdAt)}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {filteredArticles[0].title}
                    </h2>
                    <p className="text-gray-600">
                      {filteredArticles[0].summary}
                    </p>
                    <div className="text-blue-600 font-medium">
                      {filteredArticles[0].category && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                          {filteredArticles[0].category.name}
                        </span>
                      )}{" "}
                    </div>
                  </div>
                </div>
              </div>
            )}
          {/* Articles grid */}
          {!loading &&
            !isConnectionError &&
            filteredArticles &&
            filteredArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.slice(1).map((article) => (
                  <div
                    key={article.id}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/artikel/${article.slug}`)}
                  >
                    <div className="h-48 p-1">
                      <img
                        src={`${baseUrl}${article.bannerImage}`}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                      {" "}
                      <div className="flex items-center justify-between">
                        {article.author && (
                          <span className="text-xs text-gray-500 flex items-center">
                            <User size={12} className="mr-1" />
                            {article.author.fullName}
                          </span>
                        )}
                        <span className="text-xs text-gray-500 flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {DateFormat(article.createdAt)}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {article.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        {article.category && (
                          <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                            {article.category.name}
                          </span>
                        )}
                        {article._count && (
                          <span className="text-xs text-gray-500 flex items-center">
                            <MessageCircle size={12} className="mr-1" />
                            {article._count.comments} Komentar
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>

        {/* Empty state */}
        {!loading &&
          !isConnectionError &&
          (!filteredArticles || filteredArticles.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Tidak ada berita yang ditemukan.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchTerm("");
                }}
              >
                Reset Filter
              </button>
            </div>
          )}

        {/* Load more button */}
        {/* {!loading &&
          !isConnectionError &&
          filteredArticles &&
          filteredArticles.length > 0 && (
            <div className="mt-10 text-center">
              <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm font-medium">
                Muat Lebih Banyak
              </button>
            </div>
          )} */}
      </main>

      {/* Footer */}
      {/* <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Portal Berita</h3>
              <p className="text-gray-400">
                Portal berita terkini yang menyajikan informasi terpercaya dan
                terupdate dari berbagai kategori.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Kategori</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {category.name.charAt(0).toUpperCase() +
                        category.name.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Ikuti Kami</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Portal Berita. Hak Cipta Dilindungi.
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default ArtikelList;
