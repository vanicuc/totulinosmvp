
import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

function Login() {
  const { onLogin } = useAuth();

  const [credentials, setCredentials] = useState({
    username: "test",
    password: "test",
  });

  const [data, setData] = useState(null);

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
            {/* <div className="d-flex gap-2 justify-content-center"> */}
              <button className="Ingresar" tittle="Ingresar" onClick={login}>
                Log in
              </button>
              <button className="btn btn-outline-dark ml-2" onClick={logout}>
                Log out
              </button>
            {/* </div> */}
          
        </div>
      </div>
    
      <div id="derecho">
        <marquee>
                🚴‍♀️ 🚴‍♀️🍅 🚴‍♀️ 🚴‍♀️ 🚴‍♀️ 🚴‍♀️ 🚴‍♀️ 🚴‍♀️ 🍅🚴‍♀️ 🚴🏾‍♀️ 🚴‍♀️ 🚴‍♀️ 🚴🏾‍♀️ 🚴‍♀️ 🚴🏾‍♀️🍅 🚴‍♀️ 🚴‍♀️ 🚴‍♀️ 🚴‍♀️ 🚴‍♀️ 🚴‍♀️
                🚴‍♀️ 🚴‍♀️ 🚴‍♀️{" "}
              </marquee>
              
              
        </div>
      </div>
    </div>
  </>
  );
}

export default Login;




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
