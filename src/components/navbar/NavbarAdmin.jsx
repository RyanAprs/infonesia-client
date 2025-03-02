import { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AlignJustify,
  LayoutGrid,
  ArrowRight,
  ArrowLeft,
  User,
  Settings2,
  GitPullRequestClosed,
  Newspaper,
  UserPen,
} from "lucide-react";
import { ProgressSpinner } from "primereact/progressspinner";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Menu as Menuk } from "primereact/menu";
// import icon from "../../assets/prbcare.png";
// import { ThemeSwitcher } from "../themeSwitcher/ThemeSwitcher";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
// import { superAdminChangePasswordSchema } from "../../validations/SuperAdminSchema";
// import { ZodError } from "zod";
// import {
//   handleApiError,
//   handleChangePasswordError,
// } from "../../utils/ApiErrorHandlers";
// import { updatePassword } from "../../services/SuperAdminService";
// import {
//   getCurrentAdminPuskesmas,
//   updateCurrentPuskesmas,
//   updatePasswordPuskesmas,
// } from "../../services/PuskesmasService";
// import {
//   getCurrentAdminApotek,
//   updateCurrentApotek,
//   updatePasswordApotek,
// } from "../../services/ApotekService";
// import DynamicAddress from "../dynamicAddress/DynamicAddress";
// import {
//   HandleUnauthorizedAdminApotek,
//   HandleUnauthorizedAdminPuskesmas,
// } from "../../utils/HandleUnauthorized";
// import { apotekUpdateCurrentSchema } from "../../validations/ApotekSchema";
// import { puskesmasUpdateCurrentSchema } from "../../validations/PuskesmasSchema";
// import { AddressContext } from "../../config/context/AdressContext";
// import { useModalUpdate } from "../../config/context/ModalUpdateContext";
// import WaktuOperasional from "../waktuOperasional/WaktuOperasional";
// import ModalLoading from "/src/components/modalLoading/ModalLoading.jsx";
// import { Password } from "primereact/password";

