import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import Cropper from "cropperjs";
import "/node_modules/cropperjs/dist/cropper.css";
import Quill from "quill";
import { useCallback } from "react";
import { ImageUp } from "lucide-react";
import { Ripple } from "primereact/ripple";
import ResizeModule from "@botom/quill-resize-module";
import { Scope } from "parchment";
import UseAuthManager from "../../store/AuthProvider.jsx";
import CustomTable from "../../components/table/customTable.jsx";
import FormModal from "../../components/modal/FormModal.jsx";
import ImageCropModal from "../../components/modal/ImageCropperModal.jsx";
import CustomDropdown from "../../components/dropDown/CustomDropDown.jsx";
import { InputText } from "primereact/inputtext";
import ImageFormat from "../../utils/ImageFormat.js";
import VideoBlot from "../../utils/VideoBlot.js";
import { Editor } from "primereact/editor";
import { getAllCategory } from "../../services/categoryService.js";
import {
  createNews,
  deleteNews,
  getAllNewsByCreator,
  getNewsById,
  updateNews,
} from "../../services/ArticleService.js";
import { NewsCreateSchema } from "../../validations/NewsSchema.jsx";
import { ZodError } from "zod";
import TagInput from "../../components/tagInput/TagInput.jsx";
import { InputTextarea } from "primereact/inputtextarea";
import LoadingPage from "../../components/Loading/LoadingPage.jsx";
import ErrorConnection from "../../components/errorConnection/errorConnection.jsx";
const baseUrl = `${import.meta.env.VITE_API_BASE_URI}/uploads/images/`;

