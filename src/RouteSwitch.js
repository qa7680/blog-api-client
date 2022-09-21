import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/home";
import NavbarComponent from "./components/navbar";
import BlogPost from "./components/blogPost";
import ErrorPage from "./components/errorPage";
import "../src/styling/main.css"

const RouteSwitch = () => {
    return (
        <BrowserRouter>
        <div className="mainContainerNav">
        <NavbarComponent />
            <Routes>
                <Route path = "/" element = { <Homepage />} />
                <Route path = "/posts/:postId" element = {<BlogPost /> } />
                <Route path = "*" element = {<ErrorPage />} />
            </Routes>
        </div>
        </BrowserRouter>
    )
};

export default RouteSwitch;