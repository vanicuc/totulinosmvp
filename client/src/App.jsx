
import { useState } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Trip from "./pages/Trip";
import Login from "./components/Login.jsx";
import RequireAuth from "./components/RequireAuth";
import NavBar from "./components/NavBar";
import AuthProvider from "./components/AuthProvider";


function App() {

  return (
    <AuthProvider>
   <div className="App container p-5">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/trips/new/:type_id"
            element={
              <RequireAuth>
                {/* <PrivateDashboard /> */}
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

//---------------------------------------------------


// function App() {

//   const[isLoggedIn, setIsLoggedIn] = useState(false);
//   return (
//     <>
//     {/* {
//       (localStorage.getItem("token")) ? 
//       (<Home/>) : (<Login/>)    */}

//     <div className="container-fluid">
//       <div className="row justify-content-center mt-3">
//         <div className="col-md-6"></div>  
//         <div>

//         {!isLoggedIn && <Login setIsLoggedIn={(value) => setIsLoggedIn(value)} />}
//           {isLoggedIn && <>
//           <Link to="/" className="btn btn-dark btn-sm">
//             Home
//           </Link>
//           {/* <Link to="/trips/new/:type_id/Map" >
//           Map
//         </Link> */}
//         </>
//           }
//         </div>

//         <Routes>
//          {!isLoggedIn && (
//            <Route 
//            path="/login" 
//            element={<Login setIsLoggedIn={value => setIsLoggedIn(value)} />}
//             />)}
//          {isLoggedIn && 
//          <Route path="/" element={<Home />} >
//             <Route path="/trips/new/:type_id" element={<Trip />} />
//             {/* <Route path="/trips/new/:type_id/Map" element={<Map />} /> */}
//           </Route>}
//         </Routes>
//       </div>
//     </div>

//     </>
//   );
// }
// export default App;
