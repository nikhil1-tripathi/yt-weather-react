import React from 'react'
import { Container, TextField,Box, Button } from '@mui/material';
import { margin } from '@mui/system';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { useState } from 'react';
const Input = ({setQuery,units,setUnits}) => {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };


  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      // toast.info("Fetching users location.");
      navigator.geolocation.getCurrentPosition((position) => {
        // toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;console.log(lat, lon)

        setQuery({
          lat,
          lon,
        });
      });
    }
  };
  // handleLocationClick()

  return (
    <div>
        <Container fixed>
            <Box sx={{backgroundColor:"tomato", display:"flex", width:530, margin:"auto"}}>
            <TextField 
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
             sx={{marginTop:2.5, marginLeft:4.8, }} id="standard-basic" label="Search" variant="outlined"  />
             <SearchSharpIcon 
             onClick={handleSearchClick}
               color='primary'   fontSize="inherit" sx={{marginTop:4.4, marginLeft:3,cursor:"pointer",}}/>
             <LocationOnOutlinedIcon 
              onClick={handleLocationClick}
             color='primary' fontSize="inherit" sx={{marginTop:4.4, marginLeft:3, cursor:"pointer"}}/>
             
             <div style={{display:"flex", marginLeft:"40px", justifyContent:"center",alignItems:"center", width:"70px", height:"15px",marginTop:"35px"}}>
             <Button
              onClick={handleUnitsChange}
              sx={{marginLeft:10}}><i>°C</i></Button>
            
             <Button

              onClick={handleUnitsChange}
             ><i>°F</i></Button>
            
             </div>
            </Box>
        </Container>
      
    </div>
  )
}

export default Input