const NavbarAdmin = ({ children }) => {
  const [beforeModalLoading, setBeforeModalLoading] = useState(false);
  //   const darkMode = useDarkMode(false, { classNameDark: "dark" });
  const [visibleLogout, setVisibleLogout] = useState(false);
  const [visibleChangePassword, setVisibleChangePassword] = useState(false);
  const [visibleDetailProfile, setVisibleDetailProfile] = useState(false);
  const [visibleUpdateProfile, setVisibleUpdateProfile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useRef(null);
  const [dataPassword, setDataPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isApotekUpdate, setIsApotekUpdate] = useState(false);
  const [dataApotek, setDataApotek] = useState({
    namaApotek: "",
    telepon: "",
    alamat: "",
    waktuOperasional: "",
  });
  const [dataPuskesmas, setDataPuskesmas] = useState({
    namaPuskesmas: "",
    telepon: "",
    alamat: "",
    waktuOperasional: "",
  });

  const [detailDataPuskesmas, setDetailDataPuskesmas] = useState({
    namaPuskesmas: "",
    telepon: "",
    alamat: "",
    waktuOperasional: "",
  });
  const [detailDataApotek, setDetailDataApotek] = useState({
    namaPuskesmas: "",
    telepon: "",
    alamat: "",
    waktuOperasional: "",
  });

  const [prevAddress, setPrevAddress] = useState({});
  const [waktuOperasionalList, setWaktuOperasionalList] = useState([]);
  const [prevWaktuOperasional, setPrevWaktuOperasional] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [toggle, setToggle] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [children]);

  const handleSidebarToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = () => {
    // dispatch({ type: "LOGOUT" });
    navigate("/admin/login");
  };

  //menu
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [key, setKey] = useState(0);
  //   const itemsNotAdmin = [
  //     {
  //       label: (
  //         <div className="flex justify-center items-center mx-auto gap-2 ">
  //           <CircleUser />
  //           <h1>Detail Profile</h1>
  //         </div>
  //       ),
  //       command: () => handleDetailProfileModal(),
  //     },
  //     {
  //       label: (
  //         <div className="flex justify-center items-center gap-2">
  //           <LockKeyhole />
  //           <h1>Ganti Password</h1>
  //         </div>
  //       ),
  //       command: () => handleModalChangePassword(),
  //     },
  //     {
  //       label: (
  //         <div className="flex justify-center items-center gap-2">
  //           <DoorOpen />
  //           <h1>Keluar</h1>
  //         </div>
  //       ),
  //       command: () => handleModalLogout(),
  //     },
  //   ];
  //   const itemsAdmin = [
  //     {
  //       label: (
  //         <div className="flex justify-center items-center gap-2">
  //           <LockKeyhole />
  //           <h1>Ganti Password</h1>
  //         </div>
  //       ),
  //       command: () => handleModalChangePassword(),
  //     },
  //     {
  //       label: (
  //         <div className="flex justify-center items-center gap-2">
  //           <DoorOpen />
  //           <h1>Keluar</h1>
  //         </div>
  //       ),
  //       command: () => handleModalLogout(),
  //     },
  //   ];

  const handleModalLogout = () => {
    setIsMenuVisible(false);
    setVisibleLogout(true);
  };
  const buttonRef = useRef(null);
  const toggleMenuVisibility = (event) => {
    event.stopPropagation();
    setIsMenuVisible((prev) => {
      if (!prev) {
        setKey((prevKey) => prevKey + 1);
      }
      return !prev;
    });
  };

  //   const handleDetailProfileModal = async () => {
  //     setBeforeModalLoading(true);
  //     setErrors({});
  //     setIsMenuVisible(false);

  //     if (role === "nakes") {
  //       setIsApotekUpdate(false);
  //       setDetailDataPuskesmas({});
  //       try {
  //         const dataResponse = await getCurrentAdminPuskesmas();
  //         if (dataResponse) {
  //           setDetailDataPuskesmas({
  //             namaPuskesmas: dataResponse.namaPuskesmas,
  //             alamat: dataResponse.alamat,
  //             telepon: dataResponse.telepon,
  //             waktuOperasional: dataResponse.waktuOperasional,
  //           });
  //         }
  //         setVisibleDetailProfile(true);
  //       } catch (error) {
  //         setVisibleDetailProfile(false);
  //         HandleUnauthorizedAdminPuskesmas(error.response, dispatch, navigate);
  //         handleApiError(error, toast);
  //       }
  //     }
  //     if (role === "apoteker") {
  //       setIsApotekUpdate(true);
  //       setDetailDataApotek({});
  //       try {
  //         const dataResponse = await getCurrentAdminApotek();
  //         if (dataResponse) {
  //           setDetailDataApotek({
  //             namaApotek: dataResponse.namaApotek,
  //             alamat: dataResponse.alamat,
  //             telepon: dataResponse.telepon,
  //             waktuOperasional: dataResponse.waktuOperasional,
  //           });
  //           setVisibleDetailProfile(true);
  //         }
  //       } catch (error) {
  //         HandleUnauthorizedAdminApotek(error.response, dispatch, navigate);
  //         handleApiError(error, toast);
  //       }
  //     }
  //     setBeforeModalLoading(false);
  //   };

  //   const { setIsUpdated } = useModalUpdate();

  //   const handleUpdateProfileModal = async () => {
  //     setBeforeModalLoading(true);
  //     setVisibleDetailProfile(false);
  //     setErrors({});
  //     if (role === "nakes") {
  //       setIsApotekUpdate(false);
  //       try {
  //         const dataResponse = await getCurrentAdminPuskesmas();
  //         setPrevAddress(dataResponse.alamat);
  //         setPrevWaktuOperasional(dataResponse.waktuOperasional);
  //         if (dataResponse) {
  //           setDataPuskesmas({
  //             namaPuskesmas: dataResponse.namaPuskesmas,
  //             alamat: dataResponse.alamat,
  //             telepon: dataResponse.telepon,
  //             waktuOperasional: dataResponse.waktuOperasional,
  //           });
  //         }
  //         setVisibleUpdateProfile(true);
  //       } catch (error) {
  //         HandleUnauthorizedAdminPuskesmas(error.response, dispatch, navigate);
  //         handleApiError(error, toast);
  //       }
  //     }

  //     if (role === "apoteker") {
  //       setIsApotekUpdate(true);
  //       try {
  //         const dataResponse = await getCurrentAdminApotek();
  //         setPrevWaktuOperasional(dataResponse.waktuOperasional);
  //         setPrevAddress(dataResponse.alamat);

  //         if (dataResponse) {
  //           setDataApotek({
  //             namaApotek: dataResponse.namaApotek,
  //             alamat: dataResponse.alamat,
  //             telepon: dataResponse.telepon,
  //             waktuOperasional: dataResponse.waktuOperasional,
  //           });
  //         }
  //         setVisibleUpdateProfile(true);
  //       } catch (error) {
  //         HandleUnauthorizedAdminApotek(error.response, dispatch, navigate);
  //         handleApiError(error, toast);
  //       }
  //     }
  //     setBeforeModalLoading(false);
  //   };
  const [showToast, setShowToast] = useState(false);
  const toastLogin = useRef(null);
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
        summary: "Berhasil",
        detail: "Anda berhasil masuk ke sistem",
        life: 3000,
      });
      setShowToast(false);
    }
  }, [showToast]);

  //   const handleUpdateProfile = async () => {
  //     const formattedWaktuOperasional = formatWaktuOperasional();
  //     try {
  //       setButtonLoading(true);
  //       if (isApotekUpdate) {
  //         const updatedDatas = {
  //           ...dataApotek,
  //           alamat: dataApotek.alamat || prevAddress,
  //           waktuOperasional: formattedWaktuOperasional || prevWaktuOperasional,
  //         };
  //         apotekUpdateCurrentSchema.parse(updatedDatas);

  //         const response = await updateCurrentApotek(updatedDatas);
  //         if (response.status === 200) {
  //           toast.current.show({
  //             severity: "success",
  //             summary: "Berhasil",
  //             detail: "Data Anda diperbarui",
  //             life: 3000,
  //           });
  //           setButtonLoading(false);
  //           setIsUpdated(true);
  //           setVisibleUpdateProfile(false);
  //         }
  //       } else {
  //         const updatedDatas = {
  //           ...dataPuskesmas,
  //           alamat: dataPuskesmas.alamat || prevAddress,
  //           waktuOperasional: formattedWaktuOperasional || prevWaktuOperasional,
  //         };
  //         puskesmasUpdateCurrentSchema.parse(updatedDatas);

  //         const response = await updateCurrentPuskesmas(updatedDatas);
  //         if (response.status === 200) {
  //           toast.current.show({
  //             severity: "success",
  //             summary: "Berhasil",
  //             detail: "Data Anda diperbarui",
  //             life: 3000,
  //           });
  //           setButtonLoading(false);
  //           setIsUpdated(true);
  //           setVisibleUpdateProfile(false);
  //         }
  //       }
  //     } catch (error) {
  //       setButtonLoading(false);
  //       if (error instanceof ZodError) {
  //         const newErrors = {};
  //         error.errors.forEach((e) => {
  //           newErrors[e.path[0]] = e.message;
  //         });
  //         setErrors(newErrors);
  //       } else if (error.response && error.response.status === 409) {
  //         handleApiError(error, toast);
  //       } else {
  //         if (isApotekUpdate) {
  //           HandleUnauthorizedAdminApotek(error.response, dispatch, navigate);
  //         } else {
  //           HandleUnauthorizedAdminPuskesmas(error.response, dispatch, navigate);
  //         }
  //         handleApiError(error, toast);
  //         setVisibleUpdateProfile(false);
  //       }
  //     }
  //   };

  //   const handleModalChangePassword = () => {
  //     setDataPassword({
  //       currentPassword: "",
  //       newPassword: "",
  //       confirmPassword: "",
  //     });
  //     setErrors({});
  //     setIsMenuVisible(false);
  //     setVisibleChangePassword(true);
  //   };

  //   const handleChangePassword = async () => {
  //     try {
  //       setButtonLoading(true);
  //       superAdminChangePasswordSchema.parse(dataPassword);
  //       let response;
  //       if (role === "admin") {
  //         response = await updatePassword(dataPassword);
  //       } else if (role === "nakes") {
  //         response = await updatePasswordPuskesmas(dataPassword);
  //       } else if (role === "apoteker") {
  //         response = await updatePasswordApotek(dataPassword);
  //       }

  //       if (response && response.status === 200) {
  //         toast.current.show({
  //           severity: "success",
  //           summary: "Berhasil",
  //           detail: "Password Anda diperbarui",
  //           life: 3000,
  //         });
  //         setVisibleChangePassword(false);
  //         setButtonLoading(false);
  //       }
  //     } catch (error) {
  //       setButtonLoading(false);
  //       if (error instanceof ZodError) {
  //         const newErrors = {};
  //         error.errors.forEach((e) => {
  //           newErrors[e.path[0]] = e.message;
  //         });
  //         setErrors(newErrors);
  //       } else if (error.response && error.response.status === 401) {
  //         handleChangePasswordError(error, toast);
  //       } else {
  //         setVisibleChangePassword(false);
  //         handleChangePasswordError(error, toast);
  //       }
  //     }
  //   };

  const [isButtonLoading, setButtonLoading] = useState(null);
  const menuContainerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      menuContainerRef.current &&
      !menuContainerRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen w-full">
      {/* <ModalLoading className={beforeModalLoading ? `` : `hidden`} /> */}
      <Toast
        ref={toast}
        position={window.innerWidth <= 767 ? "top-center" : "top-right"}
      />
      <Toast
        ref={toastLogin}
        position={window.innerWidth <= 767 ? "top-center" : "top-right"}
      />
      <Sidebar
        className="md:w-1/4 md:block  text-white border-r-white bg-blue-400"
        backgroundColor={``}
        collapsed={toggle ? false : expanded}
        breakPoint={"md"}
        toggled={toggle}
        onBackdropClick={handleSidebarToggle}
        // image={`${img}`}
      >
        <Menu
          menuItemStyles={{
            button: {
              ["&:hover"]: {
                backgroundColor: "#93c5fd",
                color: "white",
              },
            },
            span: {
              marginRight: "0px",
            },
          }}
          className={` ${expanded ? "" : "px-3"}`}
        >
          <Menu>
            <div
              className={`flex flex-col  font-semibold text-lg mb-2 items-center mt-0.5 justify-center`}
            >
              <>
                <div>
                  <img
                    src={""}
                    alt="LOGO"
                    className={`${
                      expanded ? "hidden" : "block"
                    } w-auto px-2 max-h-20 mt-3 `}
                  />
                  <h1 className={`text-center ${expanded ? "mb-2" : "mb-3"}`}>
                    {expanded ? " " : "Logo"}
                  </h1>
                </div>
              </>

              <img
                src={""}
                alt="LOGO "
                className={`${
                  expanded ? "block mb-5" : "hidden"
                } w-auto px-2 max-h-20`}
              />

              <hr
                className={`w-full border-b border-lightGreen ${
                  expanded ? "hidden" : "mb-1"
                }`}
              />
            </div>
          </Menu>

          <>
            <MenuItem
              className={`${expanded ? "mb-2" : "mb-3"}`}
              icon={<LayoutGrid />}
              component={
                <Link
                  to="/admin/dashboard"
                  className={`flex  hover:bg-lightGreen dark:hover:bg-mainGreen ${
                    location.pathname === "/admin/dashboard"
                      ? "bg-mainGreen"
                      : ""
                  } rounded ${expanded ? "mx-2" : ""} transition-all`}
                ></Link>
              }
            >
              Dashboard
            </MenuItem>
            <MenuItem
              className={`${expanded ? "mb-2" : "mb-3"}`}
              icon={<User />}
              component={
                <Link
                  to="/admin/user"
                  className={`flex  hover:bg-lightGreen dark:hover:bg-mainGreen ${
                    location.pathname === "/admin/user" ? "bg-mainGreen" : ""
                  } rounded ${expanded ? "mx-2" : ""} transition-all`}
                ></Link>
              }
            >
              User
            </MenuItem>
            <MenuItem
              className={`${expanded ? "mb-2" : "mb-3"}`}
              icon={<UserPen />}
              component={
                <Link
                  to="/admin/journalist"
                  className={`flex  hover:bg-lightGreen dark:hover:bg-mainGreen ${
                    location.pathname === "/admin/journalist"
                      ? "bg-mainGreen"
                      : ""
                  } rounded ${expanded ? "mx-2" : ""} transition-all`}
                ></Link>
              }
            >
              Journalist
            </MenuItem>
            <MenuItem
              className={`${expanded ? "mb-2" : "mb-3"}`}
              icon={<Newspaper />}
              component={
                <Link
                  to="/admin/article"
                  className={`flex  hover:bg-lightGreen dark:hover:bg-mainGreen ${
                    location.pathname === "/admin/article" ? "bg-mainGreen" : ""
                  } rounded ${expanded ? "mx-2" : ""} transition-all`}
                ></Link>
              }
            >
              Article
            </MenuItem>
          </>
        </Menu>
      </Sidebar>

      <div className="flex flex-col w-full overflow-hidden ">
        {/* Navbar */}
        <div className="flex items-center px-6  w-full z-40 shadow-md  dark:shadow-none dark:shadow-blackHover dark:bg-blackHover dark:text-white bg-blue-200 text-black">
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
                  <ArrowRight
                    strokeWidth={1.5}
                    className="dark:text-white text-black"
                  />
                ) : (
                  <ArrowLeft
                    strokeWidth={1.5}
                    className="dark:text-white text-black"
                  />
                )
              }
            ></Button>

            <h1 className="text-xl">
              {location.pathname === "/admin/dashboard" ? "Dashboard" : ""}
            </h1>
          </div>
          <div className="flex justify-between items-center ">
            <div>{/* <ThemeSwitcher /> */}</div>
            <Button
              ref={buttonRef}
              severity="secondary"
              onClick={toggleMenuVisibility}
              text
              className="p-1 ml-2 rounded-full cursor-pointer "
              label={
                !isMenuVisible ? (
                  <Settings2
                    strokeWidth={1.5}
                    className="dark:text-white text-black"
                  />
                ) : (
                  <GitPullRequestClosed
                    strokeWidth={1.5}
                    className="dark:text-white text-black"
                  />
                )
              }
            ></Button>
          </div>

          <div ref={menuContainerRef}>
            <Menuk
              key={key}
              className={` ${
                isMenuVisible ? "visible" : "hidden"
              } dark:bg-blackHover shadow-md absolute top-[80px] right-0 `}
              //   model={role === "admin" ? itemsAdmin : itemsNotAdmin}
            ></Menuk>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex-grow bg-gray-200  dark:text-white h-auto overflow-y-scroll w-full overflow-x-auto"
        >
          {children}
        </div>
      </div>

      {/* Modal Detail Profile */}
      {/* <Dialog
        header={isApotekUpdate ? "Profile Apotek" : "Profile Puskesmas"}
        visible={visibleDetailProfile}
        maximizable
        className="md:w-1/2 w-full"
        onHide={() => {
          if (!visibleDetailProfile) return;
          setVisibleDetailProfile(false);
        }}
        blockScroll={true}
      >
        <div className="flex flex-col p-4 gap-4">
          <label htmlFor="" className="-mb-3">
            {isApotekUpdate ? "Nama Apotek" : "Nama Puskesmas"}:
          </label>
          <InputText
            type="text"
            variant="filled"
            disabled
            className="p-input text-lg p-3 rounded"
            value={
              isApotekUpdate
                ? detailDataApotek.namaApotek
                : detailDataPuskesmas.namaPuskesmas
            }
          />

          <label htmlFor="" className="-mb-3">
            Telepon:
          </label>
          <InputText
            type="text"
            variant="filled"
            disabled
            className="p-input text-lg p-3 rounded"
            value={
              isApotekUpdate
                ? detailDataApotek.telepon
                : detailDataPuskesmas.telepon
            }
          />

          <label htmlFor="" className="-mb-3">
            Alamat:
          </label>
          <div className="text-lg p-3 rounded bg-[#fbfbfc] dark:bg-[#282828] text-[#989da0] dark:text-[#6e6e6e] border dark:border-none min-h-14">
            <p className="text-[#989da0] dark:text-[#6e6e6e]">
              {isApotekUpdate
                ? detailDataApotek.alamat
                : detailDataPuskesmas.alamat}
            </p>
          </div>

          <label htmlFor="" className="-mb-3">
            Waktu Operasional:
          </label>
          <div className="text-lg p-3 rounded bg-[#fbfbfc] dark:bg-[#282828] text-[#989da0] dark:text-[#6e6e6e] border dark:border-none min-h-14">
            {isApotekUpdate
              ? validasiWaktuOperasional(detailDataApotek.waktuOperasional)
              : validasiWaktuOperasional(detailDataPuskesmas.waktuOperasional)}
          </div>

          <Button
            label="Edit Profile"
            className="p-4 bg-mainGreen text-white dark:bg-extraLightGreen dark:text-black hover:bg-mainDarkGreen dark:hover:bg-lightGreen rounded-xl  transition-all"
            onClick={handleUpdateProfileModal}
          />
        </div>
      </Dialog> */}

      {/* Modal Update Profile */}
      {/* <Dialog
        header={
          isApotekUpdate ? "Edit Profile Apotek" : "Edit Profile Puskesmas"
        }
        visible={visibleUpdateProfile}
        maximizable
        className="md:w-1/2 w-full"
        onHide={() => {
          if (!visibleUpdateProfile) return;
          setVisibleUpdateProfile(false);
        }}
        blockScroll={true}
      >
        <div className="flex flex-col p-4 gap-4">
          <label htmlFor="" className="-mb-3">
            {isApotekUpdate ? "Nama Apotek" : "Nama Puskesmas"}:
          </label>
          <InputText
            type="text"
            placeholder={isApotekUpdate ? "Nama Apotek" : "Nama Puskesmas"}
            className="p-input text-lg p-3 rounded"
            value={
              isApotekUpdate
                ? dataApotek.namaApotek
                : dataPuskesmas.namaPuskesmas
            }
            onChange={(e) =>
              isApotekUpdate
                ? setDataApotek((prev) => ({
                    ...prev,
                    namaApotek: e.target.value,
                  }))
                : setDataPuskesmas((prev) => ({
                    ...prev,
                    namaPuskesmas: e.target.value,
                  }))
            }
          />
          {errors.namaApotek && (
            <small className="p-error -mt-3 text-sm">{errors.namaApotek}</small>
          )}

          <label htmlFor="" className="-mb-3">
            Telepon:
          </label>
          <InputText
            type="text"
            placeholder="Telepon"
            className="p-input text-lg p-3 rounded"
            value={isApotekUpdate ? dataApotek.telepon : dataPuskesmas.telepon}
            onChange={(e) =>
              isApotekUpdate
                ? setDataApotek((prev) => ({
                    ...prev,
                    telepon: e.target.value,
                  }))
                : setDataPuskesmas((prev) => ({
                    ...prev,
                    telepon: e.target.value,
                  }))
            }
          />
          {errors.telepon && (
            <small className="p-error -mt-3 text-sm">{errors.telepon}</small>
          )}
          <label htmlFor="" className="-mb-3">
            Alamat:
          </label>
          <DynamicAddress prevAddress={prevAddress} />
          <span className="text-sm -mt-4">
            *Kosongkan alamat jika tidak ingin diubah
          </span>
          {errors.alamat && (
            <small className="p-error -mt-3 text-sm">{errors.alamat}</small>
          )}
          <div className="w-full">
            <WaktuOperasional
              setWaktuOperasionalList={setWaktuOperasionalList}
            />
          </div>
          <span className="text-sm -mt-4">
            *Kosongkan waktu operasional jika tidak ingin diubah
          </span>

          {errors.waktuOperasional && (
            <small className="p-error -mt-3 text-sm">
              {errors.waktuOperasional}
            </small>
          )}
          <Button
            disabled={isButtonLoading}
            className="bg-mainGreen text-white dark:bg-extraLightGreen dark:text-black hover:bg-mainDarkGreen dark:hover:bg-lightGreen p-4 w-full flex justify-center rounded-xl hover:mainGreen transition-all"
            onClick={handleUpdateProfile}
          >
            {isButtonLoading ? (
              <ProgressSpinner
                style={{ width: "25px", height: "25px" }}
                strokeWidth="8"
                animationDuration="1s"
                color="white"
              />
            ) : (
              <p>Edit</p>
            )}
          </Button>
        </div>
      </Dialog> */}

      {/* Modal ubah password */}
      {/* <Dialog
        header={"Ubah Password"}
        visible={visibleChangePassword}
        maximizable
        className="md:w-1/2 w-full "
        onHide={() => {
          if (!visibleChangePassword) return;
          setVisibleChangePassword(false);
        }}
        blockScroll={true}
      >
        <div className="flex flex-col p-4 gap-4">
          <label htmlFor="" className="-mb-3">
            Password Lama:
          </label>

          <Password
            toggleMask
            placeholder="Password Lama"
            value={dataPassword.currentPassword}
            feedback={false}
            onChange={(e) =>
              setDataPassword((prev) => ({
                ...prev,
                currentPassword: e.target.value,
              }))
            }
          />

          {errors.currentPassword && (
            <small className="p-error -mt-3 text-sm">
              {errors.currentPassword}
            </small>
          )}
          <label htmlFor="" className="-mb-3">
            Password Baru:
          </label>
          <Password
            feedback={false}
            toggleMask
            placeholder="Password Baru"
            value={dataPassword.newPassword}
            onChange={(e) =>
              setDataPassword((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }))
            }
          />
          {errors.newPassword && (
            <small className="p-error -mt-3 text-sm">
              {errors.newPassword}
            </small>
          )}
          <label htmlFor="" className="-mb-3">
            Konfirmasi Password:
          </label>
          <Password
            feedback={false}
            toggleMask
            placeholder="Konfirmasi Password Baru"
            value={dataPassword.confirmPassword}
            onChange={(e) =>
              setDataPassword((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
          />
          {errors.confirmPassword && (
            <small className="p-error -mt-3 text-sm">
              {errors.confirmPassword}
            </small>
          )}
          <Button
            disabled={isButtonLoading}
            className="bg-mainGreen text-white dark:bg-extraLightGreen dark:text-black hover:bg-mainDarkGreen dark:hover:bg-lightGreen p-4 w-full flex justify-center rounded-xl hover:mainGreen transition-all"
            onClick={handleChangePassword}
          >
            {isButtonLoading ? (
              <ProgressSpinner
                style={{ width: "25px", height: "25px" }}
                strokeWidth="8"
                animationDuration="1s"
                color="white"
              />
            ) : (
              <p>Edit</p>
            )}
          </Button>
        </div>
      </Dialog> */}

      {/* Modal Logout */}
      {/* <Dialog
        header="Logout"
        visible={visibleLogout}
        className="md:w-1/2 w-full "
        onHide={() => {
          if (!visibleLogout) return;
          setVisibleLogout(false);
        }}
        blockScroll={true}
      >
        <div className="flex flex-col gap-8">
          <div className="text-xl">Apakah anda yakin ingin logout?</div>
          <div className="flex gap-4 items-end justify-end">
            <Button
              label="Batal"
              onClick={() => setVisibleLogout(false)}
              className="p-button-text text-mainGreen dark:text-extraLightGreen hover:text-mainDarkGreen dark:hover:text-lightGreen rounded-xl transition-all"
            />
            <Button
              label="Logout"
              className="bg-mainGreen text-white dark:bg-extraLightGreen dark:text-black hover:bg-mainDarkGreen dark:hover:bg-lightGreen flex justify-center rounded-xl hover:mainGreen transition-all"
              onClick={handleLogout}
              autoFocus
            />
          </div>
        </div>
      </Dialog> */}
    </div>
  );
};

export default NavbarAdmin;
