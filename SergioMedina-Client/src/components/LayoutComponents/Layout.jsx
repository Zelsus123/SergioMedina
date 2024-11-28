import React from 'react'
import {Header} from './Header'
import { Box } from '@mui/material'

export const Layout = ({children}) => {
  return (
    <>
    <Header/>
    <Box sx={{marginTop:"10px",
        marginLeft:"20px",
        marginRight:"20px",
        overflowX: "hidden",
        overflowY: "auto",
        height:"100vh",
        paddingBottom:"10px",
        backgroundColor:"#fff",
        borderRadius: "5px",

    }}>
        {children}
    </Box>
    </>
  )
}
