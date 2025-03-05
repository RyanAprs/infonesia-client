import {
  ClipboardList,
  LayoutGrid,
  Newspaper,
  User,
  UserPen,
} from "lucide-react";
import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const CustomSidebar = ({ expanded }) => {
  const [toggle, setToggle] = useState(false);
  const handleSidebarToggle = () => {
    setToggle(!toggle);
  };

  return (
    <Sidebar
      className="md:w-1/4 md:block  text-white border-r-white bg-blue-500"
      backgroundColor={``}
      collapsed={toggle ? false : expanded}
      breakPoint={"md"}
      toggled={toggle}
      onBackdropClick={handleSidebarToggle}
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
              className={`w-full border-b border-blue-300 ${
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
                className={`flex  hover:bg-blue-100  ${
                  location.pathname === "/admin/dashboard" ? "bg-blue-400" : ""
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
                className={`flex  hover:bg-blue-600  ${
                  location.pathname === "/admin/user" ? "bg-blue-400" : ""
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
                className={`flex  hover:bg-blue-600  ${
                  location.pathname === "/admin/journalist" ? "bg-blue-400" : ""
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
                className={`flex  hover:bg-blue-600  ${
                  location.pathname === "/admin/article" ? "bg-blue-400" : ""
                } rounded ${expanded ? "mx-2" : ""} transition-all`}
              ></Link>
            }
          >
            Article
          </MenuItem>
          <MenuItem
            className={`${expanded ? "mb-2" : "mb-3"}`}
            icon={<ClipboardList />}
            component={
              <Link
                to="/admin/category"
                className={`flex  hover:bg-blue-600  ${
                  location.pathname === "/admin/category" ? "bg-blue-400" : ""
                } rounded ${expanded ? "mx-2" : ""} transition-all`}
              ></Link>
            }
          >
            Category
          </MenuItem>
        </>
      </Menu>
    </Sidebar>
  );
};

export default CustomSidebar;
