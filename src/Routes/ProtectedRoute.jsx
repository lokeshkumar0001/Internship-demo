import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const storedFormData = localStorage.getItem("formData");
  const formData = storedFormData ? JSON.parse(storedFormData) : null;

  return formData ? <Outlet /> : (<Navigate to={"/"} />);
};

export default ProtectedRoute;
