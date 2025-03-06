import CustomTable from "../../components/table/customTable";

const data = [
  {
    fullName: "Ryan",
    email: "ryan@gmail.com",
  },
  {
    fullName: "Ryan",
    email: "ryan@gmail.com",
  },
  {
    fullName: "Ryan",
    email: "ryan@gmail.com",
  },
];

const UserData = () => {
  const columns = [
    { field: "fullName", header: "Nama Pengguna" },
    { field: "email", header: "Email" },
  ];
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
