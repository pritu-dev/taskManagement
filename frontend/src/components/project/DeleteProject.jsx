import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContextProvider';
import axios from 'axios';

const DeleteProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
   const { backendURL, token, getProjectData} = useContext(AppContext);

  const handleDelete = async () => {
    try {

        const { data } = await axios.post(
            `${backendURL}/api/project/delete/${id}`,
            {},
            {
                headers: { token }
            }
        );

        if (data.success) {
            toast.success(data.message);
            await getProjectData();
            navigate("/dashboard");
        } 
        else {
            toast.error(data.message);
        }

    } catch (err) {
      console.log(err.message);
        toast.error(err.message);
    }
};
  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Are you sure?</h5>
            </div>

            <div className="modal-body text-center">
              <p>Do you want to delete this project?</p>

              <button className="btn btn-secondary me-2" onClick={() => navigate("/dashboard")}>
                No
              </button>

              <button className="btn btn-primary"
                onClick={handleDelete}>
                Yes
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteProject;
