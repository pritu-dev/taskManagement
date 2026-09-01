import React from 'react';

const TaskDelete = () => {
    return (
        <div>
            <div className="modal-backdrop fade show"></div>

            <div className="modal d-block" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Are you sure?</h5>
                        </div>

                        <div className="modal-body text-center">
                            <p>Do you want to delete this project?</p>

                            <button className="btn btn-secondary me-2">
                                No
                            </button>

                            <button className="btn btn-primary">
                                Yes
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskDelete;
