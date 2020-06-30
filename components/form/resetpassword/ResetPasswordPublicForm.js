import React, { Fragment, useState } from 'react';
import './ResetPassword.styles.css';
import EyeIcon from '../../../icons/eye.svg';
import ActiveEyeIcon from '../../../icons/eye-active.svg';

const ResetPassword = ()=>{
    
    const [inputType, setInputType] = useState('password');
    const [icon, setIcon] = useState(EyeIcon);

    const handlePasswordToggle = ()=>{
        if(inputType ==='password'){
            setInputType("text");
            setIcon(ActiveEyeIcon);
        }
        if(inputType === "text"){
            setInputType("password");
            setIcon(EyeIcon);

        }
    }

    return(
        <Fragment>
                    <p className="form-title">Type in new password here...</p>
                      <div className="form-wrapper">
                          <div className="row">
                              <div className="col s12 m12 input-field">
                                  <div className="password-wrapper">
                                  <input type={inputType} placeholder="Type Password"/>
                                  <span className="password-icons" style={{backgroundImage: `url(${icon})`}} onClick={handlePasswordToggle}></span>
                                  </div>
                                  <div className="password-wrapper">
                                  <input type={inputType} placeholder="confirm Password"/>
                                  <span className="password-icons" style={{backgroundImage: `url(${icon})`}}onClick={handlePasswordToggle}></span>
                                  </div>
                              <br /><br /><br />
                                  <button className="btn primary-green-bg login-btn z-depth-0">Reset Password</button>
                              </div>
                          </div>
                      </div>
        </Fragment>
    )
}

export default ResetPassword;