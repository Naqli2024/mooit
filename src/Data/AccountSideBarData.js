
import { IoPersonSharp } from "react-icons/io5";
import { RiLock2Fill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { FaUserTimes } from "react-icons/fa";

export const accountItems = [
  { item: "User profile", path: "userProfile", icon: <IoPersonSharp size={20} /> },
  { item: "Password", path: "password", icon: <RiLock2Fill size={20} /> },
  { item: "Settings", path: "settings", icon: <IoMdSettings size={20} /> },
  { item: "Delete account", path: "delete-account", icon: <FaUserTimes size={20} /> },
]