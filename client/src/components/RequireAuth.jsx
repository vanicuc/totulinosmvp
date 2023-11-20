import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { isLoggedIn } = useAuth();

  // redirect you if you're not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  // otherwise, let you through
  return children;
}
