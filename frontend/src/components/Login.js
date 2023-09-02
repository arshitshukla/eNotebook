import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const[credentials,setCredentials]=useState({email:"",password:""});
    let navigate=useNavigate();

    const handlechange=(e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value});
    }

    const handlesubmit=async (e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json=await response.json();
    
        if(json.success){
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            props.showAlert("Signed In successully","success");
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }
    }
  return (
    <div className="container text-center"> 
        <h1 className="my-3 mx-5">Sign-In to view your notes</h1>
      <form onSubmit={handlesubmit}> 
        <div className="mb-3 my-5 row d-flex justify-content-center">
          <div className="col-auto">
            <label htmlFor="email" className="col-form-label mx-3">Email</label>
          </div>
          <div className="col-sm-3">
            <input type="email" id="email" className="form-control-lg" name="email" value={credentials.email} onChange={handlechange}/>
          </div>
        </div>
        <div className="mb-3 my-3 row d-flex justify-content-center">
          <div className="col-auto">
            <label htmlFor="password" className="col-form-label">Password</label>
          </div>
          <div className="col-sm-3">
            <input type="password" id="password" className="form-control-lg" name="password" value={credentials.password} onChange={handlechange} aria-describedby="passwordHelpInline"/>
          </div>
        </div>
        <div className="col-auto d-flex justify-content-center">
            <button type="submit" className="btn btn-dark">
                Sign-In
            </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
