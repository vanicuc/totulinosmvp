import { useContext } from "react";
import AuthContext from "../contexts/auth.js";

export default function useAuth() {
  return useContext(AuthContext);
}
