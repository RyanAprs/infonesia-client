import { useEffect, useState } from "react";
import CustomTable from "../../components/table/customTable";
import { getAllUser } from "../../services/UserService";
import UseAuthManager from "../../store/AuthProvider";

const UserData = () => {
  const { token } = UseAuthManager();
  const role = "USER";
  const [data, setData] = useState([]);

  const columns = [
    { field: "fullName", header: "Nama Pengguna" },
    { field: "email", header: "Email" },
  ];

  const fetchUser = async () => {
    const response = await getAllUser(token, role);
    setData(response);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col gap-4 p-4 z-10">
      <div className="min-h-screen  bg-white rounded-xl">
        <CustomTable
          columns={columns}
          data={data}
          onDelete={""}
          onEdit={""}
          onCreate={""}
        />
      </div>
    </div>
  );
};

export default UserData;
