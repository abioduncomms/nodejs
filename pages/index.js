import {useState, useContext} from 'react'
import AuthLayout from "../components/layout/auth/AuthLayout"
import Link from 'next/link'
import Router from 'next/router'
import { toast } from 'react-toastify'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import {UserContext} from '../config/context'
import { LOGIN_PUBLIC_USER } from '../graphql/mutation/AuthMutation'
import SimpleReactValidator from 'simple-react-validator'

export default()=>{

    const validator = new SimpleReactValidator();
    const [error,setError] = useState({});

     const {login} = useContext(UserContext);
     const client = useApolloClient();
     
    const [loginUser, {loading}] = useMutation(LOGIN_PUBLIC_USER,{
                onCompleted(data){
                    if(data.loginPublicUser.status){
                        login(data.loginPublicUser);
                        client.writeData({data:{isLoggedIn:true}})
                        Router.push('/account/dashboard')
                            
                        }else{
                            toast.error(data.loginPublicUser.message, {
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
        
        });


    const [inputType, setInputType] = useState('password');
     const [icon, setIcon] = useState('/image/icon/eye.svg');

    const [data, setData] = useState({
        email:'',
        password:''
    });

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

    const handlePasswordInput = (v)=>{
        setData({...data,password:v.target.value});
    }

    const handleEmailInput = (v)=>{
        setData({...data,email:v.target.value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            if (validator.allValid()) {
                setError({});
                loginUser({variables:data});
              } else {
                validator.showMessages();
                setError(validator.getErrorMessages());
              } 
        }catch{

        }     
    };


    return(
        <AuthLayout>
           <p className="form-title">Log in to give feedback on projects...</p>
                     
                     <form> <div className="form-wrapper">
                          <div className="row">
                              <div className="col s12 m12 input-field">
                                  <input type="email" autoComplete="off" placeholder="Email Address" className={error.email ? "error-field":""}  value={data.email} onChange={handleEmailInput}/>
                                  {validator.message('email', data.email, 'required|email')}
                                    <p className="red-text">{error.email}</p>
                                  <div id="password-wrapper">
                                  <input autoComplete="off" className={error.password ? "error-field":""} type={inputType} placeholder="Type Password" value={data.password} onChange={handlePasswordInput}/>
                                  <span className="password-icons" style={{backgroundImage: `url(${icon})`}} onClick={handlePasswordToggle}></span>
                                  </div>
                                  {validator.message('password', data.password, 'required|string')}
                                  <p className="red-text">{error.password}</p>
                                  <br />
                                  <p className="forgot-password-link"><Link href="/forgot"><a className="black-text"><i>Forgot your password ?</i></a></Link></p>
                                
                                  {
                                      loading ? (
                                        <button className="btn primary-green-bg login-btn z-depth-0 disabled" onClick={handleSubmit}>Loading...</button>
                                      ):(
                                        <button className="btn primary-green-bg login-btn z-depth-0" onClick={handleSubmit}>Log in</button>
                                      )
                                  }
                                  <br />
                                   <p className="forgot-password-link"><Link href="/register"><a className="black-text"><i>Create an account here ?</i></a></Link></p>
                                
                             </div>
                          </div>
                        </div>
                      </form>

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

    .forgot-password-link{
        font-weight:500;
        margin: 5px 0 20px 0;
        
    }

    #password-wrapper{
        position: relative;
        margin-bottom: 70px;
    }

    #password-wrapper input{
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
        </AuthLayout>
    )
}