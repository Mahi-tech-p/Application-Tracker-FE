import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import JobColumn from '../components/JobCard/JobColumn';
import '../styles/dashboard.css';

import AddJobModal from '../components/AddJobModel';
import EditJobModel from '../components/JobCard/EditJobModel';


import { DndContext } from '@dnd-kit/core';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import {
  deleteJobThunk,
  fetchJobs,
  updateJobThunk,
} from '../redux/job/jobSlice';
import toast from 'react-hot-toast';

const Dashboard = () => {

  const dispatch = useDispatch();

  // const jobs = useSelector(
  //   (state) => state.jobs.jobs
  // );
  const { jobs, loading, error } = useSelector((state) => state.jobs)
  const [selectedJob, setSelectedJob] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  // Fetch Jobs
  // useEffect(() => {

  //   const loadJobs = async () => {

  //     try {

  //       // const res = await getJobs();

  //       dispatch(fetchJobs());

  //     } catch (error) {

  //       console.log(error);

  //     }
  //   };

  //   loadJobs();

  // }, [dispatch]);

  useEffect(() => {
    dispatch(fetchJobs())
  },[dispatch])

  // Delete Job
  const handleDelete = async (id) => {

    dispatch(deleteJobThunk(id))
    toast.success("Job deleted successfully")
    // try {

    //   // await deleteJob(id);

    //   // dispatch(removeJobRedux(id));
    //   dispatch(deleteJobThunk(id))

    // } catch (error) {

    //   console.log(error);

    // }
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

    // Updated job object

    // Optimistic UI update
    // dispatch(updateJobRedux(updatedJob));
    dispatch(updateJobThunk({
      id: jobId,
      formData: {
        status: newStatus
      }
    }))
    toast.success("Job status updated successfully")

    // try {

    //   await updateJob(jobId, {
    //     status: newStatus,
    //   });

    // } catch (error) {

    //   console.log(error.message);

    // }
  };
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

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