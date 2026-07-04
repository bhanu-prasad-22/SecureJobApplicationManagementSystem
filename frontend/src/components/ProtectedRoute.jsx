//This is a "Wrapper" component. It doesn't show much on the screen, but it makes a big decision.

//The Logic: "Does a token exist in localStorage?"

//If Yes: Show the Dashboard.

//If No: Redirect to /login.

//Why it matters: This prevents someone from just typing localhost:5173/dashboard into their browser to see your data without logging in.

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;