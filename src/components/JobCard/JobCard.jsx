import { useDraggable } from "@dnd-kit/core";
import "../../styles/jobcard.css";

const JobCard = ({ job, handleDelete, handleEdit }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: job._id })

  const style = transform ? {
    transform: `translate3d(
          ${transform.x}px,
          ${transform.y}px,
          0
        )`,
  }
    : undefined;
  return (
    <div ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="job-card"
    >

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