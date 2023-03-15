import "./navbar&footer.css";
import { FaSearch, FaHome, FaTags, FaComments, FaList, FaPlus } from "react-icons/fa";
import Home from "./Home";
import { Box, Button, Card, CardBody, Flex, Image, Input, Spacer } from "@chakra-ui/react";
import image from '../assests/logo.png'
import { useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


function Navbar() {
  const name=sessionStorage.getItem("username");
  const [search, setsearch] = useState(true);
  const [medicineType,setmedicineType] = useState("");
  const homeChecker = useLocation().pathname === '/home'

  const handlesearch=()=>{
    if(search){
      setsearch(false);
    }
    else{
      setsearch(true);
    }
  }

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [temporary,setTemporary] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  // console.log("query",query,"suggestion",suggestions)

  const API=process.env.REACT_APP_SECRET_KEY + `/userinput?cropName=${query}`

  const handleInputChange =  (event) => {
   

    setQuery(event.target.value);


  };

  const Token=sessionStorage.getItem("token")

  

  // useEffect(()=>{
  //   fetch(API, {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': 'Bearer ' + Token,
  //       "Content-type": "application/json; charset=UTF-8"
  //     }
  //   })
  //     .then(res=>res.json())
  //     .then((data)=>{
  //       setSuggestions(data);
  //       setTemporary(data);
  //       setIsLoading(false);
  //     })
  //     .catch((err)=>{
  //       console.log(err);
  //     })
  // },[])

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

  console.log(search)


    return(
<>
<header className="header">
      <Flex  justifyContent={'space-between'} >
      <Box>
      <Link to="/home" className="logo" id="websiteName">
      
          <Image   h={'5rem'}  src={image} alt='logo'  />
      </Link>
      </Box>
      <Box>
      <Flex  alignContent={'center'} justifyContent='space-around' >
        
        <Box>   
          <Flex>  
           <Input
           boxShadow='dark-lg' p='6' rounded='md' bg='white'
           type={'text'}
           fontSize={'1.5rem'}
           onChange={(e)=>handleInputChange(e)}
           value={query}
           mt={'0.5rem'}
           h={'4rem'} w={'30rem'} borderRadius='2rem 0rem 0rem 2rem' />
           <Button fontSize={'1.4rem'} boxShadow='dark-lg' p='6' rounded='md' bg='white' w={'7rem'} mt={'0.5rem'} h={'4rem'} onClick={()=>{handlesearch()}} borderRadius='0rem 2rem 2rem 0rem' >Search</Button>
           </Flex>
           </Box>
      </Flex>
      </Box>
      <Box>
      <Flex  fontSize={'2rem'} mt='1rem' mr='2rem' >{name}</Flex>
      </Box>
      </Flex>

      
      



        {/* {isLoading ? (
        <></>// Display a loading spinner when the suggestions are being filtered
      ) : (
          <Flex mr={'7rem'} justifyContent={'center'}>
            <Card  borderRadius={'0.5rem 0.5rem 0rem 0rem'} color='black' backgroundColor={'white'} position={'fixed'} w='30rem' zIndex={9999} cursor={'pointer'} overflow='auto'>
              {suggestions.map((suggestion) => (
                <CardBody _hover={{ boxShadow: "outline" }} key={suggestion._id} onClick={() => handleSuggestionClick(suggestion.cropName)}>
                  {suggestion.cropName}
                </CardBody>
              ))}
            </Card>
          </Flex>
      )
      } */}


      <Link to={'/form'} >
      <Button
      _hover={{ backgroundColor: "black",color:'white' }}
      borderRadius={'5rem'} h={'6rem'} w={'6rem'} bottom={'5rem'} zIndex={9999} right='4rem' position={'fixed'} leftIcon={<FaPlus/>} >
      </Button>
      </Link>

        



        {

        (query)?

        <div className="header-2">
          {/* <nav className="navbar2">

          <div className="navbar-links" onClick={()=>setmedicineType("")} >
              
              All
            
          </div>


            <div
            id="navbar-links"
            className="navbar-links"
            onMouseEnter={handleHoverEnter}
            onMouseLeave={handleHoverLeave}
            onClick={()=>setmedicineType("Herbicide")}
            >
              
                Herbicide
              
            </div>
            <div className="navbar-links" onClick={()=>setmedicineType("Fungicide")} >
              
                Fungicide
              
            </div>
            <div className="navbar-links" onClick={()=>setmedicineType("Insecticide")} >
              
                Insecticide
              
            </div>
            <div className="navbar-links" onClick={()=>setmedicineType("Bioinsecticide")} >
              
                 Bio-Insecticide
              
            </div>
            <div className="navbar-links" onClick={()=>setmedicineType("Biofungicide")} > 
              
                 Bio-Fungicide
              
            </div>
          </nav> */}
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
        <Home triger={search} name={query} type={medicineType} />
      )}

      </>
    )
  
  







}

export default Navbar;

