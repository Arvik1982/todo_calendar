import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import UserPage from "../pages/User/UserPage";
import ErrPage from "../pages/Error/Error";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="*" element={<ErrPage />} />
    </Routes>
  );
}
