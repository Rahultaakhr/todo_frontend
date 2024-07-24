import axios from "axios";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthUser } from "../redux/userSlice";

function Login() {
  const [error, setError] = useState("")
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: ''
  })
  const loginUser = async () => {
    try {
      const response = await axios.post("/api/users/login", userDetails).then((res) => res.data)
      console.log(response.data);
      dispatch(setAuthUser(response.data))
      navigate("/")
      
    } catch (error) {
      console.log(error);
    }
  }
  return (

    <div className=" w-full h-screen flex items-center justify-center">
      <div className=" w-[350px] md:w-[400px] max-w-[400px] h-[400px] p-2 bg-blue-gray-300 rounded-3xl">
        <h1 className=" text-center text-3xl font-medium py-3 ">Login</h1>
        <div className=" w-full flex flex-col py-4 gap-4">
          <input type="text" placeholder="Enter username" className=" py-4 rounded-full ps-3 flex-1"
            onChange={(e) => { setUserDetails({ ...userDetails, username: e.target.value }) }}
            value={userDetails.username}
          />
          <input type="text" placeholder="Enter password" className=" py-4 rounded-full ps-3 flex-1"
            onChange={(e) => { setUserDetails({ ...userDetails, password: e.target.value }) }}
            value={userDetails.password}
          />
        </div>
        {
          error && <p className=" text-red-400">
            {error}
          </p>
        }
        <p>If don't have an account <Link to={"/register"} className=" font-semibold">register</Link></p>
        <div className=' flex justify-center pt-4'> <Button className=" mx-auto" onClick={loginUser}>login</Button></div>
      </div>
    </div>
  )
}

export default Login