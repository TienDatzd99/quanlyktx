
import React from "react";
import { useRoutes } from "react-router-dom";
import HomeTemplate from "../templates/HomeTemplate/HomeTemplate";
import Home from "../pages/Home";

function useRoutesCustom() {
    let element = useRoutes([
      {
        path: "/",
        element: (
          <div>
            <HomeTemplate /> 
          </div>
        ),
        children: [
          {
            path: "",
            element: <Home />, 
          },
   
        ],
      },
    ]);
  
    return element;
  }
  export default useRoutesCustom;