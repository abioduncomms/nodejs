import React, { Fragment, useState } from 'react';
import Link from 'next/link'
import AuthLayout from '../components/layout/auth/AuthLayout';

const ResetPassword = ()=>{
    
    const [inputType, setInputType] = useState('password');
    const [icon, setIcon] = useState("");

    const handlePasswordToggle = ()=>{
        if(inputType ==='password'){
            setInputType("text");
          
        }
        if(inputType === "text"){
            setInputType("password");
          

        }
    }

    return(
        <Fragment>
            <AuthLayout>
                    <p className="form-title">Type in new password here...</p>
                      <div className="form-wrapper">
                          <div className="row">
                              <div className="col s12 m12 input-field">
                                  <div className="password-wrapper">
                                  <input type={inputType} placeholder="Type Password"/>
                                  <span className="password-icons" style={{backgroundImage: ``}} onClick={handlePasswordToggle}></span>
                                  </div>
                                  <div className="password-wrapper">
                                  <input type={inputType} placeholder="confirm Password"/>
                                  <span className="password-icons" style={{backgroundImage: ``}}onClick={handlePasswordToggle}></span>
                                  </div>
                              <br /><br /><br />
                                  <button className="btn primary-green-bg login-btn z-depth-0">Reset Password</button>
                              </div>
                          </div>
                      </div>
                      </AuthLayout>
                      <style jsx>{`
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
                                        `}</style>
                        </Fragment>
                    )
                }

export default ResetPassword;