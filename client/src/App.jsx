import { useState } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Trip from "./pages/Trip";
import Login from "./components/Login.jsx";
import Map from "./components/Map.jsx";


function App() {

  const[isLoggedIn, setIsLoggedIn] = useState(false);
  
  
  return (
    <>
    {/* {
      (localStorage.getItem("token")) ? 
      (<Home/>) : (<Login/>)    */}

    <div className="container-fluid">
      <div className="row justify-content-center mt-3">
        <div className="col-md-6"></div>

        
        <div>

        {!isLoggedIn && <Login setIsLoggedIn={(value) => setIsLoggedIn(value)} />}
          {isLoggedIn && <>
          <Link to="/" className="btn btn-dark btn-sm">
            Home
          </Link>
          {/* <Link to="/trips/new/:type_id/Map" >
          Map
        </Link> */}
        </>
          }
        </div>

        <Routes>


         {!isLoggedIn && (
           <Route 
           path="/login" 
           element={<Login setIsLoggedIn={value => setIsLoggedIn(value)} />}
            />)}
         {isLoggedIn && 
         <Route path="/" element={<Home />} >
            <Route path="/trips/new/:type_id" element={<Trip />} />
            {/* <Route path="/trips/new/:type_id/Map" element={<Map />} /> */}
          </Route>}
        </Routes>
      </div>
    </div>

    </>
  );
}
export default App;



{/* <Routes> */}
// {!isLoggedIn && <Route path="/login" element={<Login setIsLoggedIn={(value) => setIsLoggedIn(value)} />} />}
// {isLoggedIn && <Route path="/" element={<Home />} >
//     <Route path="/trips/new/:type_id" element={<Trip />} />
//  
  

//   </Route>}
// </Routes>



 {/* <Route path="/login" element={<Login setIsLoggedIn={(value) => setIsLoggedIn(value)} />} />
       <Route path="/" element={<Home />} >
            <Route path="/trips/new/:type_id" element={<Trip />} />
          </Route>*/}



             {/* {!isLoggedIn && <Link to="/login"></Link>}
          {isLoggedIn && <Link to="/" className="btn btn-dark btn-sm">
            Home
          </Link>} */}