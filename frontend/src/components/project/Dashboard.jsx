import React, { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
    const navigate = useNavigate();

    const {
        getProjectData,
        projectData,
        token,
        setToken,
        getAllTasks,
        allTasks
    } = useContext(AppContext);

    useEffect(() => {
        if (token) {
            getProjectData();
            getAllTasks();
        }
    }, [token]);

    const pendingTask = allTasks.filter(
        (task) => task.status !== "COMPLETED"
    );

    const completedTask = allTasks.filter(
        (task) => task.status === "COMPLETED"
    );

    const handleLogout = () => {
        toast.warn("User Logout");
        localStorage.removeItem("token");
        setToken("");
        navigate("/login");
    };

    return (
        <div className="container-fluid bg-light min-vh-100">

            <div className="row">

                {/* Sidebar */}
                <div className="col-md-2 bg-white border-end min-vh-100 p-4 d-flex flex-column">

                    <div>
                        <h3 className="fw-bold text-primary">
                            TaskFlow
                        </h3>

                        <hr />

                        <div className="mt-4">

                            <button
                                className="btn btn-primary w-100 text-start mb-2"
                            >
                                📊 Dashboard
                            </button>

                        </div>
                    </div>


                    {/* Logout - Bottom */}
                    <div className="mt-auto pt-4">

                        <hr />

                        <button
                            className="btn btn-outline-danger w-100"
                            onClick={handleLogout}
                        >
                            🚪 Logout
                        </button>

                    </div>

                </div>


                {/* Main Content */}
                <div className="col-md-10 p-4">

                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>
                            <h3 className="fw-bold mb-1">
                                Welcome back 👋
                            </h3>

                            <p className="text-muted mb-0">
                                Here's what's happening with your projects.
                            </p>
                        </div>

                        <button
                            className="btn btn-primary px-4"
                            onClick={() => navigate("/createproject")}
                        >
                            + Add Project
                        </button>

                    </div>


                    {/* Statistics Cards */}
                    <div className="row g-4 mb-5">

                        {/* Total Projects */}
                        <div className="col-lg-3 col-md-6">

                            <div className="card border-0 shadow-sm h-100">

                                <div className="card-body p-4">

                                    <p className="text-muted mb-2">
                                        Total Projects
                                    </p>

                                    <h1 className="fw-bold text-primary mb-0">
                                        {projectData.length}
                                    </h1>

                                </div>

                            </div>

                        </div>


                        {/* Total Tasks */}
                        <div className="col-lg-3 col-md-6">

                            <div className="card border-0 shadow-sm h-100">

                                <div className="card-body p-4">

                                    <p className="text-muted mb-2">
                                        Total Tasks
                                    </p>

                                    <h1 className="fw-bold text-info mb-0">
                                        {allTasks.length}
                                    </h1>

                                </div>

                            </div>

                        </div>


                        {/* Pending Tasks */}
                        <div className="col-lg-3 col-md-6">

                            <div className="card border-0 shadow-sm h-100">

                                <div className="card-body p-4">

                                    <p className="text-muted mb-2">
                                        Pending Tasks
                                    </p>

                                    <h1 className="fw-bold text-warning mb-0">
                                        {pendingTask.length}
                                    </h1>

                                </div>

                            </div>

                        </div>


                        {/* Completed Tasks */}
                        <div className="col-lg-3 col-md-6">

                            <div className="card border-0 shadow-sm h-100">

                                <div className="card-body p-4">

                                    <p className="text-muted mb-2">
                                        Completed Tasks
                                    </p>

                                    <h1 className="fw-bold text-success mb-0">
                                        {completedTask.length}
                                    </h1>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Projects Section */}
                    <div className="card border-0 shadow-sm">

                        <div className="card-body p-4">

                            {/* Section Header */}
                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <div>
                                    <h5 className="fw-bold mb-1">
                                        Recent Projects
                                    </h5>

                                    <p className="text-muted small mb-0">
                                        Manage your projects and tasks
                                    </p>
                                </div>

                                <span className="badge bg-primary rounded-pill px-3 py-2">
                                    {projectData.length} Projects
                                </span>

                            </div>


                            {/* Table Header */}
                            <div className="row bg-light border rounded p-3 fw-bold text-muted">

                                <div className="col-md-3">
                                    Project
                                </div>

                                <div className="col-md-3">
                                    Description
                                </div>

                                <div className="col-md-2 text-center">
                                    Tasks
                                </div>

                                <div className="col-md-4 text-center">
                                    Actions
                                </div>

                            </div>


                            {/* Projects */}
                            {projectData.length === 0 ? (

                                <div className="text-center py-5">

                                    <h5>
                                        No projects found
                                    </h5>

                                    <p className="text-muted">
                                        Create your first project to get started.
                                    </p>

                                    <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                            navigate("/createproject")
                                        }
                                    >
                                        + Create Project
                                    </button>

                                </div>

                            ) : (

                                projectData.map((pro) => {

                                    const taskCount = allTasks.filter(
                                        (task) =>
                                            task.project_id == pro.id
                                    ).length;

                                    return (

                                        <div
                                            className="row align-items-center border border-top-0 p-3"
                                            key={pro.id}
                                        >

                                            {/* Project */}
                                            <div className="col-md-3">

                                                <h6 className="fw-bold mb-1">
                                                    {pro.name}
                                                </h6>

                                            </div>


                                            {/* Description */}
                                            <div className="col-md-3">

                                                <span className="text-muted">
                                                    {pro.description ||
                                                        "No description"}
                                                </span>

                                            </div>


                                            {/* Tasks */}
                                            <div className="col-md-2 text-center">

                                                <span className="badge bg-primary rounded-pill px-3 py-2">
                                                    {taskCount} Tasks
                                                </span>

                                            </div>


                                            {/* Actions */}
                                            <div className="col-md-4 text-center">

                                                <button
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                    onClick={() =>
                                                        navigate(
                                                            `/projectdetails/${pro.id}`
                                                        )
                                                    }
                                                >
                                                    View
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-outline-warning me-2"
                                                    onClick={() =>
                                                        navigate(
                                                            `/editProject/${pro.id}`
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() =>
                                                        navigate(
                                                            `/deleteproject/${pro.id}`
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </div>

                                    );
                                })

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;

