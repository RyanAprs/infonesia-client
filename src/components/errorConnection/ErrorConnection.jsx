import { RefreshCcw } from "lucide-react";
import { Button } from "primereact/button";

const ErrorConnection = ({ fetchData }) => {
  return (
    <div className="md:p-4 p-2  h-screen flex justify-center items-center">
      <div className="p-8 w-full h-full flex flex-col items-center justify-center bg-white  rounded-xl">
        <div className="flex h-screen flex-col items-center justify-center text-center font-bold gap-3 text-3xl">
          Koneksi Terputus
          <p className="font-medium text-xl">
            Sepertinya terjadi kesalahan pada koneksi internet Anda. Silakan
            coba lagi.
          </p>
          <Button
            label="Coba Lagi"
            onClick={fetchData}
            className="bg-blue-600 py-2  hover:bg-blue-500 md:w-auto flex items-center justify-center gap-2 transition-all text-white p-4 rounded-xl"
          >
            <RefreshCcw />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorConnection;
