import { Link, useLocation } from "react-router-dom";

const UnauthorizedPage = () => {
  const location = useLocation();
  const requiredPermission = location.state?.requiredPermission;
  const requiredRoles = location.state?.requiredRoles;

  let message = "You do not have the necessary permissions to view this page.";
  if (requiredPermission) {
    message = `You need "${requiredPermission}" privileges to access this page.`;
  } else if (requiredRoles) {
    message = `You need one of the following roles to access this page: ${requiredRoles}.`;
  }

  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2em", color: "#333" }}>Access Denied</h1>
      <p style={{ fontSize: "1.2em", color: "#666", margin: "20px 0" }}>
        {message}
      </p>
      <Link
        to="/dashboard"
        style={{
          padding: "10px 20px",
          backgroundColor: "#269EB2",
          color: "white",
          textDecoration: "none",
          borderRadius: "5px",
        }}
      >
        Go to My Dashboard
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
