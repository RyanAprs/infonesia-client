import { useEffect, useRef, useState } from "react";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "../../services/categoryService";
import UseAuthManager from "../../store/AuthProvider";
import { InputText } from "primereact/inputtext";
import FormModal from "../../components/modal/FormModal";
import { Toast } from "primereact/toast";
import LoadingPage from "../../components/Loading/LoadingPage";
import ErrorConnection from "../../components/errorConnection/errorConnection";
import { ZodError } from "zod";
import { CategorySchema } from "../../validations/CategorySchema";
import CustomTable from "../../components/table/customTable";

const CategoryData = () => {
  const { token } = UseAuthManager();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: "",
  });
  const [currentId, setCurrentId] = useState();
  const [errors, setErrors] = useState("");
  const [isCreateAndUpdateModalOpen, setIsCreateAndUpdateModalOpen] =
    useState(false);
  const [isdeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toast = useRef(null);
  const [isConnectionError, setisConnectionError] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);

  const columns = [
    { field: "name", header: "Nama Kategori" },
    { field: "slug", header: "Slug Kategori" },
  ];

  const fetchCategory = async () => {
    try {
      setLoadingPage(true);
      const response = await getAllCategory(token);
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
    fetchCategory();
  }, []);

  const handleCreateModalOpen = () => {
    setCategoryData({
      name: "",
    });
    setIsCreateAndUpdateModalOpen(true);
    setIsUpdateMode(false);
  };

  const handleUpdateModalOpen = async (data) => {
    setIsCreateAndUpdateModalOpen(true);
    setIsUpdateMode(true);
    setCurrentId(data.id);
    try {
      const response = await getCategoryById(token, data.id);
      setCategoryData({
        name: response.name,
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
  };

  const handleCreateCategory = async () => {
    setLoading(true);

    try {
      const data = {
        name: categoryData.name,
      };

      CategorySchema.parse(data);

      const response = await createCategory(token, data);

      if (response.status === 201) {
        fetchCategory();
        setIsCreateAndUpdateModalOpen(false);
        setTimeout(() => {
          toast.current?.show({
            severity: "success",
            summary: "Berhasil",
            detail: "Data Kategori Ditambahkan",
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

  const handleUpdateCategory = async () => {
    setLoading(true);

    try {
      const data = {
        name: categoryData.name,
      };

      CategorySchema.parse(data);

      const response = await updateCategory(token, currentId, data);

      if (response.status === 200) {
        fetchCategory();
        setIsCreateAndUpdateModalOpen(false);
        setTimeout(() => {
          toast.current?.show({
            severity: "success",
            summary: "Berhasil",
            detail: "Data Kategori Diperbarui",
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
      }
    } finally {
      setLoading(false);
      setisConnectionError(false);
    }
  };

  const handleDeleteCategory = async () => {
    setLoading(true);
    try {
      const response = await deleteCategory(token, currentId);
      if (response.status === 200) {
        fetchCategory();
        setIsDeleteModalOpen(false);
        setTimeout(() => {
          toast.current?.show({
            severity: "success",
            summary: "Berhasil",
            detail: "Data Kategori Dihapus",
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
      } else if (error.response.status === 500) {
        toast.current?.show({
          severity: "error",
          summary: "Gagal",
          detail: "Data Kategori Ini Masih Terikat dengan Data Lain",
          life: 3000,
        });
      }
    } finally {
      setLoading(false);
      setisConnectionError(false);
    }
  };

  if (isConnectionError) {
    return <ErrorConnection fetchData={fetchCategory} />;
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
        title={isUpdateMode ? "Perbarui Data Kategori" : "Tambah Data Kategori"}
        onSubmit={isUpdateMode ? handleUpdateCategory : handleCreateCategory}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <label htmlFor="" className="-mb-3">
              Nama Kategori
            </label>
            <InputText
              type="text"
              placeholder="Nama Kategori"
              className="p-input text-lg p-3 rounded border-2"
              value={categoryData.name}
              onChange={(e) =>
                setCategoryData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
            {errors.name && <small className="p-error">{errors.name}</small>}
          </div>
        </div>
      </FormModal>
      <FormModal
        visible={isdeleteModalOpen}
        onHide={() => setIsDeleteModalOpen(false)}
        title={"Hapus Data Kategori"}
        onSubmit={handleDeleteCategory}
        submitLabel={"Hapus"}
        isLoading={loading}
      >
        <div className="text-xl">
          <h1>Apakah anda yakin akan menghapus data ini?</h1>
        </div>
      </FormModal>
    </div>
  );
};

export default CategoryData;
