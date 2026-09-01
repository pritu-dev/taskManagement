import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContextProvider';

const adminPass = import.meta.env.VITE_ADMINPASS;
const adminEmail = import.meta.env.VITE_ADMINEMAIL;
// const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
    const navigate = useNavigate();
    const { backendURL, setToken} = useContext(AppContext);
    const [email, setEmail] = useState(adminEmail);
    const [password, setPassword] = useState(adminPass);

    const handleOnSubmit = async () => {
        try {
            const { data } = await axios.post(`${backendURL}/api/user/login`, { email, password });
            if (data.success) {
                toast.success(data.message);
                setToken(data.token);
                localStorage.setItem("token", data.token);
                navigate("/dashboard");
            }
            else {
                toast.error(data.message);
            }
        }
        catch (err) {
            toast.error(err.message);
        }
    }

    return (

        <div onClick={handleOnSubmit}
            className="container w-25 d-flex flex-column align-items-center mt-5 p-3 border rounded shadow-lg"
            style={{ backgroundColor: "#FFFFFF" }}
        >
            <h5 className="mb-3 fw-bold">Welcome Back!</h5>

            <div className="w-100 mb-3">
                <label htmlFor="email" className="form-label fw-semibold">Email</label>
                <input
                    id="email"
                    className="form-control"
                    type="email"
                    name="email"
                    value={email}
                    readOnly
                />
            </div>

            <div className="w-100 mb-3">
                <label htmlFor="password" className="form-label fw-semibold">Password</label>
                <input
                    id="password"
                    className="form-control"
                    type="password"
                    name="password"
                    value={password}
                    readOnly
                />
            </div>

            <div>
                <button style={{ backgroundColor: "#4F46C5" }} 
                className="btn btn-primary"
                >LogIn</button>
            </div>
        </div>

    );
}

export default Login;
