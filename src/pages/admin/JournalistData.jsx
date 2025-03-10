import { useEffect, useState } from "react";
import CustomTable from "../../components/table/customTable";
import {
  createJournalist,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "../../services/UserService";
import UseAuthManager from "../../store/AuthProvider";
import { InputText } from "primereact/inputtext";
import { Bounce, toast, ToastContainer } from "react-toastify";
import FormModal from "../../components/modal/FormModal";

const JournalistData = () => {
  const { token } = UseAuthManager();
  const role = "JOURNALIST";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [JournalistData, setJournalistData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isCreateAndUpdateModalOpen, setIsCreateAndUpdateModalOpen] =
    useState(false);
  const [isdeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const columns = [
    { field: "fullName", header: "Nama Jurnalis" },
    { field: "email", header: "Email" },
  ];

  const fetchJournalist = async () => {
    const response = await getAllUser(token, role);
    setData(response);
  };

  const handleCreateModalOpen = () => {
    setJournalistData({
      fullName: "",
      email: "",
      password: "",
    });
    setIsCreateAndUpdateModalOpen(true);
    setIsUpdateMode(false);
  };

  const handleUpdateModalOpen = async (data) => {
    setIsCreateAndUpdateModalOpen(true);
    setIsUpdateMode(true);
    setCurrentId(data.id);
    try {
      const response = await getUserById(token, data.id);
      setJournalistData({
        fullName: response.fullName,
        email: response.email,
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteModalOpen = (data) => {
    setIsDeleteModalOpen(true);
    setCurrentId(data.id);
    setCurrentEmail(data.email);
  };

  const handleCreateJournalist = async () => {
    setLoading(true);

    if (
      !JournalistData.fullName ||
      !JournalistData.email ||
      !JournalistData.password
    ) {
      setError("input tidak boleh kosong");
      setLoading(false);
      return;
    }

    try {
      const data = {
        fullName: JournalistData.fullName,
        email: JournalistData.email,
        password: JournalistData.password,
      };

      const response = await createJournalist(token, data);

      if (response.status === 201) {
        toast.success("Create Jurnalis Berhasil!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        fetchJournalist();
        setIsCreateAndUpdateModalOpen(false);
      }
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 409) {
        toast.error("Email sudah terdaftar, gunakan email yang lain!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateJournalist = async () => {
    setLoading(true);

    if (!JournalistData.fullName || !JournalistData.email) {
      setError("input tidak boleh kosong");
      setLoading(false);
      return;
    }

    try {
      const data = {
        fullName: JournalistData.fullName,
        email: JournalistData.email,
        password: JournalistData.password,
      };

      const response = await updateUser(token, currentId, data);

      if (response.status === 200) {
        toast.success("Update Jurnalis Berhasil!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        fetchJournalist();
        setIsCreateAndUpdateModalOpen(false);
      }
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status === 422) {
        toast.error("Email sudah terdaftar, gunakan email yang lain!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJournalist = async () => {
    setLoading(true);
    try {
      const response = await deleteUser(token, currentId);
      if (response.status === 200) {
        toast.success("Delete Jurnalis Berhasil!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        fetchJournalist();
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournalist();
  }, []);

  return (
    <div className="min-h-screen flex flex-col gap-4 p-4 z-10">
      <ToastContainer />
      <div className="min-h-screen  bg-white rounded-xl">
        <CustomTable
          columns={columns}
          data={data}
          onCreate={handleCreateModalOpen}
          onEdit={handleUpdateModalOpen}
          onDelete={handleDeleteModalOpen}
        />
      </div>

      <FormModal
        visible={isCreateAndUpdateModalOpen}
        onHide={() => setIsCreateAndUpdateModalOpen(false)}
        title={isUpdateMode ? "Perbarui Data Jurnalis" : "Tambah Data Jurnalis"}
        onSubmit={
          isUpdateMode ? handleUpdateJournalist : handleCreateJournalist
        }
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="-mb-3">
              Nama Jurnalis
            </label>
            <InputText
              type="text"
              placeholder="Nama Jurnalis"
              className="p-input text-lg p-3 rounded border-2"
              value={JournalistData.fullName}
              onChange={(e) =>
                setJournalistData((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
              }
            />

            <label htmlFor="" className="-mb-3">
              Email:
            </label>
            <InputText
              type="email"
              placeholder="Email"
              className="p-input text-lg p-3 rounded border-2"
              value={JournalistData.email}
              onChange={(e) =>
                setJournalistData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />

            <label htmlFor="" className="-mb-3">
              Password:
            </label>
            <input
              type="password"
              placeholder="Password"
              className="p-input text-lg p-3 rounded border-[2px]"
              value={JournalistData.password}
              onChange={(e) =>
                setJournalistData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
            <span className="text-sm -mt-4">
              {isUpdateMode
                ? "*Kosongkan password jika tidak ingin diubah"
                : null}
            </span>

            {error && <span className="text-red-500">{error}</span>}
          </div>
        </div>
      </FormModal>

      <FormModal
        visible={isdeleteModalOpen}
        onHide={() => setIsDeleteModalOpen(false)}
        title={"Hapus Data Jurnalis"}
        onSubmit={handleDeleteJournalist}
        submitLabel={"Hapus"}
        isLoading={loading}
      >
        <div className="text-xl">
          <h1>Apakah anda yakin akan menghapus data {currentEmail}?</h1>
        </div>
      </FormModal>
    </div>
  );
};

export default JournalistData;
