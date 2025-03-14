import {
  ClipboardList,
  LayoutGrid,
  Newspaper,
  User,
  UserPen,
} from "lucide-react";
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

export const AdminItems = ({ expanded }) => {
  return (
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
  );
};

export const JournalistItems = ({ expanded }) => {
  return (
    <>
      <MenuItem
        className={`${expanded ? "mb-2" : "mb-3"}`}
        icon={<LayoutGrid />}
        component={
          <Link
            to="/jurnalis/beranda"
            className={`flex hover:bg-blue-100 ${
              location.pathname === "/jurnalis/beranda" ? "bg-blue-400" : ""
            } rounded ${expanded ? "mx-2" : ""} transition-all`}
          ></Link>
        }
      >
        Beranda
      </MenuItem>

      <MenuItem
        className={`${expanded ? "mb-2" : "mb-3"}`}
        icon={<Newspaper />}
        component={
          <Link
            to="/jurnalis/berita"
            className={`flex hover:bg-blue-600 ${
              location.pathname === "/jurnalis/berita" ? "bg-blue-400" : ""
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
            to="/jurnalis/kategori"
            className={`flex hover:bg-blue-600 ${
              location.pathname === "/jurnalis/kategori" ? "bg-blue-400" : ""
            } rounded ${expanded ? "mx-2" : ""} transition-all`}
          ></Link>
        }
      >
        Kategori
      </MenuItem>
    </>
  );
};
