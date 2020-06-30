import React, { Fragment, useState } from 'react';
import Link from 'next/link'
import AuthLayout from '../components/layout/auth/AuthLayout';
import {FORGOT_PASSWORD} from '../graphql/mutation/AuthMutation'
import { useQuery, useMutation } from '@apollo/react-hooks';

const ResetPassword = ()=>{
    
    const [email,setEmail] = useState("")

    const [forgotPasswordPublicUser,{loading}] = useMutation(FORGOT_PASSWORD,{
        onCompleted(response){
            if(response.forgotPasswordPublicUser.status){
                toast.success(data.forgotPasswordPublicUser.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                    });
            }
        },
        onError(error){

        }
    })

    const submitForm = ()=>{
        forgotPasswordPublicUser({variables:{email:email}})
    }


    return(
        <Fragment>
            <AuthLayout>
                    <p className="form-title">Type in your email address here...</p>
                      <div className="form-wrapper">
                          <div className="row">
                              <div className="col s12 m12">
                                    <input type="email" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                  {
                                      loading ?  <button className="btn disabled-btn disabled z-depth-0">Sending...</button>:
                                      <button className="btn primary-green-bg login-btn z-depth-0" onClick={submitForm}>Send Reset Link</button>
                                  }
                                 
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


                  
                        `}</style>
                        </Fragment>
                    )
                }

export default ResetPassword;