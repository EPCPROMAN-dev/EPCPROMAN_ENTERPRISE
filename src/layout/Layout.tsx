import {useState} from "react";
import { Outlet, useMatches } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import NavBar from "../components/NavBar/Navbar";
import "../index.css";
function Layout() {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const matches = useMatches();

  const currentNode: any = matches[matches.length - 1];

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="layout"
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {!isExpanded && (
        <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      )}

      {!isExpanded && <Sidebar open={open} />}

      <main
        style={{
          marginLeft: isExpanded ? "0px" : open ? "245px" : "65px",
          marginTop: isExpanded ? "0px" : "64px",
          height: isExpanded ? "100vh" : "calc(100vh - 64px)",
          width: isExpanded ? "100%" : "auto",
          transition: "all 0.2s ease",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          padding: isExpanded ? "0px" : "10px",
          boxSizing: "border-box",
          background: "#f7f7f7"
        }}
      >
        {currentNode.handle?.showBreadcrumb && <Breadcrumb />}

        {currentNode.handle?.showNavbar && <NavBar />}

        <div
          style={{
            flex: 1,
            // minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            height: "100%",
          }}
        >
          <Outlet
            context={{
              isExpanded,
              setIsExpanded,
            }}
          />
        </div>
      </main>
    </div>
  );
}

export default Layout;
