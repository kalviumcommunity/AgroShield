import "./navbar&footer.css";
import {FaPlus } from "react-icons/fa";
import Home from "./Home";
import { Box, Button, Card, CardBody, Flex, Image, Input } from "@chakra-ui/react";
import image from '../assests/finallogo.png'
import { useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ImageCarousel from "./Crausal";


function Navbar() {
  const name=sessionStorage.getItem("username");
  const [search, setsearch] = useState(null);
  const [medicineType,setmedicineType] = useState("");
  const homeChecker = useLocation().pathname === '/home'
  const Landingpagechecker = useLocation().pathname === '/'
  const Formpagechecker = useLocation().pathname === '/form'



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
  const [homepagedata,sethomepagedata] = useState([]);
  const [isLoading,setIsLoading] = useState(true);

  const API=process.env.REACT_APP_SECRET_KEY + `/userinput?cropName=${query}`


  const Token=sessionStorage.getItem("token")

  function removeduplicate(array){
    const result=[];
    for(let i=0; i<array.length-1; i++){
      if(array[i].cropName!==array[i+1].cropName) result.push(array[i]);
    }
    return setSuggestions(result);
  }


  useEffect(()=>{
    fetch(API, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + Token,
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res=>res.json())
      .then((data)=>{
        // setSuggestions(data);
        // setTemporary(data);
        removeduplicate(data);
        setIsLoading(false);
      })
      .catch((err)=>{
        console.log(err);
      })
  },[query])





 




  useEffect(()=>{
    fetch(API, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + Token,
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res=>res.json())
      .then((data)=>{
        
        sethomepagedata(data);
      })
      .catch((err)=>{
        console.log(err);
      })
  },[search])

 

  const handlefilter=()=>{

    if(document.getElementById('filter').style.display==='none'){
      document.getElementById('filter').style.display='flex'
    }
    else{
      document.getElementById('filter').style.display='none'
    }
  }

    const handleSuggestionClick = (suggestion) => {
    // Update the input field with the selected suggestion
    setQuery(suggestion);
    handlesearch();
    document.getElementById('suggest').style.display='none'
  };


  if(Landingpagechecker){
    return<></>
  }
  else{

  


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
          <Flex w={{base:'22rem',md:'30rem',lg:'30rem'}} >  
           <Input
           boxShadow='dark-lg' p='6' rounded='md' bg='white'
           type={'text'}
           fontSize={'1.5rem'}
           onChange={(e)=>setQuery(e.target.value)}
           value={query}
           mt={'0.5rem'}
           h={'4rem'} w={'30rem'} borderRadius='2rem 0rem 0rem 2rem' />
           <Button fontSize={'1.4rem'} boxShadow='dark-lg' p='6' rounded='md' bg='white' w={{base:'8rem',md:'7rem',lg:'7rem'}} mt={'0.5rem'} h={'4rem'} onClick={()=>{handlesearch()}} borderRadius='0rem 2rem 2rem 0rem' >Search</Button>
           </Flex>
           </Box>
      </Flex>
      </Box>
      <Box>
      <Flex  fontSize={'2rem'} mt='1rem' mr='2rem' >{name}</Flex>
      </Box>
      </Flex>

      {
        (homepagedata.length>0 || Formpagechecker )?
          <></>
        :
          <ImageCarousel/>
          
        
      }

      
      



        {
          
        isLoading? (
        <></>// Display a loading spinner when the suggestions are being filtered
      ) : (
        (suggestions.length>0)?
          <Flex id="suggest" mr={'7rem'} justifyContent={'center'}>
            <Card h={'30rem'}  borderRadius={'0.5rem 0.5rem 0rem 0rem'} color='black' backgroundColor={'white'} position={'fixed'} w='30rem' zIndex={9999} cursor={'pointer'} overflow='auto'>
              {suggestions.map((suggestion) => (
                <CardBody _hover={{ boxShadow: "outline" }} key={suggestion._id} onClick={() => handleSuggestionClick(suggestion.cropName)}>
                  {suggestion.cropName}
                </CardBody>
              ))}
            </Card>
          </Flex>:<> </>
      )
      }


      <Link to={'/form'} >
      <Button
      _hover={{ backgroundColor: "black",color:'white' }}
      borderRadius={'5rem'} h={'6rem'} w={'6rem'} bottom={'5rem'} zIndex={9999} right='4rem' position={'fixed'} leftIcon={<FaPlus/>} >
      </Button>
      </Link>

        
      <Button
      onClick={()=>handlefilter()}
      _hover={{ backgroundColor: "black",color:'white' }}
      borderRadius={'5rem'}  h={'5rem'} w={'5rem'} top={'8rem'}  left='2rem' position={'fixed'}  >
        Filter
      </Button>


        {
          (homepagedata.length>0)?
          <Flex id="filter" _hover={{cursor:'pointer'}} mt={'10rem'} ml={'2rem'} justifyContent={'left'} >
          <Box mr={'1rem'} onClick={()=>setmedicineType("")} >
            All
          </Box>
          <Box mr={'1rem'} onClick={()=>setmedicineType("Herbicide")} >
            Herb
          </Box>
          <Box mr={'1rem'} onClick={()=>setmedicineType("Insecticide")} >
            Insect
          </Box>
          <Box mr={'1rem'} onClick={()=>setmedicineType("Fungicide")}  >
            Fung
          </Box>
          <Box mr={'1rem'} onClick={()=>setmedicineType("Bioinsecticide")} >
            Bio-insect
          </Box>
          <Box onClick={()=>setmedicineType("Biofungicide")}  >
            Bio-fung
          </Box>
        </Flex>:<></>
        }

       
        









      </header>







      {homeChecker && homepagedata.length>0 && (
        <Home data={homepagedata} triger={search} name={query} type={medicineType} />
      )}

      </>
    )
  
  



      }



}

export default Navbar;

