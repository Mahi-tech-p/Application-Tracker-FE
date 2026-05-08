import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import JobColumn from '../components/JobCard/JobColumn';
import '../styles/dashboard.css'
import AddJobModal from '../components/AddJobModel';
import { deleteJob, getJobs, updateJob } from '../services/jobService';
import EditJobModel from '../components/JobCard/EditJobModel';
import { DndContext } from '@dnd-kit/core';
const Dashboard = () => {
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const res = await getJobs();
        console.log(res.data, "res")
        // setJobs(res.data)
        setJobs(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    loadJobs()
  }, [])
  const handleDelete = async (id) => {
    try {

      await deleteJob(id);

      setJobs(
        jobs?.filter((job) => job._id !== id)
      );

    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (job) => {
    setSelectedJob(job)
    setIsEditOpen(true)
  }
  const handleCloseModal = () => {
    setIsEditOpen(false)
  }
  const handleDragEnd = async(event) => {
    console.log(event);
    const { active, over } = event
    if (!over) return
    const jobId = active.id
    const newStatus = over.id
    const updatedJobs = jobs.map((job) =>
      job._id === jobId ? { ...job, status: newStatus } : job
    );
    setJobs(updatedJobs)
    try {
      await updateJob(jobId, {
        status: newStatus
      })
    } catch (error) {
      console.log(error.message)
    }
};
  return (
    <>
      {isEditOpen && selectedJob && <EditJobModel
        selectedJob={selectedJob}
        jobs={jobs}
        setJobs={setJobs}
        closeModel={handleCloseModal}
      />}
      <Layout>
        <AddJobModal
          jobs={jobs}
          setJobs={setJobs}
        />
        <DndContext onDragEnd={handleDragEnd}>
          <div className="dashboard-columns">

            <JobColumn
              title="Applied"
              jobs={jobs.filter((job) => job.status === "Applied")}
              handleDelete={handleDelete}
              handleEdit={handleEdit}

            />

            <JobColumn
              title="Interview"
              jobs={jobs.filter((job) => job.status === "Interview")}
              handleDelete={handleDelete}
              handleEdit={handleEdit}

            />

            <JobColumn
              title="Offer"
              jobs={jobs.filter((job) => job.status === "Offer")}
              handleDelete={handleDelete}
              handleEdit={handleEdit}

            />

          </div>
        </DndContext>

      </Layout>
    </>
  )
}

export default Dashboard