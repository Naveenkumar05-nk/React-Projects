import React from 'react'
import logo from "../../assets/logo-1.png"
import admin from "../../assets/admin.png"
import { Link } from "react-router-dom"
import { useFirebase } from "react-redux-firebase"


const Navbar = () => {
  const firebase = useFirebase();

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={logo} height="30px" alt="logo" />
          </a>
      
          <div>
            <ul className="navbar-nav mr-auto"></ul>
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <Link to="/studentForm" className="btn btn-primary mr-3">
                  Add Student
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-a dropdown-toggle"
                  href="!#"
                  id="navbarDropdown"
                  data-toggle="dropdown"
                >
                  <img src={admin} height="30px" alt="admin" />
                  <span className="ml-2 navbar-text">Naveen Kumar</span>
                </a>
                <div className="dropdown-menu">
                  {/* <a className="dropdown-item" href="!#">
                    Profile
                  </a> */}
                  <a className="dropdown-item" href="!#" onClick={()=>firebase.logout()}>
                    Logout
                  </a>
                  {/* <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="!#">
                    Ads
                  </a> */}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
}

export default Navbar;
