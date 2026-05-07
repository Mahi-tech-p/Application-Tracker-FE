
import React from 'react'
import JobCard from './JobCard'
import '../../styles/jobcolumn.css'
const JobColumn = ({title,jobs,handleDelete, handleEdit}) => {
  return (
      <div className="job-column">
          <h2>{title}</h2>
          {jobs.map((job)=>(
            <JobCard key={job._id} job={job} handleDelete={handleDelete} handleEdit={ handleEdit} />
          ))}
    </div>
  )
}

export default JobColumn