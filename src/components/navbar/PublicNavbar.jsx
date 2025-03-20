import { useState, useRef, useEffect } from "react";
import { AlignJustify } from "lucide-react";
import { Button } from "primereact/button";
import DropDown from "./DropDown";
import { Toast } from "primereact/toast";
import logo from "../../assets/infonesia-logo.png";
import { Link } from "react-router-dom";

const PublicNavbar = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const scrollRef = useRef(null);
  const toast = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [children]);

  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("isLogin") === "true") {
      setShowToast(true);
      localStorage.removeItem("isLogin");
    }
  }, []);

  useEffect(() => {
    if (showToast) {
      toast.current.show({
        severity: "success",
        summary: "Berhasil Login",
        life: 3000,
      });
      setShowToast(false);
    }
  }, [showToast]);

  return (
    <div className="flex h-screen w-full">
      <Toast
        ref={toast}
        position={window.innerWidth <= 767 ? "top-center" : "top-right"}
      />
      <div className="flex flex-col w-full overflow-hidden ">
        <div className="flex items-center px-8 py-4  w-full z-40 shadow-md dark:bg-blackHover  bg-white text-black">
          <Link to="/" className="flex w-full items-center gap-2">
            <img src={logo} className="w-12 h-12" alt="" />
            <h1 className="text-2xl font-semibold text-blue-800">Infonesia</h1>
          </Link>
          <div className="flex justify-center items-center gap-4">
            <DropDown />
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex-grow bg-blue-100  dark:text-white h-auto overflow-y-scroll w-full overflow-x-auto"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default PublicNavbar;
