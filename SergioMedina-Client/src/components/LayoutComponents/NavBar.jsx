import { Box, Typography, Icon, IconButton,List,ListItem,ListItemButton,ListItemIcon,ListItemText } from '@mui/material'
import {Link, useLocation} from 'react-router-dom'
import React from 'react'
import { NavBarData } from './NavBarData'

export const NavBar = () => {

  const location = useLocation()
  return (
    <Box sx={{width:"100%", backgroundColor: "#0D4F91", color:"#fff", display:"flex", flexDirection:"row", gap:"15px", justifyContent:"center"}}>
      <Box sx={{display:"inherit", flexDirection:"row", gap:"20px", paddingTop:"6px"}}>
        {NavBarData.map((item)=>(
          <Link to={item.to}
          style={{textDecoration:"none", color:'inherit', gap:0}}
          key={item.to}>
            <ListItemButton sx={{backgroundColor: location.pathname === item.to ? "#1C70C2" : "inherit", borderRadius:"5px"}} aria-current={
              location.pathname === item.to ? "page" : undefined
            }>
              <ListItemIcon sx={{color:"#fff", justifyContent:"center"}}>
                {item.Icon}
              </ListItemIcon>
              <ListItemText primary={item.text}/>
            </ListItemButton>
          </Link>
        ))}

      </Box>
    </Box>
  )
}

