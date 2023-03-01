import "./navbar&footer.css";
import { FaSearch, FaHome, FaTags, FaComments, FaList } from "react-icons/fa";
// import logo from '../asseets/logo.png'
import Home from "./Home";

// import {BsFillPersonFill} from 'react-icons/bs'
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { createContext } from "react";
import { useLocation } from "react-router-dom";

const inputvalue = createContext("");

function Navbar() {
  const [inputvalu, setinput] = useState("");
  const homeChecker = useLocation().pathname === '/'

  // console.log("i am the input value in navbar input box     ",inputvalu);

  // const valuue=createContext(inputvalue);

  const handleSearch = () => {
    const searchForm = document.querySelector(".search-form");
    searchForm.classList.toggle("active");
  };

  const handleHoverEnter = () => {
    const abc = document.getElementById("navbar-links");
    abc.classList.add("skewBackGround");
  };
  const handleHoverLeave = () => {
    const abc = document.getElementById("navbar-links");
    abc.classList.remove("skewBackGround");
  };
  return (
    <>
      <header className="header">
        <div className="header-1">
          {/* <img id='logo-img' src={logo}/> */}
          <a href="#" className="logo" id="websiteName">
            {" "}
            Agroshield{" "}
          </a>

          <form action="" className="search-form">
            <input
              onChange={(e) => setinput(e.target.value)}
              value={inputvalu}
              className="inputbox"
              type="search"
              name=""
              placeholder="Search here..."
              id="search-box"
            />
            <label>
              <FaSearch />
            </label>
          </form>

          <div className="icons">
            <div id="search-btn" onClick={handleSearch}>
              <FaSearch />
            </div>
            <Button fontSize={"15px"} h={"14"} mr={"1rem"}>
              Sign in
            </Button>
          </div>
        </div>
        <div className="header-2">
          <nav className="navbar">
            <div>
              <a
                href="/"
                id="navbar-links"
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
              >
                Home
              </a>
            </div>
            <div>
              <a href="/form" className="navbar-links">
                Form
              </a>
            </div>
            <div>
              <a href="#home" className="navbar-links">
                Featured
              </a>
            </div>
            <div>
              <a href="#home" className="navbar-links">
                About Us
              </a>
            </div>
          </nav>
        </div>
      </header>

      <nav className="bottom-navbar">
        <a href="/">
          <FaHome />
        </a>
        <a href="/form">
          <FaList />
        </a>
        <a href="#arrivals">
          <FaTags />
        </a>
        <a href="#reviews">
          <FaComments />
        </a>
      </nav>
      {homeChecker && (
        <Home name={inputvalu} />
      )}
    </>
  );
}

export default Navbar;
// export {inputvalue}
