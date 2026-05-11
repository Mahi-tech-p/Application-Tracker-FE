import React, { useState } from 'react';

import '../../styles/editjobmodel.css';

import { updateJob } from '../../services/jobService';

import { useDispatch } from 'react-redux';

import {
  updateJobRedux,
} from '../../redux/job/jobSlice';

const EditJobModel = ({
  selectedJob,
  closeModal,
}) => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    company: selectedJob.company,
    role: selectedJob.role,
    status: selectedJob.status,
  });

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {

    try {

      const res = await updateJob(
        selectedJob._id,
        formData
      );

      // Redux Update
      dispatch(updateJobRedux(res.data));

      closeModal();

    } catch (error) {

      console.log(error.message);

    }
  };

  const handleCancel = () => {

    closeModal();

  };

  return (

    <div className="edit-model">

      <div className="edit-model-content">

        <h2>Edit Job</h2>

        <input
          type="text"
          value={formData.company}
          onChange={handleChange}
          name="company"
        />

        <input
          type="text"
          value={formData.role}
          onChange={handleChange}
          name="role"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Applied">
            Applied
          </option>

          <option value="Interview">
            Interview
          </option>

          <option value="Offer">
            Offer
          </option>

        </select>

        <div className="edit-btns">

          <button
            className="update-btn"
            onClick={handleUpdate}
          >
            Update
          </button>

          <button
            className="cancel-btn"
            onClick={handleCancel}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
};

export default EditJobModel;