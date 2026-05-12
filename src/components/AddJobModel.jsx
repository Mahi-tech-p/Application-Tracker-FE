import { useState } from "react";

import "../styles/addjobmodel.css";

import { addJob } from "../services/jobService";

import { useDispatch } from "react-redux";

import {
  addJobRedux,
  addJobThunk,
} from "../redux/job/jobSlice";

const AddJobModal = () => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
  });

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddJob = async () => {

    try {

      // const res = await addJob(formData);

      // console.log(res.data);

      // Redux Update
      dispatch(addJobThunk(formData));

      // Clear Form
      setFormData({
        company: "",
        role: "",
        status: "Applied",
      });

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="add-job-container">

      <input
        type="text"
        name="company"
        placeholder="Company Name"
        value={formData.company}
        onChange={handleChange}
      />

      <input
        type="text"
        name="role"
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="Applied">Applied</option>

        <option value="Interview">Interview</option>

        <option value="Offer">Offer</option>
      </select>

      <button onClick={handleAddJob}>
        Add Job
      </button>

    </div>
  );
};

export default AddJobModal;