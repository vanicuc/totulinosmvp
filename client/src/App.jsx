
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Trip from "./pages/Trip";
import Login from "./components/Login.jsx";
import RequireAuth from "./components/RequireAuth";
import NavBar from "./components/NavBar";
import AuthProvider from "./components/AuthProvider";
// import EachTrips from "./pages/EachTrips.jsx";


function App() {

return (
  <AuthProvider>
 <div className="App container p-5">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/EachTrips" element={<EachTrips />} /> */}
        <Route path="/trips/new/:type_id"
          element={
            <RequireAuth>
              <Trip/>
            </RequireAuth>
          }

        />
      </Routes>
    </div>

  </AuthProvider>
);
}
export default App;














