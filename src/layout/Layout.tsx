import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import NavBar from "../components/NavBar/Navbar";
import "../index.css";
function Layout() {
    const [open, setOpen] = React.useState(true);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <div
            className="layout"
            style={{
                width: "100%",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <Header
                open={open}
                handleDrawerToggle={handleDrawerToggle}
            />

            <Sidebar open={open} />

            <main
                style={{
                    marginLeft: open ? "245px" : "65px",
                    marginTop: "64px",
                    height: "calc(100vh - 64px)",
                    transition: "margin-left 0.2s ease",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                <Breadcrumb />

                <NavBar />

                <div
                    style={{
                        flex: 1,
                        minHeight: 0,
                        overflowY: "auto",
                        overflowX: "hidden",
                    }}
                >
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Layout;