
import { createBrowserRouter } from "react-router-dom";
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
import TimesheetLayout from "../pages/TimeSheet/TimesheetLayout";
import TimesheetFilling from "../pages/TimeSheet/TimesheetFilling";


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
        children: [
            {
                index: true,
                element: <TimesheetFilling />,
            },
        ],
    },

]);



export default router;