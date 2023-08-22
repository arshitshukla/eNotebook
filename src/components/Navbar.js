import React from "react";
import {Link,useNavigate} from 'react-router-dom';

const Navbar = (props) => {
  let Navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem('token');
    Navigate('/login');
    props.showAlert("Logged out successfully","success");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">eNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex" role="search">
              <Link className="btn mx-2 btn-outline-light" to="/login" role="button">Sign-In</Link>
              <Link className="btn mx-2 btn-outline-light" to="/signup" role="button">Sign-Up</Link>
            </form>:<form className="d-flex" role="search">
              <button className="btn mx-2 btn-outline-light" onClick={logout} >Sign-Out</button>
            </form>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
