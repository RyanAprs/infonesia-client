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
import CustomTable from "../../components/table/customTable";
import { Toast } from "primereact/toast";

const CategoryData = () => {
  const { token } = UseAuthManager();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [categoryData, setCategoryData] = useState({
    name: "",
  });
  const [currentId, setCurrentId] = useState();
  const [error, setError] = useState("");
  const [isCreateAndUpdateModalOpen, setIsCreateAndUpdateModalOpen] =
    useState(false);
  const [isdeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toast = useRef(null);

  const columns = [
    { field: "name", header: "Nama Kategori" },
    { field: "slug", header: "Slug Kategori" },
  ];

  const fetchCategory = async () => {
    const response = await getAllCategory(token);
    setData(response);
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
      console.log(error);
    }
  };

  const handleDeleteModalOpen = (data) => {
    setIsDeleteModalOpen(true);
    setCurrentId(data.id);
  };

  const handleCreateCategory = async () => {
    setLoading(true);

    if (!categoryData.name) {
      setError("input tidak boleh kosong");
      setLoading(false);
      return;
    }

    try {
      const data = {
        name: categoryData.name,
      };

      const response = await createCategory(token, data);

      console.log(response);

      if (response.status === 201) {
        toast.current.show({
          severity: "success",
          summary: "Berhasil",
          detail: "Data Kategori Ditambahkan",
          life: 3000,
        });
        fetchCategory();
        setIsCreateAndUpdateModalOpen(false);
      }
    } catch (error) {
      console.log(error.response.status);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async () => {
    setLoading(true);

    if (!categoryData.name) {
      setError("input tidak boleh kosong");
      setLoading(false);
      return;
    }

    try {
      const data = {
        name: categoryData.name,
      };

      const response = await updateCategory(token, currentId, data);

      if (response.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Berhasil",
          detail: "Data Kategpri Diperbarui",
          life: 3000,
        });
        fetchCategory();
        setIsCreateAndUpdateModalOpen(false);
      }
    } catch (error) {
      console.log(error.response.status);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    setLoading(true);
    try {
      const response = await deleteCategory(token, currentId);
      if (response.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Berhasil",
          detail: "Data Kategori Dihapus",
          life: 3000,
        });
        fetchCategory();
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

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

            {error && <span className="text-red-500">{error}</span>}
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
