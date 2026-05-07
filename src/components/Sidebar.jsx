import React from "react";
import {
  FaHome,
  FaBriefcase,
  FaCog,
} from "react-icons/fa";
import '../styles/sidebar.css'
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Job Tracker</h2>

      <ul>
        <li>
          <FaHome className="icon" />
          Dashboard
        </li>

        <li>
          <FaBriefcase className="icon" />
          Applications
        </li>

        <li>
          <FaCog className="icon" />
          Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;