const NewsData = () => {
  const { token } = UseAuthManager();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [datas, setDatas] = useState({
    title: "",
    content: "",
    summary: "",
    bannerImage: "",
    authorId: "",
    status: "",
    categoryId: 0,
    tags: [],
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [errors, setErrors] = useState({});
  const toast = useRef(null);
  const [isConnectionError, setisConnectionError] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [category, setCategory] = useState([]);
  const [visibleCropImage, setVisibleCropImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const imageRef = useRef(null);
  const cropperRef = useRef(null);
  const fileInputRef = useRef(null);

  const editorContentRef = useRef("");
  const handleTextChange = useCallback((htmlValue) => {
    editorContentRef.current = htmlValue;
  }, []);

  Quill.register(ImageFormat, true);
  Quill.register("modules/resize", ResizeModule);

  VideoBlot.blotName = "video";
  VideoBlot.tagName = "iframe";
  VideoBlot.scope = Scope.BLOCK_BLOT;

  Quill.register(VideoBlot);

  const fetchData = async () => {
    try {
      setLoadingPage(true);
      const response = await getAllNewsByCreator(token);

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
    fetchData();
  }, []);

  const handleModalCreate = async () => {
    setErrors({});
    setCroppedImage(null);
    setSelectedImage(null);
    if (cropperRef.current) {
      cropperRef.current.destroy();
      cropperRef.current = null;
    }
    setVisible(true);
    setIsEditMode(false);

    setDatas({
      title: "",
      authorId: "",
      bannerImage: "",
      categoryId: 0,
      content: "",
      summary: "",
      status: "",
      tags: [],
    });

    try {
      const responseCategory = await getAllCategory(token);

      setCategory(responseCategory);
      setLoading(false);
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
    }
  };

  const handleCreate = async () => {
    try {
      setLoading(true);

      const dataToSubmit = {
        ...datas,
        content: editorContentRef.current,
        categoryId: parseInt(datas.categoryId, 10),
      };

      NewsCreateSchema.parse(dataToSubmit);

      const formData = new FormData();
      formData.append("title", dataToSubmit.title);
      formData.append("content", dataToSubmit.content);
      formData.append("summary", dataToSubmit.summary);
      formData.append("categoryId", dataToSubmit.categoryId);
      formData.append("tags", JSON.stringify(dataToSubmit.tags));
      if (dataToSubmit.bannerImage instanceof Blob) {
        formData.append("bannerImage", dataToSubmit.bannerImage);
      }

      const response = await createNews(token, dataToSubmit);
      if (response.status === 201) {
        fetchData();
        setVisible(false);
        setTimeout(() => {
          toast.current?.show({
            severity: "success",
            summary: "Berhasil",
            detail: "Data Berita ditambahkan",
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
        toast.current?.show({
          severity: "error",
          summary: "Gagal",
          detail:
            "Judul artikel sudah digunakan. Silakan gunakan judul lain atau ubah sedikit agar unik.",
          life: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleModalUpdate = async (data) => {
    setErrors({});
    setCroppedImage(null);
    setSelectedImage(null);
    if (cropperRef.current) {
      cropperRef.current.destroy();
      cropperRef.current = null;
    }
    setVisible(true);

    try {
      const responseCategory = await getAllCategory(token);

      setCategory(responseCategory);
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
        setVisible(false);
      }
    } finally {
      setLoading(false);
    }

    try {
      const dataResponse = await getNewsById(data.id);
      if (dataResponse.content) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(dataResponse.content, "text/html");

        doc.querySelectorAll("img").forEach((img) => {
          if (!img.src.startsWith("data:") && !img.src.startsWith(baseUrl)) {
            const imageName = img.src.split("/").pop();
            img.src = baseUrl + imageName;
          }
        });

        dataResponse.content = doc.body.innerHTML;
      }

      if (dataResponse) {
        setDatas({
          title: dataResponse.title,
          summary: dataResponse.summary,
          content: dataResponse.content,
          bannerImage: dataResponse.bannerImage,
          categoryId: dataResponse.categoryId,
          tags: dataResponse.tags.map((tag) => tag.name),
        });

        editorContentRef.current = dataResponse.summary;
        setCurrentId(data.id);
        setIsEditMode(true);
        setVisible(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const dataToSubmit = {
        ...datas,
        content: editorContentRef.current,
      };

      NewsCreateSchema.parse(dataToSubmit);
      const clonedData = structuredClone(dataToSubmit);
      const parser = new DOMParser();
      const doc = parser.parseFromString(clonedData.content, "text/html");

      doc.querySelectorAll("img").forEach((img) => {
        if (!img.src.startsWith("data:")) {
          const imageName = img.src.split("/").pop();
          img.src = imageName;
        }
      });

      clonedData.content = doc.body.innerHTML;

      const response = await updateNews(token, currentId, clonedData);
      if (response.status === 200) {
        setVisible(false);
        fetchData();
        setTimeout(() => {
          toast.current?.show({
            severity: "success",
            summary: "Berhasil",
            detail: "Data berita diperbarui",
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
        setVisible(false);
      } else if (error.response.status === 422) {
        toast.current?.show({
          severity: "error",
          summary: "Gagal",
          detail:
            "Judul artikel sudah digunakan. Silakan gunakan judul lain atau ubah sedikit agar unik.",
          life: 3000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleModalDelete = async (data) => {
    setCurrentId(data.id);
    setCurrentName(data.title);
    setVisibleDelete(true);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteNews(token, currentId);
      if (response.status === 200) {
        setVisibleDelete(false);
        fetchData();
        setTimeout(() => {
          toast.current?.show({
            severity: "success",
            summary: "Berhasil",
            detail: "Data Berita dihapus",
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
        setVisible(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => {
    return (
      <span className="ql-formats">
        <select className="ql-header" aria-label="Heading">
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
          <option value="5">Heading 5</option>
          <option value="6">Heading 6</option>
          <option value="">Normal</option>
        </select>

        <select className="ql-size" aria-label="Font Size">
          <option value="small">Small</option>
          <option value="">Normal</option>
          <option value="large">Large</option>
          <option value="huge">Huge</option>
        </select>

        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
        <button className="ql-strike" aria-label="Strike-through"></button>

        <button className="ql-blockquote" aria-label="Blockquote"></button>
        <button className="ql-code-block" aria-label="Code Block"></button>

        <button
          className="ql-list"
          value="ordered"
          aria-label="Ordered List"
        ></button>
        <button
          className="ql-list"
          value="bullet"
          aria-label="Bullet List"
        ></button>
        <button className="ql-indent" value="+1" aria-label="Indent"></button>
        <button className="ql-indent" value="-1" aria-label="Outdent"></button>
        <button className="ql-align" value="" aria-label="Left Align"></button>
        <button
          className="ql-align"
          value="center"
          aria-label="Center Align"
        ></button>
        <button
          className="ql-align"
          value="right"
          aria-label="Right Align"
        ></button>
        <button
          className="ql-align"
          value="justify"
          aria-label="Justify"
        ></button>

        <button className="ql-link" aria-label="Link"></button>
        <button className="ql-video" aria-label="Insert Video"></button>
        <button className="ql-image" aria-label="Insert Image"></button>
        <select className="ql-color" aria-label="Text Color"></select>
        <select
          className="ql-background"
          aria-label="Background Color"
        ></select>

        <button
          className="ql-script"
          value="sub"
          aria-label="Subscript"
        ></button>
        <button
          className="ql-script"
          value="super"
          aria-label="Superscript"
        ></button>

        <button className="ql-clean" aria-label="Clear Formatting"></button>
      </span>
    );
  };

  useEffect(() => {
    if (selectedImage && imageRef.current) {
      if (!cropperRef.current) {
        cropperRef.current = new Cropper(imageRef.current, {
          aspectRatio: 1200 / 630,
          viewMode: 1,
          autoCropArea: 1,
          movable: true,
          zoomable: true,
          scalable: false,
          cropBoxMovable: true,
          cropBoxResizable: true,
          guides: true,
          highlight: true,
          background: true,
        });
      }
    }
  }, [selectedImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const validFormats = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validFormats.includes(file.type)) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Format gambar tidak valid",
      });
      setSelectedImage(null);
      e.target.value = "";
      return;
    }

    if (file.size > 500 * 1024) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail:
          "Ukuran gambar melebihi 500KB, kompres atau ganti gambar terlebih dahulu",
      });
      setSelectedImage(null);
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setVisibleCropImage(true);
      setCroppedImage(null);
      if (cropperRef.current) {
        cropperRef.current.destroy();
        cropperRef.current = null;
      }
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  const handleCrop = async () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCroppedCanvas({
        width: 1200,
        height: 630,
      });

      canvas.toBlob(
        async (blob) => {
          if (blob) {
            const file = new File([blob], "bannerImage.jpg", {
              type: "image/jpeg",
            });
            setDatas((prev) => ({
              ...prev,
              bannerImage: file,
            }));
            const previewUrl = URL.createObjectURL(blob);
            console.log(previewUrl);

            setCroppedImage(previewUrl);
          }
        },
        "image/jpeg",
        0.9
      );
    }

    setVisibleCropImage(false);
  };

  const handleCloseCropModal = () => {
    setVisibleCropImage(false);
    setSelectedImage(null);
    setCroppedImage(null);

    if (cropperRef.current) {
      cropperRef.current.destroy();
      cropperRef.current = null;
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const header = renderHeader();

  const columns = [
    { header: "Banner", field: "bannerImage" },
    { header: "Judul", field: "title" },
    { header: "Penulis", field: "author.fullName" },
    { header: "Kategori", field: "category.name" },
    { header: "Ringkasan", field: "summary" },
    { header: "Tanggal Pembuatan", field: "createdAt" },
    { header: "Status", field: "status" },
  ];

  const itemTemplateCategory = (option) => {
    return <div>{option.name}</div>;
  };

  const valueTemplateCategory = (option) => {
    if (option) {
      return <div>{option.name}</div>;
    }
    return <span>Pilih Kategori Berita</span>;
  };

  const statuses = [
    { key: "DRAFT", label: "Draft" },
    { key: "PUBLISHED", label: "Published" },
    { key: "ARCHIVED", label: "Archived" },
  ];

  if (isConnectionError) {
    return <ErrorConnection fetchData={fetchData} />;
  }

  if (loadingPage) return <LoadingPage />;

  return (
    <div className="min-h-screen flex flex-col gap-4 p-4 z-10">
      <Toast
        ref={toast}
        position={window.innerWidth <= 767 ? "top-center" : "top-right"}
      />
      <div className="bg-white min-h-screen dark:bg-blackHover rounded-xl">
        <CustomTable
          columns={columns}
          data={data}
          onCreate={handleModalCreate}
          onEdit={handleModalUpdate}
          onDelete={handleModalDelete}
          statuses={statuses}
        />
      </div>

      <FormModal
        visible={visible}
        onHide={() => setVisible(false)}
        title={isEditMode ? "Ubah Data Berita" : "Tambah Data Berita"}
        onSubmit={isEditMode ? handleUpdate : handleCreate}
        submitLabel={isEditMode ? "Edit" : "Simpan"}
        isLoading={loading}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="-mb-3">
              Pilih Gambar Banner:
            </label>
            <input
              ref={fileInputRef}
              id="file-upload"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="p-ripple cursor-pointer bg-blue-400 hover:bg-blue-300  text-white p-2 w-fit flex justify-center rounded-xl transition-all"
            >
              <Ripple />
              <ImageUp />
            </label>

            {!croppedImage && datas.bannerImage && isEditMode && (
              <div>
                <img
                  src={`${baseUrl}${datas.bannerImage}`}
                  alt="Banner"
                  className={`w-full rounded border dark:border-[#2d2d2d]`}
                />
              </div>
            )}

            {croppedImage && (
              <div className="mt-2">
                <img
                  src={croppedImage}
                  alt="Preview"
                  className="w-full rounded border dark:border-[#2d2d2d]"
                />
              </div>
            )}
          </div>

          {/* Judul Artikel */}
          <label>Judul Artikel:</label>
          <InputText
            type="text"
            placeholder="Judul Artikel"
            className="p-input text-lg p-3 rounded"
            value={datas.title}
            onChange={(e) =>
              setDatas((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          {errors.title && <small className="p-error">{errors.title}</small>}

          <label htmlFor="" className="-mb-3">
            Ringkasan Artikel:
          </label>

          <InputTextarea
            autoResize
            type="text"
            placeholder="Ringkasan Artikel"
            className="p-input text-lg p-3  rounded"
            value={datas.summary}
            onChange={(e) =>
              setDatas((prev) => ({
                ...prev,
                summary: e.target.value,
              }))
            }
          />

          {errors.summary && (
            <small className="p-error -mt-3 text-sm">{errors.summary}</small>
          )}

          {/* Pilih Kategori */}
          <label>Pilih Kategori Berita:</label>
          <CustomDropdown
            value={
              category.find((item) => item.id === datas.categoryId) || null
            }
            filter
            options={category || []}
            optionLabel="name"
            itemTemplate={itemTemplateCategory}
            valueTemplate={valueTemplateCategory}
            placeholder="Pilih Kategori"
            className="p-2 rounded"
            onChange={(e) =>
              setDatas((prev) => ({
                ...prev,
                categoryId: Number(e.value.id),
              }))
            }
          />

          {errors.categoryId && (
            <small className="p-error">{errors.categoryId}</small>
          )}

          {/* Konten Artikel */}
          <label>Konten Artikel:</label>
          <Editor
            value={datas.content}
            key={isEditMode ? `edit-${currentId}` : "create"}
            placeholder="Konten Artikel"
            headerTemplate={header}
            onTextChange={(e) => handleTextChange(e.htmlValue || "")}
            style={{ minHeight: "320px", maxHeight: "fit-content" }}
          />
          {errors.content && (
            <small className="p-error">{errors.content}</small>
          )}

          {/* Input Tags */}
          <label>Tags:</label>
          <TagInput
            tags={datas.tags}
            setTags={(newTags) =>
              setDatas((prev) => ({ ...prev, tags: newTags }))
            }
            onChange={(newTags) =>
              setDatas((prev) => ({ ...prev, tags: newTags }))
            }
          />
          {errors.tags && <small className="p-error">{errors.tags}</small>}
        </div>
      </FormModal>

      <FormModal
        visible={visibleDelete}
        onHide={() => setVisibleDelete(false)}
        title={"Hapus Data Berita"}
        onSubmit={handleDelete}
        submitLabel="Hapus"
        isLoading={loading}
      >
        <div className="flex flex-col gap-8">
          <div className="text-xl">
            Apakah anda yakin ingin menghapus data artikel dengan judul{" "}
            {currentName}?
          </div>
        </div>
      </FormModal>

      <ImageCropModal
        visible={visibleCropImage}
        onHide={handleCloseCropModal}
        selectedImage={selectedImage}
        imageRef={imageRef}
        cropperRef={cropperRef}
        handleCrop={handleCrop}
      />
    </div>
  );
};

export default NewsData;
