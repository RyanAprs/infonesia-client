import { Sidebar, Menu } from "react-pro-sidebar";
import logo from "../../assets/infonesia-logo.png";
import { getRole } from "../ProtectedRoute/ProtectedRoute";
import UseAuthManager from "../../store/AuthProvider";
import { AdminItems, JournalistItems } from "./Items";

const CustomSidebar = ({ expanded, toggled, onBackdropClick }) => {
  const { token } = UseAuthManager();

  const role = getRole(token);

  return (
    <Sidebar
      className="md:w-1/4 md:block text-white border-r-white bg-blue-500"
      backgroundColor={``}
      collapsed={expanded}
      breakPoint={"md"}
      toggled={toggled}
      onBackdropClick={onBackdropClick}
    >
      <Menu
        menuItemStyles={{
          button: {
            ["&:hover"]: {
              backgroundColor: "#60a5fa",
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
            className={`flex flex-col font-semibold text-lg mb-2 items-center mt-0.5 justify-center`}
          >
            <>
              <div>
                <img
                  src={logo}
                  alt="LOGO"
                  className={`${
                    expanded ? "hidden" : "block"
                  } w-auto px-2 max-h-20 mt-3 `}
                />
                <h1 className={`text-center ${expanded ? "mb-2" : "mb-3"}`}>
                  {expanded ? " " : "Infonesia"}
                </h1>
              </div>
            </>

            <img
              src={logo}
              alt="LOGO "
              className={`${
                expanded ? "block mb-5" : "hidden"
              } w-auto px-2 max-h-20`}
            />

            <hr
              className={`w-full border-b border-blue-300 ${
                expanded ? "hidden" : "mb-1"
              }`}
            />
          </div>
        </Menu>

        {role === "ADMIN" ? (
          <AdminItems expanded={expanded} />
        ) : (
          <JournalistItems expanded={expanded} />
        )}
      </Menu>
    </Sidebar>
  );
};

export default CustomSidebar;
