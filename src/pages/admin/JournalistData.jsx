import { useEffect, useRef, useState } from "react";
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
import FormModal from "../../components/modal/FormModal";
import { Toast } from "primereact/toast";
import LoadingPage from "../../components/Loading/LoadingPage";
import ErrorConnection from "../../components/errorConnection/errorConnection";
import {
  UserCreateSchema,
  UserUpdateSchema,
} from "../../validations/UserSchema";
import { ZodError } from "zod";

const JournalistData = () => {
  const { token } = UseAuthManager();
  const role = "JOURNALIST";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isConnectionError, setisConnectionError] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [JournalistData, setJournalistData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isCreateAndUpdateModalOpen, setIsCreateAndUpdateModalOpen] =
    useState(false);
  const [isdeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toast = useRef(null);

  const columns = [
    { field: "fullName", header: "Nama Jurnalis" },
    { field: "email", header: "Email" },
  ];

  const fetchJournalist = async () => {
    try {
      setLoadingPage(true);
      const response = await getAllUser(token, role);
      setData(response);
      setisConnectionError(false);
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
        setisConnectionError(true);
      }
    } finally {
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    fetchJournalist();
  }, []);

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
        setisConnectionError(true);
      }
    } finally {
      setLoading(false);
      setisConnectionError(false);
    }
  };

  const handleDeleteModalOpen = (data) => {
    setIsDeleteModalOpen(true);
    setCurrentId(data.id);
    setCurrentEmail(data.email);
  };

  const handleCreateJournalist = async () => {
    setLoading(true);

    try {
      const data = {
        fullName: JournalistData.fullName,
        email: JournalistData.email,
        password: JournalistData.password,
      };

      UserCreateSchema.parse(data);

      const response = await createJournalist(token, data);

      if (response.status === 201) {
        fetchJournalist();
        setIsCreateAndUpdateModalOpen(false);
        setTimeout(() => {
          toast.current?.show({
            severity: "success",
            summary: "Berhasil",
            detail: "Data Pengguna Ditambahkan",
            life: 3000,
          });
        }, 100);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors = {};
        error.errors.forEach((e) => {
          newErrors[e.path[0]] = e.message;
        });
        setErrors(newErrors);
      } else if (error.response.status === 409) {
        toast.current.show({
          severity: "error",
          summary: "Gagal",
          detail: "Email sudah terdaftar, gunakan email yang lain!",
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
        setisConnectionError(true);
      }
    } finally {
      setLoading(false);
      setisConnectionError(false);
    }
  };

  const handleUpdateJournalist = async () => {
    setLoading(true);

    try {
      const data = {
        fullName: JournalistData.fullName,
        email: JournalistData.email,
        password: JournalistData.password,
      };

      UserUpdateSchema.parse(data);

      const response = await updateUser(token, currentId, data);

      if (response.status === 200) {
        fetchJournalist();
        setIsCreateAndUpdateModalOpen(false);
        setTimeout(() => {
          toast.current?.show({
            severity: "success",
            summary: "Berhasil",
            detail: "Data Jurnalis Diperbarui",
            life: 3000,
          });
        }, 100);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors = {};
        error.errors.forEach((e) => {
          newErrors[e.path[0]] = e.message;
        });
        setErrors(newErrors);
      } else if (error.response.status === 422) {
        toast.current.show({
          severity: "error",
          summary: "Gagal",
          detail: "Email sudah terdaftar, gunakan email yang lain!",
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
        setisConnectionError(true);
      }
    } finally {
      setLoading(false);
      setisConnectionError(false);
    }
  };

  const handleDeleteJournalist = async () => {
    setLoading(true);
    try {
      const response = await deleteUser(token, currentId);
      if (response.status === 200) {
        fetchJournalist();
        setIsDeleteModalOpen(false);
        setTimeout(() => {
          toast.current?.show({
            severity: "success",
            summary: "Berhasil",
            detail: "Data Jurnalis Dihapus",
            life: 3000,
          });
        }, 100);
      }
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
        setisConnectionError(true);
      } else if (error.response.status === 500) {
        toast.current?.show({
          severity: "error",
          summary: "Gagal",
          detail: "Data Jurnalis Ini Masih Terikat dengan Data Lain",
          life: 3000,
        });
      }
    } finally {
      setLoading(false);
      setisConnectionError(false);
    }
  };

  if (isConnectionError) {
    return <ErrorConnection fetchData={fetchJournalist} />;
  }

  if (loadingPage) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-screen flex flex-col gap-4 p-4 z-10">
      <Toast
        ref={toast}
        position={window.innerWidth <= 767 ? "top-center" : "top-right"}
      />{" "}
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

            {errors.fullName && (
              <small className="p-error">{errors.fullName}</small>
            )}

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

            {errors.email && <small className="p-error">{errors.email}</small>}

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

            {errors.password && (
              <small className="p-error">{errors.password}</small>
            )}
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
