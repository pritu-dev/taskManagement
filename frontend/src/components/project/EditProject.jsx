import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";
import axios from "axios";
import { toast } from "react-toastify";

const EditProject = () => {
    const naviagte = useNavigate();
    const { id } = useParams();
    const { backendURL, token, projectData, getProjectData } = useContext(AppContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        getProjectData();
    }, [id]);

    const selectedProject = projectData.find(
        (pro) => pro.id == id
    );

    useEffect(() => {
        if (selectedProject) {
            setName(selectedProject.name);
            setDescription(selectedProject.description);
        }
    }, [selectedProject]);

    if (!selectedProject) {
        return <div>Loading...</div>;
    }

    const handleOnSubmit = async () => {
        try {
            const { data } = await axios.post(`${backendURL}/api/project/edit/${id}`,

                { name, description }, { headers: { token } });
            console.log(data);
            if (data.success) {
                toast.success(data.message);
                naviagte("/dashboard")
            }
            else {
                toast.error(data.message)
                console.log(data.message);
            }
        }

        catch (err) {
            toast.error(err.message);
            console.log(err.message);
        }

    }
    return (
        <>
            {/* Overlay */}
            <div className="modal-backdrop fade show"></div>

            {/* Modal */}
            <div className="modal d-block" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">
                                Edit Project
                            </h5>
                        </div>

                        <div>
                            <form className="p-4">

                                {/* Project Name */}
                                <div>
                                    <label htmlFor="project">
                                        Project Name :
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control mt-1"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div className="mt-3">
                                    <label htmlFor="description">
                                        Description :
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control mt-1"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Button */}
                                <div className="mt-3 ">
                                    <button
                                        type="button"
                                        className="btn btn-primary "
                                        onClick={handleOnSubmit}
                                    >
                                        Save Edit
                                    </button>

                                     <button
                                        type="button"
                                         className="btn btn-secondary ms-3"
                                         onClick={() => naviagte("/dashboard")}
                                    >
                                       Cancle
                                    </button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default EditProject;

