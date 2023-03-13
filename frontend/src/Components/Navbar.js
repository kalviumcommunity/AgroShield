import "./navbar&footer.css";
import { FaSearch, FaHome, FaTags, FaComments, FaList, FaPlus } from "react-icons/fa";
import Home from "./Home";
import { Box, Button, Card, CardBody, Flex, Image, Input } from "@chakra-ui/react";
import image from '../assests/agrologo_-_Copy-removebg-preview.png'
import { useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


function Navbar() {
  const [inputvalu, setinput] = useState("");
  const [medicineType,setmedicineType] = useState("");
  const homeChecker = useLocation().pathname === '/home'



  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [temporary,setTemporary] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  // console.log("query",query,"suggestion",suggestions)

  const API=process.env.REACT_APP_SECRET_KEY + '/userinput'

  const handleInputChange =  (event) => {
   

    setQuery(event.target.value);


  };

  

  useEffect(()=>{
    fetch(API)
      .then(res=>res.json())
      .then((data)=>{
        setSuggestions(data);
        setTemporary(data);
        setIsLoading(false);
      })
      .catch((err)=>{
        console.log(err);
      })
  },[])

    const handleSuggestionClick = (suggestion) => {
    // Update the input field with the selected suggestion
    setQuery(suggestion);
    setSuggestions([]);
  };




  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const uniqueCropNames = temporary.reduce((accumulator, currentCrop) => {
      const searchedTerm = query.toLowerCase();
      const fullName = currentCrop.cropName.toLowerCase();

      if (fullName.includes(searchedTerm) && fullName.startsWith(searchedTerm)) {
        if (!accumulator[fullName]) {
          accumulator[fullName] = currentCrop;
        }
      }



      return accumulator;
    }, {});

    const filteredSuggestions = Object.values(uniqueCropNames);

    setSuggestions(filteredSuggestions);
  }, [query, temporary]);







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
<Box>
      <Link to="/home" className="logo" id="websiteName">
          <Image  h={'5rem'}  src={image} alt='logo'  />
      </Link>
      </Box>
      <Flex  alignContent={'center'} justifyContent='space-around' >
        
        <Box>     
           <Input
           type={'text'}
           fontSize={'1.5rem'}
           onChange={(e)=>handleInputChange(e)}
           value={query}
           h={'5rem'} w={'40rem'} borderRadius='2rem' />
           </Box>
      </Flex>
      



        {isLoading ? (
        <></>// Display a loading spinner when the suggestions are being filtered
      ) : (
        <Flex  justifyContent={'center'} >
        <Card borderRadius={'0.5rem 0.5rem 0rem 0rem'} color='black' backgroundColor={'white'}  position={'fixed'} w='40rem'  zIndex={9999} cursor={'pointer'} >
           {suggestions.map((suggestion) => (
            <CardBody 
            
            _hover={{ boxShadow: "outline"  }}
            key={suggestion._id} onClick={() => handleSuggestionClick(suggestion.cropName)}>
              {suggestion.cropName}
            </CardBody>
          ))}
        </Card>
        </Flex>
      )
      }


      <Link to={'/form'} >
      <Button
      _hover={{ backgroundColor: "black",color:'white' }}
      borderRadius={'5rem'} h={'6rem'} w={'6rem'} bottom={'5rem'} zIndex={9999} right='4rem' position={'fixed'} leftIcon={<FaPlus/>} >
      </Button>
      </Link>

        



        {

        (query)?

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
      (query)?

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





      {homeChecker && (
        <Home name={query} type={medicineType} />
      )}

      </>
    )
  
  







}

export default Navbar;

