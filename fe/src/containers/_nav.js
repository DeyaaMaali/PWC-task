export default [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Complaints Section"],
    permission: "User",
  },
  {
    _tag: "CSidebarNavItem",
    name: "My Complaints",
    to: "/user/complaints",
    icon: "cil-list",
    permission: "User",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Create Complaint",
    to: "/complaints/create",
    icon: "cil-pencil",
    permission: "User",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Complaints Section"],
    permission: "Admin",
  },
  {
    _tag: "CSidebarNavItem",
    name: "All Complaints",
    to: "/admin/complaints",
    icon: "cil-list",
    permission: "Admin",
  },
];
