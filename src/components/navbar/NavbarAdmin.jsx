import { useState, useRef, useEffect } from "react";
import { AlignJustify, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "primereact/button";
import DropDown from "./DropDown";
import CustomSidebar from "../sidebar/Sidebar";
import { Bounce, toast, ToastContainer } from "react-toastify";

const NavbarAdmin = ({ children }) => {
  const [expanded, setExpanded] = useState(false);
  const [toggle, setToggle] = useState(false);
  const scrollRef = useRef(null);

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
      toast.success("Login Berhasil", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setShowToast(false);
    }
  }, [showToast]);

  return (
    <div className="flex h-screen w-full">
      <ToastContainer />
      <CustomSidebar expanded={expanded} />
      <div className="flex flex-col w-full overflow-hidden ">
        {/* Navbar */}
        <div className="flex items-center px-6  w-full z-40 shadow-md dark:bg-blackHover  bg-white text-black">
          <div className="flex py-6 w-full items-center gap-4">
            <Button
              severity="secondary"
              onClick={() => {
                setToggle(!toggle);
              }}
              text
              className="p-1 rounded-full cursor-pointer md:hidden"
              label={
                <AlignJustify
                  strokeWidth={1.5}
                  className="dark:text-white text-black"
                />
              }
            ></Button>

            <Button
              severity="secondary"
              onClick={() => {
                setExpanded(!expanded);
              }}
              text
              className="p-1 rounded-full cursor-pointer hidden md:block"
              label={
                expanded ? (
                  <ArrowRight className=" text-black" />
                ) : (
                  <ArrowLeft className=" text-black" />
                )
              }
            ></Button>
          </div>
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

export default NavbarAdmin;
