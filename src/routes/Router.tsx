
import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";

import Apps from "../pages/Apps/Apps";;
// import Calendar from "../pages/Calendar/Calendar";

import AppDetails from "../pages/Apps/AppDetails";
import PortfolioPerformance from "../dashboards/PortfolioPerformance/PortfolioPerformance";
import ProjectPerformance from "../pages/ProjectPerformance/ProjectPerformance";
import CommercialPerformance from "../pages/CommercialPerformance/CommercialPerformance";
import OperationalAnalysis from "../pages/OperationalAnalysis/OperationalAnalysis";
import EPCPROMANAI from "../pages/EpcromanAI/EpcromanAI";
import ScrumBoard from "../pages/ScrumBoard/ScrumBoard";
import FunctionalArea from "../pages/Apps/FunctionalArea";
import Starred from "../pages/Starred/Starred";
import ForYou from "../pages/ForYou/forYou";
import Test from "../dashboards/Test/Test";
import TimesheetLayout from "../layout/Timesheet/TimesheetLayout";
import TimesheetFilling from "../pages/TimeSheet/TimeSheet/TimesheetFilling";
import LeaveApply from "../pages/TimeSheet/Leave/LeaveApply";
import AppliedHistory from "../pages/TimeSheet/Leave/AppliedHistory";
import ProcessedHistory from "../pages/TimeSheet/Leave/ProcessedHistory"
import ApprovalDisapproval from "../pages/TimeSheet/Leave/ApprovalDisapproval"

// interface BreadcrumbHandle {
//     breadcrumb: string;
// }


const router = createBrowserRouter([

    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Apps />,
            },
            {
                path: "apps",
                element: <Apps />,
            },
            {
                path: "portfolio-performance",
                element: <PortfolioPerformance />
            },
            {
                path: "cardTest",
                element: <Test />
            },
            {
                path: "project-performance",
                element: <ProjectPerformance />
            },
            {
                path: "commercial-performance",
                element: <CommercialPerformance  />
            },
            {
                path: "operational-analysis",
                element: <OperationalAnalysis />
            },
            {
                path: "EPCPROMAN-AI",
                element: <EPCPROMANAI />
            },
            {
                path: "scrum-board",
                element: <ScrumBoard />
            },
            {
                path: "apps/:appCode",
                element: <AppDetails />,
            },

            {
                path: "apps/:appCode/:areaCode",
                element: <FunctionalArea />,
            },
            {
                path: "starred",
                element: <Starred />,
            },
             {
                path: "for-you",
                element: <ForYou />,
            },
        ],
    },
    {
        path: "/da",
        element:<PortfolioPerformance />,
    },   
    {
        path: "/timesheet",
        element: <TimesheetLayout />,
        handle: {
            breadcrumb: "Timesheet",
        },
        children: [
            {
                index: true,
                element: <Navigate to="filling" replace />,
                // replace prevents the redirect from adding an unnecessary browser-history entry.
            },
            {
                path: "filling",
                element: <TimesheetFilling />,
                handle: {
                    breadcrumb: "Filling",
                },
            },
            {
              path: "approval",
              element: <div>Timesheet Approval</div>,
              handle: { breadcrumb: "Approval" },
            },
            {
              path: "attendance",
              element: <div>View Attendance</div>,
              handle: { breadcrumb: "View Attendance" },
            },
            {
              path: "punch-in-details",
              element: <div>Punch-In Details</div>,
              handle: { breadcrumb: "Punch-In Details" },
            },
            {
              path: "pre-processing",
              element: <div>Punch-Processing Data</div>,
              handle: { breadcrumb: "Punch-Processing Data" },
            },     
        ],
    },  
    {
      path: "/leave",
      element: <TimesheetLayout />,
      handle: {
        breadcrumb: "Leave",
      },
      children: [
        {
          path: "new-edit",
          handle: {
            breadcrumb: "New/Edit",
          },
          children: [
            {
              path: "leave-apply",
              element: <LeaveApply />,
              handle: {
                breadcrumb: "Leave Apply",
              },
            },
            {
              path: "applied-history",
              element: <AppliedHistory />,
              handle: {
                breadcrumb: "Applied History",
              },
            },
            {
              path: "processed-history",
              element: <ProcessedHistory />,
              handle: {
                breadcrumb: "Processed History",
              },
            },
          ],
        },
         {
      path: "approval-disapproval",
      element: <ApprovalDisapproval />,
      handle: { breadcrumb: "Approval/Disapproval" },
    },
      ],
    },

]);



export default router;