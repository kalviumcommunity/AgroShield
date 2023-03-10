import "./navbar&footer.css";
import { FaSearch, FaHome, FaTags, FaComments, FaList } from "react-icons/fa";
import Home from "./Home";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";


function Navbar() {
  const [inputvalu, setinput] = useState("");
  const [medicineType,setmedicineType] = useState("");
  const homeChecker = useLocation().pathname === '/'

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


    return(
<>
      <header className="header">
        <div className="header-1">
          <a href="/" className="logo" id="websiteName">
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
           
              <Link to='/signup'>
            <Button fontSize={"15px"} h={"14"} mr={"1rem"}>
              Sign in
            </Button>
            </Link>
            
          </div>
        </div>


        <div className="header-2">
          <nav className="navbar">
            <div>
              <Link to='/'
              
                id="navbar-links"
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
              >
                Home
             
              </Link>
            </div>
            <div>
              <Link to='/form' 
               className="navbar-links">
                Form
              </Link>
            </div>
            <div>
              <Link to='/login' className="navbar-links">
                Sign up
              
              </Link>
            </div>
            <div>
              <Link  
              className="navbar-links">
                About Us
              
              </Link>
            </div>
          </nav>
        </div>

        {

        (inputvalu)?

        <div className="header-2">
          <nav className="navbar2">

          <div className="navbar-links" onClick={()=>setmedicineType("")} >
              
              All
            
          </div>


            <div
            id="navbar-links"
            className="navbar-links"
            onMouseEnter={handleHoverEnter}
            onMouseLeave={handleHoverLeave}
            onClick={()=>setmedicineType("herbicide")}
            >
              
                Herbicide
              
            </div>
            <div className="navbar-links" onClick={()=>setmedicineType("fungicide")} >
              
                Fungicide
              
            </div>
            <div className="navbar-links" onClick={()=>setmedicineType("insecticide")} >
              
                Insecticide
              
            </div>
            <div className="navbar-links" onClick={()=>setmedicineType("bioinsecticide")} >
              
                 Bio-Insecticide
              
            </div>
            <div className="navbar-links" onClick={()=>setmedicineType("biofungicide")} > 
              
                 Bio-Fungicide
              
            </div>
          </nav>
        </div>:<></>

  

}





      </header>

{
      (inputvalu)?

      <nav className="bottom-navbar2">
      <div onClick={()=>setmedicineType("")}  >
          All
        </div>
        <div onClick={()=>setmedicineType("herbicide")}  >
          Herb
        </div>
        <div onClick={()=>setmedicineType("fungicide")}  >
          Fungi
        </div>
        <div onClick={()=>setmedicineType("insecticide")}  >
          Insecti
        </div>
        <div onClick={()=>setmedicineType("biofungicide")}  >
          Biofungi
        </div>
        <div onClick={()=>setmedicineType("bioinsecticide")}  >
          Bioinsecti
        </div>
      </nav>
  
  :
<></>

}

<nav className="bottom-navbar">
      <Link to='/' >
        
          <FaHome />
        
        </Link>
        <Link to='/form'>
          <FaList />
        
        </Link>
        <Link to='/login' >
          <FaTags />
        
        </Link>
        <Link >
        
          <FaComments />
        
        </Link>
      </nav>



      {homeChecker && (
        <Home name={inputvalu} type={medicineType} />
      )}

      </>
    )
  
  







}

export default Navbar;

