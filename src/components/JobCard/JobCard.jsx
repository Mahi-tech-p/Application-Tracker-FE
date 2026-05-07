import "../../styles/jobcard.css";

const JobCard = ({ job, handleDelete, handleEdit }) => {
  return (
    <div className="job-card">

      <h3>{job.company}</h3>

      <p>{job.role}</p>

      <span className="job-status">
        {job.status}
      </span>

      <div className="job-card-btns">

        <button
          className="edit-btn"
          onClick={() => handleEdit(job)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => handleDelete(job._id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default JobCard;