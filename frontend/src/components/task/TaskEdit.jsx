import React from 'react';

const TaskEdit = () => {
    return (
        <>
            {/* Overlay */}
            <div className="modal-backdrop fade show "></div>

            {/* Modal */}
            <div className="modal d-block" tabIndex="-1 ">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Task Edit</h5>
                        </div>

                        <div>
                            <form className="p-4">
                                <div className="">
                                    <label htmlFor="project">Title : </label>
                                    <input type="text" className="form-control mt-1" />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="description">Description : </label>
                                    <input type="text" className="form-control mt-1" placeholder="Enter Description" />
                                </div>

                                <div className="">
                                    <label htmlFor="project">Status : </label>
                                    <input type="text" className="form-control mt-1" />
                                </div>

                                <div className="">
                                    <label htmlFor="project">Priority :  </label>
                                    <input type="text" className="form-control mt-1" />
                                </div>

                                <div className="">
                                    <label htmlFor="project">Due date </label>
                                    <input type="text" className="form-control mt-1" />
                                </div>

                                <div className="">
                                    <label htmlFor="project">Assigned user :  </label>
                                    <input type="text" className="form-control mt-1" />
                                </div>

                                <div class="mt-3 ">
                                    <button type="button" class="btn btn-primary">Save Project</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );

}

export default TaskEdit;
