import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";


const Dashboard_Admin = ({ setAuth }) => {
  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard_admin/", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setName(parseRes.employee_first_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully!");
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <Fragment>
      <h1>Welcome Admin {name}</h1>
      <div className="body">
      </div>
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        Logout
      </button>
    </Fragment>
  );
};

export default Dashboard_Admin;