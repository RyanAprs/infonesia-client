import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDown,
  CircleUserRoundIcon,
  DoorOpen,
  LockKeyhole,
  UserCircle,
} from "lucide-react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { CustomModal } from "../modal/CustomModal";
import UseAuthManager from "../../store/AuthProvider";
import { getRole } from "../ProtectedRoute/ProtectedRoute";
import { useNavigate } from "react-router-dom";

const DropDown = () => {
  const { logout, token } = UseAuthManager();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isUpdateProfileModalOpen, setIsUpdateProfileModalOpen] =
    useState(false);
  const [isButtonLoading, setButtonLoading] = useState(null);
  const navigate = useNavigate();

  const [dataPassword, setDataPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [dataProfile, setDataProfile] = useState({
    fullName: "",
    email: "",
  });

  const handleUpdateProfile = async () => {
    //   try {
    //     const updatedDatas = {
    //       ...dataProfile,
    //       fullName: dataProfile.fullName,
    //       email: dataProfile.email,
    //     };
    //     puskesmasUpdateCurrentSchema.parse(updatedDatas);
    //     const response = await updateCurrentPuskesmas(updatedDatas);
    //     if (response.status === 200) {
    //       toast.current.show({
    //         severity: "success",
    //         summary: "Berhasil",
    //         detail: "Data Anda diperbarui",
    //         life: 3000,
    //       });
    //       setButtonLoading(false);
    //       setIsUpdated(true);
    //       setVisibleUpdateProfile(false);
    //     }
    //   } catch (error) {
    //     setButtonLoading(false);
    //     if (error instanceof ZodError) {
    //       const newErrors = {};
    //       error.errors.forEach((e) => {
    //         newErrors[e.path[0]] = e.message;
    //       });
    //       setErrors(newErrors);
    //     } else if (error.response && error.response.status === 409) {
    //       handleApiError(error, toast);
    //     } else {
    //       if (isApotekUpdate) {
    //         HandleUnauthorizedAdminApotek(error.response, dispatch, navigate);
    //       } else {
    //         HandleUnauthorizedAdminPuskesmas(error.response, dispatch, navigate);
    //       }
    //       handleApiError(error, toast);
    //       setVisibleUpdateProfile(false);
    //     }
    //   }
  };

  const handleChangePassword = async () => {
    // try {
    //   setButtonLoading(true);
    //   superAdminChangePasswordSchema.parse(dataPassword);
    //   response = await updatePassword(dataPassword);
    //   if (response && response.status === 200) {
    //     toast.current.show({
    //       severity: "success",
    //       summary: "Berhasil",
    //       detail: "Password Anda diperbarui",
    //       life: 3000,
    //     });
    //     setVisibleChangePassword(false);
    //     setButtonLoading(false);
    //   }
    // } catch (error) {
    //   setButtonLoading(false);
    //   if (error instanceof ZodError) {
    //     const newErrors = {};
    //     error.errors.forEach((e) => {
    //       newErrors[e.path[0]] = e.message;
    //     });
    //     setErrors(newErrors);
    //   } else if (error.response && error.response.status === 401) {
    //     handleChangePasswordError(error, toast);
    //   } else {
    //     setVisibleChangePassword(false);
    //     handleChangePasswordError(error, toast);
    //   }
    // }
  };

  const handleOpenUpdateModal = () => {
    setIsUpdateProfileModalOpen(true);
    setIsProfileModalOpen(false);
  };

  const handleLogout = () => {
    const role = getRole(token);
    logout();

    if (role === "ADMIN") {
      navigate("/admin/login");
    } else if (role === "JOURNALIST") {
      navigate("/jurnalis/login");
    } else {
      navigate("/login");
    }
  };

  const menuSections = [
    {
      items: [
        {
          label: "Profile",
          icon: <CircleUserRoundIcon />,
          onClick: () => setIsProfileModalOpen(true),
        },
        {
          label: "Password",
          icon: <LockKeyhole />,
          onClick: () => setIsPasswordModalOpen(true),
        },
      ],
      activeClassName: "hover:bg-blue-300 hover:text-white",
    },
    {
      items: [
        {
          label: "Logout",
          icon: <DoorOpen />,
          onClick: () => handleLogout(),
        },
      ],
      activeClassName: "hover:bg-blue-300 hover:text-white",
    },
  ];

  const detailProfileModalContent = (
    <>
      <label htmlFor="" className="-mb-3">
        Name
      </label>
      <InputText
        disabled
        type="text"
        placeholder="Name"
        className="p-input text-lg p-3 rounded border-2"
        value={dataProfile.fullName}
      />

      <label htmlFor="" className="-mb-3">
        Email:
      </label>
      <InputText
        disabled
        type="email"
        placeholder="Email"
        className="p-input text-lg p-3 rounded border-2"
        value={dataProfile.fullName}
      />

      <Button
        disabled={isButtonLoading}
        className="bg-blue-500 hover:bg-blue-400 text-white dark:bg-extraLightGreen  hover:bg-mainDarkGreen  p-4 w-full flex justify-center rounded transition-all"
        onClick={handleOpenUpdateModal}
      >
        {isButtonLoading ? (
          <ProgressSpinner
            style={{ width: "25px", height: "25px" }}
            strokeWidth="8"
            animationDuration="1s"
            color="white"
          />
        ) : (
          <p>Change Profile</p>
        )}
      </Button>
    </>
  );

  const passwordModalContent = (
    <>
      <label htmlFor="" className="-mb-3">
        Current Password:
      </label>
      <input
        type="password"
        placeholder="Current password"
        className="p-input text-lg p-3 rounded border-2"
        value={dataPassword.currentPassword}
        onChange={(e) =>
          setDataPassword((prev) => ({
            ...prev,
            currentPassword: e.target.value,
          }))
        }
      />

      <label htmlFor="" className="-mb-3">
        New Password:
      </label>
      <input
        type="password"
        placeholder="New password"
        className="p-input text-lg p-3 rounded border-2"
        value={dataPassword.newPassword}
        onChange={(e) =>
          setDataPassword((prev) => ({
            ...prev,
            newPassword: e.target.value,
          }))
        }
      />

      <label htmlFor="" className="-mb-3">
        Confirm Password:
      </label>
      <input
        type="password"
        placeholder="Confirm password"
        className="p-input text-lg p-3 rounded border-2"
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
        className="bg-blue-500 hover:bg-blue-400 text-white dark:bg-extraLightGreen  hover:bg-mainDarkGreen  p-4 w-full flex justify-center rounded transition-all"
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
          <p>Save Changes</p>
        )}
      </Button>
    </>
  );

  const updateProfileModalContent = (
    <>
      <label htmlFor="" className="-mb-3">
        Name
      </label>
      <InputText
        type="text"
        placeholder="Name"
        className="p-input text-lg p-3 rounded border-2"
        value={dataProfile.fullName}
        onChange={(e) =>
          setDataProfile((prev) => ({
            ...prev,
            fullName: e.target.value,
          }))
        }
      />

      <label htmlFor="" className="-mb-3">
        Email:
      </label>
      <InputText
        type="email"
        placeholder="Email"
        className="p-input text-lg p-3 rounded border-2"
        value={dataProfile.fullName}
        onChange={(e) =>
          setDataProfile((prev) => ({
            ...prev,
            email: e.target.value,
          }))
        }
      />

      <Button
        disabled={isButtonLoading}
        className="bg-blue-500 hover:bg-blue-400 text-white dark:bg-extraLightGreen  hover:bg-mainDarkGreen  p-4 w-full flex justify-center rounded transition-all"
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
          <p>Save Changes</p>
        )}
      </Button>
    </>
  );

  return (
    <>
      <Menu as="div" className="relative inline-block text-left ">
        <>
          <Menu.Button
            className="flex items-center gap-3"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center gap-1 text-lg text-blue-800">
              <div className="flex justify-center items-center gap-2">
                <UserCircle size={35} />
                <ChevronDown />
              </div>
            </div>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-50 mt-3 w-60 origin-top-right divide-y rounded-lg shadow-lg ring-1 bg-blue-400 ring-white">
              {menuSections.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className="py-2 font-medium px-2 rounded"
                >
                  {section.items.map((item, itemIndex) => (
                    <Menu.Item key={itemIndex}>
                      <button
                        onClick={item.onClick}
                        className={`flex w-full items-center rounded-md gap-1.5 px-4 py-2 text-sm text-white ${section.activeClassName}`}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    </Menu.Item>
                  ))}
                </div>
              ))}
            </Menu.Items>
          </Transition>
        </>
      </Menu>

      <CustomModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        title="Profile Detail"
      >
        {detailProfileModalContent}
      </CustomModal>

      <CustomModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        title="Change Password"
      >
        {passwordModalContent}
      </CustomModal>

      <CustomModal
        isOpen={isUpdateProfileModalOpen}
        onClose={() => setIsUpdateProfileModalOpen(false)}
        title="Change Profile"
      >
        {updateProfileModalContent}
      </CustomModal>
    </>
  );
};

export default DropDown;
