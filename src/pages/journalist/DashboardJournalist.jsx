import { Newspaper, ClipboardList } from "lucide-react";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";

const DashboardJournalist = () => {
  const navigate = useNavigate();

  const list = [
    {
      icon: <Newspaper size={54} strokeWidth={1.2} />,
      title: "Berita",
      desc: "Kelola data berita",
      route: "/admin/berita",
    },
    {
      icon: <ClipboardList size={54} strokeWidth={1.2} />,
      title: "Kategori",
      desc: "Kelola data kategori",
      route: "/admin/kategori",
    },
  ];

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen flex flex-col gap-4 p-4 z-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {list.map((item, index) => (
          <div
            onClick={() => handleCardClick(item.route)}
            className=" shadow-md rounded-xl w-full h-full p-ripple"
            key={index}
          >
            <Card
              key={index}
              className="min-w-10  flex flex-col items-center justify-center cursor-pointer "
              style={{ fontFamily: "Poppins" }}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-xl font-semibold mb-4">{item.title}</div>
                {item.icon && <div className="text-4xl mb-4">{item.icon}</div>}
                <div className="text-xl text-center">{item.desc}</div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardJournalist;
