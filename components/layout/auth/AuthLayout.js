import { Fragment } from "react"
import { ToastContainer } from 'react-toastify';
import Head from 'next/head'

const AuthLayout = (props)=>{

    return(
        <Fragment>
             <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
                />
                <Head>
                    <title>SIWP | Login</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                </Head>
                
                    <div className="grey-bg">
                    <div className="outer-login-wrapper">
                        <div className="inner-login-wrapper white shadow">
                            <div className="green-card shadow">
                                <div className="login-content-wrapper">
                                        <div className="login-content">
                                            <h1 className="white-text title">SIWP<span></span></h1>
                                            <p className="white-text login-text">Providing a framework for<br /> coordination of investments in the <br /> Niger Delta Region.</p>
                                        <p className="white-text link-login">Learn more >></p>
                                        </div>
                                </div>
                            </div>
                            <div className="outer-form-wrapper">
                                <div className="inner-form-wrapper">
                                  {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

    <style jsx>{`
    .outer-login-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background-image: url('/image/auth__background.png');
        background-color: rgb(255, 255, 255);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
    }
    .inner-form-wrapper{
        min-height: 500px;
        padding: 100px 20px 0 80px;
        width: 75%;
    }
    
    .green-card{
        background-color: #1D7C61;
        background-image: url('/image/map-bg.png');
        box-shadow: rgba(0, 0, 0, 0.16) 4px 0px 40px;
        background-size: contain;
    }
    .main-wrapper{
        height: 100%;
    }
    
    .inner-login-wrapper{
        height: 90%;
        width: 80%;
        display: grid;
        grid-template-columns: 50% 50%;
    }
    
    .grey-bg{
        height: 100%;
    }
    
    .green-wrapper{
        height: 100%;
        background-image: url('/image/card__background.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
    
    .login-content-wrapper{
        height: 100%;
        display: flex;
        align-items: center;
        padding: 100px;
    }
    
    .title{
        font-weight: bold;
        font-size: 2.5em;
    }
    
    .title span{
        height: 10px;
        width: 10px;
        display: inline-block;
        background-color: #0F4A39;
    }
    
    .login-content{
        height: 50%;
    }
    
    .login-text{
        font-size: 1.3em;
    }
    
    .link-login{
        font-weight: bold;
        text-decoration: underline;
    }
    
    .outer-form-wrapper{
        display: flex;
        align-items: center;
    }
    
    .error-field{
       border: 1px solid red !important;
    }

    
    `}</style>
        </Fragment>
    )
}

export default AuthLayout;