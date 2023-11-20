
import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
// import "./login.css";

function Login() {
  const { onLogin } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [data, setData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { username, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      const { data } = await axios("/api/auth/login", {
        method: "POST",
        data: credentials,
      });
      setIsLoggedIn(true);
      //store it locally
      localStorage.setItem("token", data.token);
      onLogin();
      console.log(data.message, data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    console.log("Logged out");
  };

  const requestData = async () => {
    try {
      const { data } = await axios("/api/auth/profile", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setData(data.message);
    } catch (error) {
      console.log(error);
    }
  };

    return (
  <>
    <div id="contenedor">
    <div id="contenedorcentrado">
    <div id="login">
      <div className="logingform">
          <label className="usuario">User</label>
            <input
              id="usuario"
              placeholder="User"
              value={username}
              onChange={handleChange}
              name="username"
              type="text"
              className="form-control mb-2"
              required
            />
              <label className ="password">Password</label>
            <input
              id="password"
              placeholder="password"
              value={password}
              onChange={handleChange}
              name="password"
              type="password"
              className="form-control mb-2"
              required
            />
            <div className="d-flex gap-2 justify-content-center">

              {/* Mostrar el botón de inicio de sesión solo si no está iniciada la sesión */}
        {!isLoggedIn && (
          <button className="btn btn-outline-dark ml-2" onClick={login}>
            Log in
          </button>
        )}

        {/* Mostrar el botón de cierre de sesión solo si está iniciada la sesión */}
        {isLoggedIn && (
          <button className="btn btn-outline-dark ml-2" onClick={logout}>
            Log out
          </button>
        )}

{/*               
              <button className="btn btn-outline-dark ml-2"  onClick={login}>
                Log in
              </button>
              <button className="btn btn-outline-dark ml-2" onClick={logout}>
                Log out
              </button> */}
            </div>
          
        </div>
      </div>
    
      <div id="derecho">
        <marquee>
                🚴‍♀️ 🚴‍♀️🍅 🚴‍♀️ 🚴‍♀️ 🚴‍♀️ 🚴‍♀️ 🚴‍♀️ 🚴‍♀️ 🍅🚴‍♀️ 🚴🏾‍♀️ 🚴‍♀️ 🚴‍♀️ 🚴🏾‍♀️ 🚴‍♀️ 🚴🏾‍♀️🍅 🚴‍♀️ 🚴‍♀️ 🚴‍♀️ 🚴‍♀️ 🚴‍♀️ 🚴‍♀️
                🚴‍♀️ 🚴‍♀️ 🚴‍♀️{" "}
              </marquee>
              
              
        </div>
      </div>
      <img
        src="/5562de8abbac0d937cfddde0eddab83b.jpg"
        alt="background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.1, // Ajusta este valor para cambiar la opacidad
          pointerEvents: 'none', // Evita que la imagen capture eventos de puntero
        }}
      />
    </div>
  </>
  );
}

export default Login;



{/* {
//       (localStorage.getItem("token")) ? 
//       (<Home/>) : (<Login/>)    */}




//---------------------------------------


// import { useState } from "react";
// import axios from "axios";


// function Login({setIsLoggedIn}) {

//   const [credentials, setCredentials] = useState({
//     username: "",
//     password: "",
//   });

//   const [data, setData] = useState(null);

//   const { username, password } = credentials;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials({ ...credentials, [name]: value });
//   };

//   const login = async () => {
//     try {
//       const { data } = await axios("/api/auth/login", {
//         method: "POST",
//         data: credentials,
//       });

//       //store it locally
//       localStorage.setItem("token", data.token);
//       console.log(data.message, data.token);
//       setData(data.message);
//       setIsLoggedIn(true);
//     } catch (error) {
//       console.log(error);
//       setData(error.message);
      
//     }

//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//   };

//   const requestData = async () => {
//     try {
//       const { data } = await axios("/api/auth/profile", {
//         headers: {
//           authorization: "Bearer " + localStorage.getItem("token"),
//         },
//       });
//       setData(data.message);
//       console.log(data.message);
//       setIsLoggedIn(false);

//     } catch (error) {
//       console.log(error);
//       setData(error.message);
//     }
//   };




//---------------------------------------------------------------
