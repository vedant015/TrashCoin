import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = ({ children, requiredRole }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    const userRole = localStorage.getItem("userRole");

    if (!currentUser) {
      toast.error("Please login to access this page");
      navigate("/login");
      return;
    }

    if (requiredRole === "admin" && userRole !== "admin") {
      toast.error("Access denied. Admin only.");
      navigate("/");
      return;
    }

    if (requiredRole === "user" && userRole === "admin") {
      navigate("/dashboard");
      return;
    }
  }, [navigate, requiredRole]);

  return <>{children}</>;
};

export default ProtectedRoute;
