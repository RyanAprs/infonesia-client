import { Fragment, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  Dialog,
} from "@headlessui/react";
import { ChevronDown, CircleUserRoundIcon, LockKeyhole, X } from "lucide-react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";

const DropDown = () => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isButtonLoading, setButtonLoading] = useState(null);

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
      activeClassName: "hover:bg-blue-600 hover:text-white",
    },
    {
      items: [
        {
          label: "Logout",
          icon: undefined,
          onClick: () => console.log("Logout clicked"),
        },
      ],
      activeClassName: "hover:bg-blue-600",
    },
  ];

  const ProfileModal = () => (
    <Dialog
      open={isProfileModalOpen}
      onClose={() => setIsProfileModalOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-semibold">
              Profile Settings
            </Dialog.Title>
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex flex-col p-4 gap-4">
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
            {/* {errors.name && (
                      <small className="p-error -mt-3 text-sm">{errors.name}</small>
                    )} */}

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
            {/* {errors.telepon && (
                      <small className="p-error -mt-3 text-sm">{errors.telepon}</small>
                    )} */}

            <Button
              disabled={isButtonLoading}
              className="bg-blue-200 text-white dark:bg-extraLightGreen dark:text-black hover:bg-mainDarkGreen dark:hover:bg-lightGreen p-4 w-full flex justify-center rounded hover:mainGreen transition-all"
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
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );

  const PasswordModal = () => (
    <Dialog
      open={isPasswordModalOpen}
      onClose={() => setIsPasswordModalOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-semibold">
              Change Password
            </Dialog.Title>
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex flex-col p-4 gap-4">
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

            {/* {errors.currentPassword && (
            <small className="p-error -mt-3 text-sm">
              {errors.currentPassword}
            </small>
          )} */}
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
            {/* {errors.newPassword && (
            <small className="p-error -mt-3 text-sm">
              {errors.newPassword}
            </small>
          )} */}
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
              className="bg-blue-200 text-white dark:bg-extraLightGreen dark:text-black hover:bg-mainDarkGreen dark:hover:bg-lightGreen p-4 w-full flex justify-center rounded hover:mainGreen transition-all"
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
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <MenuButton className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-lg text-blue-800">
            <div className="font-semibold">Admin</div>
            <ChevronDown />
          </div>
        </MenuButton>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-150"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 z-50 mt-3 w-60 origin-top-right divide-y rounded-lg shadow-lg ring-1 divide-blue-500 border-blue-600 bg-white ring-white">
            {menuSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="py-1 font-medium">
                {section.items.map((item, itemIndex) => (
                  <MenuItem key={itemIndex}>
                    <button
                      onClick={item.onClick}
                      className={`flex w-full items-center gap-1.5 px-4 py-2 text-sm text-blue-600 ${section.activeClassName}`}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  </MenuItem>
                ))}
              </div>
            ))}
          </MenuItems>
        </Transition>
      </Menu>

      <ProfileModal />
      <PasswordModal />
    </>
  );
};

export default DropDown;
