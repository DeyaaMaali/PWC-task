import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

//Admins
const allComplaints = React.lazy(() => import("./views/admin/allComplaints"));

//Users
const userComplaints = React.lazy(() =>
  import("./views/user/complaints/index")
);
const createComplaint = React.lazy(() =>
  import("./views/user/complaints/create")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    permission: "All",
  },
  {
    path: "/admin/complaints",
    name: "All Complaints",
    component: allComplaints,
    exact: true,
    permission: "Admin",
  },
  {
    path: "/complaints/create",
    name: "Craete Complaint",
    component: createComplaint,
    permission: "User",
  },
  {
    path: "/user/complaints",
    name: "My Complaints",
    component: userComplaints,
    permission: "User",
  },
];

export default routes;
