import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import Cropper from "cropperjs";

const ImageCropModal = ({
  visible,
  onHide,
  selectedImage,
  imageRef,
  cropperRef,
  handleCrop,
}) => {
  const footer = (
    <Button
      label="Crop"
      onClick={handleCrop}
      className="bg-mainGreen text-white dark:bg-extraLightGreen dark:text-black hover:bg-mainDarkGreen dark:hover:bg-lightGreen p-4 w-full flex justify-center rounded-xl transition-all"
    />
  );

  return (
    <Dialog
      header="Preview Gambar"
      visible={visible}
      className="md:w-1/2 w-full"
      onHide={onHide}
      blockScroll={true}
      footer={footer}
      onShow={() => {
        if (selectedImage && imageRef.current && cropperRef.current === null) {
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
        {selectedImage && (
          <img
            ref={imageRef}
            src={selectedImage}
            alt="Selected"
            className="max-w-full rounded"
          />
        )}
      </div>
    </Dialog>
  );
};

export default ImageCropModal;
