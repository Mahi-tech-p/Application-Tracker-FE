
import React from 'react'
import JobCard from './JobCard'
import '../../styles/jobcolumn.css'
import { useDroppable } from '@dnd-kit/core';
const JobColumn = ({ title, jobs, handleDelete, handleEdit }) => {
  
  const { setNodeRef } = useDroppable({
    id: title,
  });
  return (
    <div ref={setNodeRef} className="job-column">
      <h2>{title}</h2>
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} handleDelete={handleDelete} handleEdit={handleEdit} />

      ))}
    </div>
  )
}

export default JobColumn