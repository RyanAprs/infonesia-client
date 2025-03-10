import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

const FormModal = ({
  visible,
  onHide,
  title,
  children,
  onSubmit,
  submitLabel = "Simpan",
  isLoading = false,
  className = "md:w-1/2 w-full",
}) => {
  const footer = (
    <Button
      disabled={isLoading}
      className="bg-mainGreen text-white dark:bg-extraLightGreen dark:text-black hover:bg-mainDarkGreen dark:hover:bg-lightGreen p-4 w-full flex justify-center rounded-xl transition-all"
      onClick={onSubmit}
    >
      {isLoading ? (
        <ProgressSpinner
          style={{ width: "24px", height: "24px" }}
          strokeWidth="8"
          animationDuration="1s"
          color="white"
        />
      ) : (
        <p>{submitLabel}</p>
      )}
    </Button>
  );

  return (
    <Dialog
      header={title}
      visible={visible}
      maximizable
      className={className}
      onHide={onHide}
      blockScroll={true}
      footer={footer}
    >
      <div className="flex flex-col p-4 gap-4">{children}</div>
    </Dialog>
  );
};

export default FormModal;
