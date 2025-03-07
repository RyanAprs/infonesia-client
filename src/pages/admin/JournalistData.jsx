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
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { CustomModal } from "../../components/modal/CustomModal";
import { Bounce, toast, ToastContainer } from "react-toastify";

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

  const handleCreateUser = async () => {
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

  const handleUpdateUser = async () => {
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

  const handleDeleteUser = async () => {
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

  const formJournalistContent = (
    <>
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
        {isUpdateMode ? "*Kosongkan password jika tidak ingin diubah" : null}
      </span>

      {error && <span className="text-red-500">{error}</span>}

      <Button
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-400 text-white dark:bg-extraLightGreen   p-4 w-full flex justify-center rounded transition-all"
        onClick={isUpdateMode ? handleUpdateUser : handleCreateUser}
      >
        {loading ? (
          <ProgressSpinner
            style={{ width: "25px", height: "25px" }}
            strokeWidth="8"
            animationDuration="1s"
            color="black"
          />
        ) : (
          <p>Simpan</p>
        )}
      </Button>
    </>
  );

  const deleteUserContent = (
    <>
      <h1>Apakah anda yakin akan menghapus data {currentEmail}?</h1>
      <Button
        disabled={loading}
        className="bg-red-500 hover:bg-red-400 text-white dark:bg-extraLightGreen   p-4 w-full flex justify-center rounded transition-all"
        onClick={handleDeleteUser}
      >
        {loading ? (
          <ProgressSpinner
            style={{ width: "25px", height: "25px" }}
            strokeWidth="8"
            animationDuration="1s"
            color="black"
          />
        ) : (
          <p>Hapus</p>
        )}
      </Button>
    </>
  );

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

      <CustomModal
        isOpen={isCreateAndUpdateModalOpen}
        onClose={() => setIsCreateAndUpdateModalOpen(false)}
        title={isUpdateMode ? "Perbarui Data Jurnalis" : "Tambah Data Jurnalis"}
      >
        {formJournalistContent}
      </CustomModal>

      <CustomModal
        isOpen={isdeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={"Hapus Data Jurnalis"}
      >
        {deleteUserContent}
      </CustomModal>
    </div>
  );
};

export default JournalistData;
