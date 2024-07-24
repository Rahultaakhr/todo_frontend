import axios from "axios";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate=useNavigate()
    const [error, setError] = useState("")
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: ''
    })
    const registerUser = async () => {
        try {
            const response = await axios.post("/api/users/register", userDetails).then((res) => res.data)
            console.log(response);
            navigate("/login")
        } catch (error) {
            console.log(error);
        }
    }
    return (

        <div className=" w-full h-screen flex items-center justify-center">
            <div className=" w-[350px] md:w-[400px] max-w-[400px] h-[400px] p-2 bg-blue-gray-300 rounded-3xl">
                <h1 className=" text-center text-3xl font-medium py-3 ">Register</h1>
                <div className=" w-full flex flex-col py-4 gap-4">
                    <input type="text" placeholder="Enter username" className=" py-4 rounded-full ps-3 flex-1"
                    onChange={(e)=>{setUserDetails({...userDetails,username:e.target.value})}}
                    value={userDetails.username}
                    />
                    <input type="text" placeholder="Enter password" className=" py-4 rounded-full ps-3 flex-1"
                      onChange={(e)=>{setUserDetails({...userDetails,password:e.target.value})}}
                      value={userDetails.password}
                    />
                </div>
                {
                    error && <p className=" text-red-400">
                        {error}
                    </p>
                }
                <p>If already have an account <Link to={"/login"} className=" font-semibold">login</Link></p>
                <div className=' flex justify-center pt-4'> <Button className=" mx-auto" onClick={registerUser}>register</Button></div>
            </div>
        </div>
    )
}

export default Register