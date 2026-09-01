import React from 'react';
import { Link, useNavigate} from "react-router-dom";

const Projects = () => {
    const navigate = useNavigate();
    return (
        <div className='container'>

            <div className="row">
                <div className='col-2'>
                    <div>
                        <h4>Taskbar</h4>
                        <h5>Dashboard</h5>
                        <h5>Projects</h5>
                    </div>

                    <div>
                        <h5>Logout</h5>
                    </div>

                </div>

                {/* projects */}

                <div className='col-10'>
                    <p>Projects</p>

                <div className='d-flex justify-content-between'>
                    <div>
                        <input type="text" placeholder='Search projects' className='form-control lg' required />
                    </div>

                    <div>
                        <button 
                        onClick={() => navigate("/createProject")}
                        className='btn text-white' 
                        style={{ backgroundColor: "#4F46C5" }}>New Projects</button>
                    </div>
                </div>

                    <div className="row bg-light">
                        <div className="col-3 fw-bold ">
                            Project Name
                        </div>
                        <div className="col-3 fw-bold">
                            Description
                        </div>
                        <div className="col-2 fw-bold">
                            Tasks
                        </div>
                        <div className="col-2 fw-bold">
                            Completed
                        </div>
                        <div className="col-2 fw-bold">
                            Actions
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    );
}

export default Projects;
