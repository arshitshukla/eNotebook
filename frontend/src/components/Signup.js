import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    const[credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
    let navigate=useNavigate();

    const handlechange=(e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value});
    }

    const handlesubmit=async (e)=>{
        e.preventDefault();
        const {name,email,password}=credentials;
        const response = await fetch("https://enotebook-xtz4.onrender.com/api/auth/createUser",{
            
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name,email,password})
        });
        const json=await response.json();
    
        localStorage.setItem('token',json.authtoken);
        navigate("/");
        props.showAlert("Created your account successfully","success");
    }
  return (
    <div className="container"> 
        <h2 className="my-3 mx-5">Create an account to start making notes on your eNotebook</h2>
      <form onSubmit={handlesubmit}> 
        <div className="mb-3 my-5 row d-flex justify-content-center">
          <div className="col-auto">
            <label htmlFor="name" className="col-form-label mx-3">Name</label>
          </div>
          <div className="col-sm-3">
            <input type="text" id="name" className="form-control" name="name" value={credentials.name} onChange={handlechange} required/>
          </div>
        </div>
        <div className="mb-3 my-3 row d-flex justify-content-center">
          <div className="col-auto">
            <label htmlFor="email" className="col-form-label mx-3">Email</label>
          </div>
          <div className="col-sm-3">
            <input type="email" id="email" className="form-control" name="email" value={credentials.email} onChange={handlechange} required/>
          </div>
        </div>
        <div className="mb-3 my-3  row d-flex justify-content-center">
          <div className="col-auto ">
            <label htmlFor="password" className="col-form-label mx-8">Password</label>
          </div>
          <div className="col-sm-3">
            <input type="password" id="password" className="form-control" name="password" value={credentials.password} onChange={handlechange} aria-describedby="passwordHelpInline" required minLength={5}/>
          </div>
        </div>
        <div className="mb-3 my-3 row d-flex justify-content-center">
          <div className="col-auto">
            <label htmlFor="cpassword" className="col-form-label">Confirm Password</label>
          </div>
          <div className="col-sm-3">
            <input type="password" id="cpassword" className="form-control" name="cpassword" value={credentials.cpassword} onChange={handlechange} aria-describedby="passwordHelpInline" required minLength={5}/>
          </div>
        </div>
        <div className="col-auto d-flex justify-content-center">
            <button type="submit" className="btn btn-dark">
                Sign-Up
            </button>
        </div>
      </form>
    </div>
  )
}

export default Signup;
