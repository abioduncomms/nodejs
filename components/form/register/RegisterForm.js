import React, { Fragment, useState } from 'react';
import Link from 'next/link'
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/react-hooks';
import SimpleReactValidator from 'simple-react-validator';
import {REGISTER_PUBLC_USER} from '../../../graphql/mutation/AuthMutation'

const RegisterForm = ()=>{

    const validator = new SimpleReactValidator();
    const [inputType, setInputType] = useState('password');
    const [icon, setIcon] = useState('/image/icon/eye.svg');

    const [data, setData] = useState({
        email:'',
        password:'',
        lastName:'',
        firstName:''
    });

    const [error, setError] = useState({});


    const handlePasswordToggle = ()=>{
        if(inputType ==='password'){
            setInputType("text");
            setIcon('/image/icon/eye.svg');
        }
        if(inputType === "text"){
            setInputType("password");
            setIcon('/image/icon/eye.svg');
        }
    }

    const handleEmail = (v)=>{
        setData({...data, email:v.target.value});
    }

    const handlePassword = (v)=>{
        setData({...data, password:v.target.value});
    }

    const handleFirstName = (v)=>{
        setData({...data, firstName:v.target.value});

    }

    const handleLastName = (v)=>{
        setData({...data, lastName:v.target.value});

    }

    const [registerUser, {loading}] = useMutation(REGISTER_PUBLC_USER,{
        update(_,result){
            if(result.data.addPublicUser.status){
               setData({
                   email:'',
                   password:'',
                   firstName:'',
                   lastName:''
               })
                toast.success(result.data.addPublicUser.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                    });
            }else{
                toast.error(result.data.addPublicUser.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                    });
            }
          
          
        },
        onError(err){
      
        },
        
    }) 

const handleSubmit =(e)=>{
    e.preventDefault();

    if (validator.allValid()) {
        setError({});
        registerUser({variables:data});

      } else {
        validator.showMessages();
        setError(validator.getErrorMessages());
      } 
}

    return(
        <Fragment>
                    <p className="form-title">Sign up to give feedback on projects...</p>
                     <form>
                      <div className="form-wrapper">
                          <div className="row">
                              <div className="col s12 m12 input-field">
                                   <input type="text" autoComplete="off"  className={error.first_name ? "error-field":""}  value={data.firstName} placeholder="First Name" onChange={handleFirstName}/>
                                  {validator.message('first_name', data.firstName, 'required|alpha')}
                                    <span className="red-text">{error.first_name}</span>
                                  <input type="text" autoComplete="off"  className={error.last_name ? "error-field":""}  value={data.lastName} placeholder="Last Name"   onChange={handleLastName}/>
                                  {validator.message('last_name', data.lastName, 'required|alpha')}
                                  <span className="red-text">{error.last_name}</span>
                                  <input type="email" autoComplete="off" className={error.email ? "error-field":""}  value={data.email} placeholder="Email Address" onChange={handleEmail}/>
                                  {validator.message('email', data.email, 'required|email')}
                                  <span className="red-text">{error.email}</span>
                                
                                  <div className="password-wrapper">
                                  <input type={inputType} autoComplete="off"  className={error.password ? "error-field":""}  value={data.password} placeholder="Type Password" onChange={handlePassword}/>
                                  <span className="password-icons" className={error.password ? "error-field":""}  style={{backgroundImage: `url(${icon})`}} onClick={handlePasswordToggle}></span>
                                  </div>
                                  {validator.message('password', data.password, 'required|string')}
                                  <span className="red-text">{error.password}</span>
                                        <br />
                                        {
                                            loading ? (
                                                <button className="btn primary-green-bg login-btn z-depth-0 disabled" onClick={handleSubmit}>Registering...</button>
                                 
                                            ):(
                                                <button className="btn primary-green-bg login-btn z-depth-0" onClick={handleSubmit}>Get Started</button>
                                 
                                            )
                                        }
                                   <p><i>Already have an account?</i> <Link href="/login"><a><b><u>Log in</u></b></a></Link></p>
                              </div>
                          </div>
                      </div>
                      </form>
                      <style jsx>
                          {`
                          .form-title{
                            font-weight: 600;
                            font-size: 1.2em;
                        }
                        
                        .col{
                            padding: 0 !important;
                        }
                        
                        input{
                            border: 1px solid #C7CDCB !important;
                            border-radius: 2px !important;
                            padding: 2px 10px !important;
                            margin-bottom: 20px !important;
                        }
                        
                        .login-btn{
                            width: 200px;
                            text-transform: none;
                           height: 40px;
                           font-weight: bold;
                        }
                        
                        .forgot-password-link{
                            font-weight:500;
                            margin: 5px 0 20px 0;
                            
                        }
                        
                        .password-wrapper{
                            position: relative;
                            margin-bottom: 70px;
                        }
                        
                        .password-wrapper input{
                            position: absolute;
                            top: 0;
                            left: 0;
                        }
                        .password-icons{
                            position: absolute;
                            right: 0;
                            top:15px;
                            display: inline-block;
                            height: 20px;
                            width: 20px;
                            background-repeat: no-repeat;
                            background-size: contain;
                            background-position: center;
                            cursor: pointer;
                        }
                        
                        .error{
                            line-height: 0;
                        }
                          `}
                      </style>
        </Fragment>
    )
}

export default RegisterForm;