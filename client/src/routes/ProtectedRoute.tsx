import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);

  return children;
}

export default ProtectedRoute;
