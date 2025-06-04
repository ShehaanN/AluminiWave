import { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUserData } from "../../services/dataService";

const LoadingView = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "1.2em",
    }}
  >
    <p>Verifying access...</p>
  </div>
);

const ProtectedRoute = ({
  allowedRoles,
  requireSuperAdmin = false,
  children,
}) => {
  const [authStatus, setAuthStatus] = useState({
    isLoading: true,
    isAuthenticated: false,
    userProfile: null,
  });
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const checkAuthStatus = async () => {
      try {
        const userData = await getUserData();
        if (isMounted) {
          if (userData && userData.session) {
            setAuthStatus({
              isLoading: false,
              isAuthenticated: true,
              userProfile: userData.profile || null,
            });
          } else {
            setAuthStatus({
              isLoading: false,
              isAuthenticated: false,
              userProfile: null,
            });
          }
        }
      } catch (error) {
        console.error("Error during auth check in ProtectedRoute:", error);
        if (isMounted) {
          setAuthStatus({
            isLoading: false,
            isAuthenticated: false,
            userProfile: null,
          });
        }
      }
    };

    checkAuthStatus();

    return () => {
      isMounted = false; // Cleanup
    };
  }, []);

  if (authStatus.isLoading) {
    return <LoadingView />;
  }

  // If not authenticated, redirect to login
  if (!authStatus.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  //  If superadmin access is specifically required
  if (requireSuperAdmin) {
    if (
      !authStatus.userProfile ||
      authStatus.userProfile.is_superadmin !== true
    ) {
      console.warn(
        `Access Denied: Superadmin privileges required for "${location.pathname}". User is_superadmin: ${authStatus.userProfile?.is_superadmin}`
      );
      return (
        <Navigate
          to="/unauthorized"
          state={{ requiredPermission: "Superadmin" }}
          replace
        />
      );
    }
    // If superadmin is required and user is superadmin, allow access
    return children ? children : <Outlet />;
  }

  // If specific roles are allowed ( not a superadmin-only route)
  if (allowedRoles && allowedRoles.length > 0) {
    const currentUserRole = authStatus.userProfile?.role;
    if (!currentUserRole || !allowedRoles.includes(currentUserRole)) {
      console.warn(
        `Access Denied: User role "${currentUserRole}" not in allowed roles "${allowedRoles.join(
          ", "
        )}" for "${location.pathname}"`
      );
      return (
        <Navigate
          to="/unauthorized"
          state={{ requiredRoles: allowedRoles.join(", ") }}
          replace
        />
      );
    }
  }

  // If all checks pass: user is authenticated
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
