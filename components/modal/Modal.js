import React, { Fragment, useState } from 'react';



const Modal = (props) => {


    return(
        <Fragment>
            <div className={props.show ? `my-modal showModal`: `my-modal hideModal`} id={props.index}>
                <div className="my-modal-content" style={{width:props.width, height:props.height,paddingRight:props.padding}}>
                     <div className="row">
                    <div className="col s12 m8">
                        <p style={{color:"#384741"}}><b>{props.title}</b></p>
                    </div>
                    <div className="col s12 m4" id="btn-wrapper">
                        <button className="btn transparent z-depth-0 right close-btn" onClick={props.close}>CLOSE X</button>
                    </div>
                </div>
                {props.children}
                </div>
            </div>
            <style jsx>{`
            .my-modal {
                display: none;
                position: fixed;
                z-index: 200;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgb(0, 0, 0);
                background-color: rgba(0, 0, 0, 0.4);
                transition: display 1.5s;
            }

            .my-modal-content {
                background-color: #fefefe;
                margin: 100px auto;
                padding: 20px 20px 10px 20px;
                border: 1px solid #888;
                width: 28%;
                min-height: 30%;
                border-radius: 5px;
            }

            .close-btn {
                border: 1px solid #C7CDCB !important;
                border-radius: 5px;
                color: #384741 !important;
                margin-top: 10px;

            }

            #btn-wrapper{
                padding-right:10px !important;
            }

            .hideModal {
                display:none;
            }

            .showModal{
                display:block;
            }
              
            `}</style>
        </Fragment>
    )
}
export default Modal;