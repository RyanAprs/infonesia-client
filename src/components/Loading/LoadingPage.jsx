import { ProgressSpinner } from "primereact/progressspinner";

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center ">
      <ProgressSpinner />
    </div>
  );
};

export default LoadingPage;
