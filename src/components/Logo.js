import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../idea.png";

const Logo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // List of pages where clicking the logo should NOT navigate
  const disabledRoutes = ["/login", "/signup","/home"];

  const isNavigationDisabled = disabledRoutes.includes(location.pathname);

  return (
   <>
      DevRes
      <img
        alt="DevResolve"
        src={logo}
        className={`h-16 md:h-20 w-auto invert brightness-0 ${isNavigationDisabled ? '' : 'cursor-pointer'}`}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        onClick={() => {
          if (!isNavigationDisabled) {
            navigate("/dashboard");
          }
        }}
      />
      lve
      </>
  );
};

export default Logo;
