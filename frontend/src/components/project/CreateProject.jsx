import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider.jsx";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
    const { backendURL, token, setToken} = useContext(AppContext);
    const navigate = useNavigate();
    const [name, setProjectName] = useState("");
    const [description, setDescription] = useState("");

    const handleOnSubmit = async () => {
        try {
            const { data } = await axios.post(`${backendURL}/api/project/createproject`, { name, description }, { headers: { token } });

            if(data.success){
                toast.success(data.message);
                navigate("/dashboard");

            }
            else{
                toast.error(data.message);
            }
        }
        catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }

    return (
        <>
            {/* Overlay */}
            <div className="modal-backdrop fade show "></div>

            {/* Modal */}
            <div className="modal d-block" tabIndex="-1 " >
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Create Project</h5>
                        </div>

                        <div>
                            <form className="p-4">
                                <div className="">
                                    <label htmlFor="project">Project Name : </label>
                                    <input type="text" className="form-control mt-1" 
                                    placeholder="Enter project name"
                                    name="name"
                                    value={ name}
                                    onChange={(event) => setProjectName(event.target.value)}
                                     />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="description">Description : </label>
                                    <input type="text" className="form-control mt-1" 
                                    placeholder="Enter Description"
                                    name="description"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                     />
                                </div>

                                <div className="d-flex gap-3">
                                    <div class="">
                                    <button onClick={handleOnSubmit} type="button" class="btn btn-primary">Save Project</button>
                                </div>

                                <div class=" ">
                                    <button onClick={handleOnSubmit} type="button" class="btn btn-secoundary">Cancel</button>
                                </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateProject;

