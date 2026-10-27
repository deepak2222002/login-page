// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const token = sessionStorage.getItem("token");

//   if (!token) {
//     // if no token, redirect to login
//     return <Navigate to="/" replace />;
//   }
//   return children;
// };

// export default ProtectedRoute;


// import React from "react";
// import { Navigate } from "react-router-dom";
// import { usePermissionStore } from "../auth/Permission"
// import { useEffect } from "react";

// const ProtectedRoute = ({ permissionName, children }) => {

//   const fetchPermissions = usePermissionStore((state) => state.fetchPermissions);

//   useEffect(() => {
//     fetchPermissions();
//   }, []);

//   const permissions = usePermissionStore((state) => state.permissions);
//   const hasPermission = (permissionName) => permissions.includes(permissionName);

//   console.log(permissions);
//   console.log(permissionName);
//   console.log(!hasPermission(permissionName));

//   if (!hasPermission(permissionName)) {
//     return <Navigate to="/WebApplication/dashboard" />;
//   }
//   return children;
// };

// export default ProtectedRoute;

// import React, { useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import { usePermissionStore } from "../auth/Permission";

// const ProtectedRoute = ({ permissionName, children }) => {

//   const fetchPermissions = usePermissionStore((state) => state.fetchPermissions);
//   const permissions = usePermissionStore((state) => state.permissions);
//   const loading = usePermissionStore((state) => state.loading);

//   useEffect(() => {
//     if (permissions.length === 0) {  
//       fetchPermissions();     // Fetch only if not already loaded
//     }
//   }, [fetchPermissions, permissions]);

//   const hasPermission = (name) => {
//     return permissions.some(p => p[0] === name);   // because server returns [["Projects"], ["Users"]]
//   };

//   // 🔥 IMPORTANT — If still loading permissions → don't redirect yet
//   if (loading) {
//     return <div>Loading...</div>; // Or your custom spinner
//   }


//     console.log(permissions);
//   console.log(permissionName);
//   console.log(!hasPermission(permissionName));

//   // 🔥 Now that permissions are ready, check access
//   if (!hasPermission(permissionName)) {
//     return <Navigate to="/WebApplication/dashboard" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
import { usePermissionStore } from "../auth/Permission";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = ({ permissionName, children }) => {
  // const fetchPermissions = usePermissionStore((state) => state.fetchPermissions);
  // const permissions = usePermissionStore((state) => state.permissions);
  // const loading = usePermissionStore((state) => state.loading);

  // useEffect(() => {
  //   // fetch only if not loaded
  //   if (permissions.length === 0) {
  //     fetchPermissions();
  //   }
  // }, [permissions, fetchPermissions]);

  // // Still loading → WAIT (don't redirect)
  // if (loading) {
  //   return <LoadingSpinner message={`Loading .....`} />;
  // }

  // // Check permission correctly
  // // const allowed = permissions.  some(p => p[0] === permissionName);
  // const allowed = permissions.includes(permissionName);

  // console.log(loading);
  // console.log(permissionName);
  // console.log(permissions.includes(permissionName));
  // console.log(permissions);

  // if (!allowed) {
  //   return <Navigate to="/WebApplication/dashboard" replace />;
  // }
  // return children;

  const loading = usePermissionStore((state) => state.loading);
  const permissions = usePermissionStore((state) => state.permissions);

  if (loading) {
    return <LoadingSpinner message={`Loading .....`} />;
  }

  console.log(loading);
  console.log(permissionName);
  console.log(permissions.includes(permissionName));
  console.log(permissions);

  const allowed = permissions.includes(permissionName);

  if (!allowed) {
    return <Navigate to="/WebApplication/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
