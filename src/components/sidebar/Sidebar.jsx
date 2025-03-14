import {
  ClipboardList,
  LayoutGrid,
  Newspaper,
  User,
  UserPen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import logo from "../../assets/infonesia-logo.png";

const CustomSidebar = ({ expanded, toggled, onBackdropClick }) => {
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

        <>
          <MenuItem
            className={`${expanded ? "mb-2" : "mb-3"}`}
            icon={<LayoutGrid />}
            component={
              <Link
                to="/admin/beranda"
                className={`flex hover:bg-blue-100 ${
                  location.pathname === "/admin/beranda" ? "bg-blue-400" : ""
                } rounded ${expanded ? "mx-2" : ""} transition-all`}
              ></Link>
            }
          >
            Beranda
          </MenuItem>
          <MenuItem
            className={`${expanded ? "mb-2" : "mb-3"}`}
            icon={<User />}
            component={
              <Link
                to="/admin/pengguna"
                className={`flex hover:bg-blue-600 ${
                  location.pathname === "/admin/pengguna" ? "bg-blue-400" : ""
                } rounded ${expanded ? "mx-2" : ""} transition-all`}
              ></Link>
            }
          >
            Pengguna
          </MenuItem>
          <MenuItem
            className={`${expanded ? "mb-2" : "mb-3"}`}
            icon={<UserPen />}
            component={
              <Link
                to="/admin/jurnalis"
                className={`flex hover:bg-blue-600 ${
                  location.pathname === "/admin/jurnalis" ? "bg-blue-400" : ""
                } rounded ${expanded ? "mx-2" : ""} transition-all`}
              ></Link>
            }
          >
            Jurnalis
          </MenuItem>
          <MenuItem
            className={`${expanded ? "mb-2" : "mb-3"}`}
            icon={<Newspaper />}
            component={
              <Link
                to="/admin/berita"
                className={`flex hover:bg-blue-600 ${
                  location.pathname === "/admin/berita" ? "bg-blue-400" : ""
                } rounded ${expanded ? "mx-2" : ""} transition-all`}
              ></Link>
            }
          >
            Berita
          </MenuItem>
          <MenuItem
            className={`${expanded ? "mb-2" : "mb-3"}`}
            icon={<ClipboardList />}
            component={
              <Link
                to="/admin/kategori"
                className={`flex hover:bg-blue-600 ${
                  location.pathname === "/admin/kategori" ? "bg-blue-400" : ""
                } rounded ${expanded ? "mx-2" : ""} transition-all`}
              ></Link>
            }
          >
            Kategori
          </MenuItem>
        </>
      </Menu>
    </Sidebar>
  );
};

export default CustomSidebar;
