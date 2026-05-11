import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import JobColumn from '../components/JobCard/JobColumn';
import '../styles/dashboard.css';

import AddJobModal from '../components/AddJobModel';
import EditJobModel from '../components/JobCard/EditJobModel';

import {
  deleteJob,
  getJobs,
  updateJob,
} from '../services/jobService';

import { DndContext } from '@dnd-kit/core';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  removeJobRedux,
  setJobs,
  updateJobRedux,
} from '../redux/job/jobSlice';

const Dashboard = () => {

  const dispatch = useDispatch();

  const jobs = useSelector(
    (state) => state.jobs.jobs
  );

  const [selectedJob, setSelectedJob] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  // Fetch Jobs
  useEffect(() => {

    const loadJobs = async () => {

      try {

        const res = await getJobs();

        dispatch(setJobs(res.data));

      } catch (error) {

        console.log(error);

      }
    };

    loadJobs();

  }, [dispatch]);

  // Delete Job
  const handleDelete = async (id) => {

    try {

      await deleteJob(id);

      dispatch(removeJobRedux(id));

    } catch (error) {

      console.log(error);

    }
  };

  // Open Edit Modal
  const handleEdit = (job) => {

    setSelectedJob(job);

    setIsEditOpen(true);
  };

  // Close Edit Modal
  const handleCloseModal = () => {

    setIsEditOpen(false);

    setSelectedJob(null);
  };

  // Drag & Drop
  const handleDragEnd = async (event) => {

    const { active, over } = event;

    if (!over) return;

    const jobId = active.id;

    const newStatus = over.id;

    // Find dragged job
    const draggedJob = jobs.find(
      (job) => job._id === jobId
    );

    if (!draggedJob) return;

    // Updated job object
    const updatedJob = {
      ...draggedJob,
      status: newStatus,
    };

    // Optimistic UI update
    dispatch(updateJobRedux(updatedJob));

    try {

      await updateJob(jobId, {
        status: newStatus,
      });

    } catch (error) {

      console.log(error.message);

    }
  };

  return (
    <>

      {/* Edit Modal */}
      {isEditOpen && selectedJob && (
        <EditJobModel
          selectedJob={selectedJob}
          closeModal={handleCloseModal}
        />
      )}

      <Layout>

        {/* Add Job */}
        <AddJobModal />

        <DndContext onDragEnd={handleDragEnd}>

          <div className="dashboard-columns">

            <JobColumn
              title="Applied"
              jobs={jobs.filter(
                (job) => job.status === 'Applied'
              )}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />

            <JobColumn
              title="Interview"
              jobs={jobs.filter(
                (job) => job.status === 'Interview'
              )}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />

            <JobColumn
              title="Offer"
              jobs={jobs.filter(
                (job) => job.status === 'Offer'
              )}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />

          </div>

        </DndContext>

      </Layout>
    </>
  );
};

export default Dashboard;