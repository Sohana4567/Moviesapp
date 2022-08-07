import React, { Component } from 'react'
import { Link } from "react-router-dom";
export default class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex',background:"lightblue",padding:'1rem',justifyContent:"center",color:'blue',alignItems:"center"}}>
       <Link to="/" style={{textDecoration:"none"}}><h1>Movies App</h1></Link>
       <Link to="/fav"><h2 style={{marginLeft:"1rem",textDecoration:"none"}}>Favourite</h2></Link>
      </div>
    )
  }
}
