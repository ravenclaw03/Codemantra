import axios from "axios";
import { useState ,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../main";
const URL = import.meta.env.VITE_URL;
const Login = () => {
    const [values,setValues]=useState({
        email:"",
        password:""
    })
    const navigate=useNavigate()
  const {setLoggedIn}=useContext(AuthContext);
axios.defaults.withCredentials=true;
const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
        const response = await axios.post(`${URL}/login`, values);
        if (response.data.Status==="Success"){
            setLoggedIn(true);
            navigate('/submissions')
            alert("Welcome Admin!");
        }
        else{
            alert(response.data.Message);
        }
    } catch (error) {
        alert("An error occurred!")
        console.log(error);
    }
    
}
  return (
    <div className="flex justify-center items-center h-[75vh]">
      <form className="bg-[#001029] p-6 rounded-lg md:w-[30%]" onSubmit={handleSubmit}>
        <label htmlFor="email" className="block mb-2 text-white">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="w-full border-2 border-[#D6E7FF] rounded-md py-3 px-4 mb-6 focus:bg-gray-700 text-white bg-transparent"
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          required
        />

        <label htmlFor="password" className="block mb-2 text-white">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className="w-full border-2 border-[#D6E7FF] rounded-md py-3 px-4 mb-6 focus:bg-gray-700 text-white bg-transparent"
          onChange={(e) => setValues({ ...values, password: e.target.value})}
          required
        />

        <div className="flex justify-center flex-col items-center">
          <button
            type="submit"
            className="bg-[#004CB8] hover:bg-blue-700 text-white font-bold py-3 px-6 rounded w-[40%] cursor-pointer"
          >
            Login
          </button>
          <Link to="/">
            <h3 className=" mt-3 text-white hover:underline">
              Not an Admin? Return to the Code Editor.
            </h3>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
