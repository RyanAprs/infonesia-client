import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import Cropper from "cropperjs";
import "/node_modules/cropperjs/dist/cropper.css";
import Quill from "quill";
import { useCallback } from "react";
import { ImageUp } from "lucide-react";
import { Ripple } from "primereact/ripple";
import ResizeModule from "@botom/quill-resize-module";
const baseUrl = `${import.meta.env.VITE_API_BASE_URI}/static/`;
import { Scope } from "parchment";
import UseAuthManager from "../../store/AuthProvider.jsx";
import CustomTable from "../../components/table/customTable.jsx";
import { getAllUser } from "../../services/UserService.js";

const DataArtikel = () => {
  const { token } = UseAuthManager();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [datas, setDatas] = useState({
    authorId: "",
    title: "",
    banner: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [errors, setErrors] = useState({});
  const toast = useRef(null);
  const navigate = useNavigate();
  const [isConnectionError, setisConnectionError] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(null);
  const [author, setAuthor] = useState([]);
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

  const ImageFormatAttributesList = ["height", "width", "style"];
  const allowedStyles = {
    display: ["inline"],
    float: ["left", "right"],
    margin: [],
  };
  const BaseImageFormat = Quill.import("formats/image");
  //   class ImageFormat extends BaseImageFormat {
  //     static formats(domNode) {
  //       const formats = {};
  //       ImageFormatAttributesList.forEach((attribute) => {
  //         if (domNode.hasAttribute(attribute)) {
  //           formats[attribute] = domNode.getAttribute(attribute);
  //         }
  //       });
  //       return formats;
  //     }
  //     format(name, value) {
  //       if (ImageFormatAttributesList.includes(name)) {
  //         if (name === "style" && value) {
  //           const styleEntries = value
  //             .split(";")
  //             .map((entry) => entry.trim())
  //             .filter(Boolean);
  //           const newStyles = {};

  //           styleEntries.forEach((entry) => {
  //             const [key, val] = entry.split(":").map((item) => item.trim());
  //             if (
  //               allowedStyles[key] &&
  //               (allowedStyles[key].length === 0 ||
  //                 allowedStyles[key].includes(val))
  //             ) {
  //               newStyles[key] = val;
  //             }
  //           });
  //           const styleString = Object.entries(newStyles)
  //             .map(([key, val]) => `${key}: ${val}`)
  //             .join("; ");
  //           this.domNode.setAttribute("style", styleString);
  //         } else if (value) {
  //           this.domNode.setAttribute(name, value);
  //         } else {
  //           this.domNode.removeAttribute(name);
  //         }
  //       } else {
  //         super.format(name, value);
  //       }
  //     }
  //   }
  //   Quill.register(ImageFormat, true);
  //   Quill.register("modules/resize", ResizeModule);

  //   const BlockEmbed = Quill.import("blots/block/embed");

  //   class VideoBlot extends BlockEmbed {
  //     static create(value) {
  //       const node = super.create(value);
  //       node.setAttribute("contenteditable", "false");
  //       node.setAttribute("frameborder", "0");
  //       node.setAttribute("allowfullscreen", true);
  //       node.setAttribute("src", this.sanitize(value));
  //       return node;
  //     }

  //     static sanitize(url) {
  //       return url;
  //     }

  //     static formats(domNode) {
  //       const formats = {};
  //       const attrs = ["height", "width", "style"];
  //       attrs.forEach((attr) => {
  //         if (domNode.hasAttribute(attr)) {
  //           formats[attr] = domNode.getAttribute(attr);
  //         }
  //       });
  //       return formats;
  //     }

  //     format(name, value) {
  //       const allowedStyles = {
  //         display: ["inline", "block"],
  //         float: ["left", "right", "none"],
  //         margin: [],
  //         "max-width": [],
  //         "max-height": [],
  //       };

  //       if (["height", "width", "style"].includes(name)) {
  //         if (name === "style" && value) {
  //           const styleEntries = value
  //             .split(";")
  //             .map((entry) => entry.trim())
  //             .filter(Boolean);
  //           const newStyles = {};

  //           styleEntries.forEach((entry) => {
  //             const [key, val] = entry.split(":").map((item) => item.trim());
  //             if (
  //               allowedStyles[key] &&
  //               (allowedStyles[key].length === 0 ||
  //                 allowedStyles[key].includes(val))
  //             ) {
  //               newStyles[key] = val;
  //             }
  //           });

  //           const styleString = Object.entries(newStyles)
  //             .map(([key, val]) => `${key}: ${val}`)
  //             .join("; ");

  //           this.domNode.setAttribute("style", styleString);
  //         } else if (value) {
  //           this.domNode.setAttribute(name, value);
  //         } else {
  //           this.domNode.removeAttribute(name);
  //         }
  //       } else {
  //         super.format(name, value);
  //       }
  //     }

  //     static value(domNode) {
  //       return domNode.getAttribute("src");
  //     }
  //   }

  //   VideoBlot.blotName = "video";
  //   VideoBlot.tagName = "iframe";
  //   VideoBlot.scope = Scope.BLOCK_BLOT;

  //   Quill.register(VideoBlot);

  const fetchData = async () => {};

  useEffect(() => {
    fetchData();
  }, [token, navigate]);

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

    try {
      const response = await getAllUser(token, "JOURNALIST");
      console.log(response);

      setAuthor(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {};

  const handleModalUpdate = async () => {};

  const handleUpdate = async () => {};

  const handleModalDelete = async () => {};

  const handleDelete = async () => {};

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
            const file = new File([blob], "banner.jpg", {
              type: "image/jpeg",
            });
            setDatas((prev) => ({
              ...prev,
              banner: file,
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

  //   if (loading)
  //     return (
  //       <div className="min-h-screen flex flex-col gap-4 p-4 z-10 ">
  //         <Toast
  //           ref={toast}
  //           position={window.innerWidth <= 767 ? "top-center" : "top-right"}
  //         />
  //         <div className="bg-white min-h-screen dark:bg-blackHover p-4 rounded-xl flex items-center justify-center">
  //           <ProgressSpinner />
  //         </div>
  //       </div>
  //     );

  const columns = [
    { header: "Judul", field: "judul" },
    { header: "Banner", field: "banner" },
  ];

  return (
    <div className="min-h-screen flex flex-col gap-4 p-4 z-10 ">
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
        />
      </div>
      <Dialog
        header={isEditMode ? "Ubah Data Artikel" : "Tambah Data Artikel"}
        visible={visible}
        maximizable
        className="md:w-1/2 w-full"
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        blockScroll={true}
      >
        <div className="flex flex-col p-4 gap-4">
          <div className="flex flex-col gap-4">
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
              className="p-ripple cursor-pointer bg-mainGreen text-white dark:bg-extraLightGreen dark:text-black hover:bg-mainDarkGreen dark:hover:bg-lightGreen p-2 w-fit flex justify-center rounded-xl hover:mainGreen transition-all"
            >
              <Ripple />
              <ImageUp />
            </label>

            {!croppedImage && datas.banner && isEditMode && (
              <div>
                <img
                  src={`${baseUrl}${datas.banner}`}
                  alt="Banner"
                  className={`w-full rounded border dark:border-[#2d2d2d]`}
                />
              </div>
            )}

            {croppedImage && (
              <div>
                <img
                  src={croppedImage}
                  alt="Cropped"
                  className={`w-full rounded border dark:border-[#2d2d2d]`}
                />
              </div>
            )}
          </div>

          <Button
            disabled={isButtonLoading}
            className="bg-mainGreen text-white dark:bg-extraLightGreen dark:text-black hover:bg-mainDarkGreen dark:hover:bg-lightGreen p-4 w-full flex justify-center rounded-xl hover:mainGreen transition-all"
            onClick={isEditMode ? handleUpdate : handleCreate}
          >
            {isButtonLoading ? (
              <ProgressSpinner
                style={{ width: "24px", height: "24px" }}
                strokeWidth="8"
                animationDuration="1s"
                color="white"
              />
            ) : (
              <p>{isEditMode ? "Edit" : "Simpan"}</p>
            )}
          </Button>
        </div>
      </Dialog>

      <Dialog
        header="Preview Gambar"
        visible={visibleCropImage}
        className="md:w-1/2 w-full "
        onHide={handleCloseCropModal}
        blockScroll={true}
        onShow={() => {
          if (
            selectedImage &&
            imageRef.current &&
            cropperRef.current === null
          ) {
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
        }}
      >
        <div className="flex flex-col gap-8">
          <div>
            {selectedImage && (
              <img
                ref={imageRef}
                src={selectedImage}
                alt="Selected"
                className={`max-w-full rounded`}
              />
            )}
          </div>
          <div className="flex gap-4 items-end justify-end">
            <Button
              label="Crop"
              onClick={handleCrop}
              className="bg-mainGreen text-white dark:bg-extraLightGreen dark:text-black hover:bg-mainDarkGreen dark:hover:bg-lightGreen p-4 w-full flex justify-center rounded-xl hover:mainGreen transition-all"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DataArtikel;
