import {Fragment, useContext,useState,useEffect} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {UserContext} from '../../config/context'
import Modal from '../modal/Modal'

function Navigation(props) {

        const [pModal, setPModal] = useState({
            view:false
        })

        const [user,setUser] = useState({
            firstName:'',
            lastName:'',
            email:'',
            phone:'',
            role:''
        })

        const {logout} = useContext(UserContext);
        const {pathname} = useRouter()
        const [menu,setMenu] = useState({
            itemWidth:'80px',
            showText:false
        })  
        const openSideBar = ()=>{
            setMenu({...menu,showText:true, itemWidth:"180px"})
            document.getElementById('fixed-side-bar').style.width= '14%';
        }

        const closeSideBar = ()=>{
            setMenu({...menu,showText:false, itemWidth:"80px"})
            document.getElementById('fixed-side-bar').style.width= '7%';
        }

        const openWrapper = ()=>{
            document.getElementById("profile-form-wrapper").style.height = "auto";
        }

        const closeWrapper = ()=>{
            document.getElementById("profile-form-wrapper").style.height = 0;
        }

        useEffect(()=>{
            let savedUser = JSON.parse(localStorage.getItem("pubsiwp"));
            if(savedUser){
                setUser({
                    firstName:savedUser.firstName,
                    lastName:savedUser.lastName,
                    role:savedUser.role,
                    email:savedUser.email
                })
            }
        },[])
           
    return (
        <Fragment>
            <nav className="z-depth-0 shadow">
                <div className="nav-wrapper">
                    <Link href="/"><a className="page-title">{props.page}</a></Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li>
                        <div className="notification-wrapper">
                            <img src="/image/icon/bell.svg" alt="bell"/>  
                        </div>
                    </li>
                    <li id="profile">
                        <div className="profile-wrapper">
                            <img src="/image/icon/profile.svg" alt=""/>
                            <div id="user-info-wrapper">
                                <p id="user-name">{user.firstName +' '+ user.lastName.charAt(0)+'.'}</p>
                            </div>
                        </div>
                        <div id="sub-menu-wrapper">
                            <ul>
                                <li  onClick={()=>setPModal({...pModal,view:true})}><Link href="#"><a>View Profile</a></Link></li>
                                <li onClick={()=>logout()}><Link href="#"><a>Logout</a></Link></li>
                            </ul>
                        </div>
                    </li>
                </ul>
                </div>
            </nav>

             
            <div id="fixed-side-bar" onMouseOver={openSideBar} onMouseOut={closeSideBar}>
                <div id="fixed-logo">
                    <div id="fixed-logo-inner">
                    <object id="fixed-logo-icon" type="image/svg+xml" data="/image/icon/logo-colored.svg"/>
                    <object id="fixed-arrow" type="image/svg+xml" data="/image/icon/arrow.svg"/>
                </div>
                  
                </div>
                <div id="fixed-side-menu">
                <ul>
                    <li className={pathname == "/account/dashboard" ?  "fixed-side-menu-item active-fixed-side-menu-item":"fixed-side-menu-item"}>
                    <Link href="/account/dashboard"><a style={{width:menu.itemWidth}}>
                    <svg  width="25" height="25" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect className="menu-icon" x="1" y="1" width="8" height="8" stroke="#384741" strokeLinecap="round" strokeLinejoin="round" />
                        <path className="menu-icon" fillRule="evenodd" clipRule="evenodd" d="M13 1H21V9H13V1Z" stroke="#384741" strokeLinecap="round" strokeLinejoin="round" />
                        <path className="menu-icon" fillRule="evenodd" clipRule="evenodd" d="M13 13H21V21H13V13Z" stroke="#384741" strokeLinecap="round" strokeLinejoin="round" />
                        <path className="menu-icon"  fillRule="evenodd" clipRule="evenodd" d="M1 13H9V21H1V13Z" stroke="#384741" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className={menu.showText ? "":"hide"}>Dashboard</span>
                    </a></Link>
                    </li>
                    <li className={pathname == "/account/project" ?  "fixed-side-menu-item active-fixed-side-menu-item":"fixed-side-menu-item"}>
                    <Link href= "/account/project/allproject"><a style={{width:menu.itemWidth}}>
                    <svg width="22" height="27" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.6209 24.2531H0.733495V6.16094C0.733495 5.95836 0.569276 5.79419 0.366747 5.79419C0.164219 5.79419 0 5.95836 0 6.16094V24.3753C0 24.7124 0.274219 24.9866 0.611246 24.9866H14.6209C14.8235 24.9866 14.9876 24.8224 14.9877 24.6198C14.9877 24.4172 14.8235 24.2531 14.6209 24.2531Z" fill="#384741" />
                        <path d="M19.8962 3.31615L16.7789 0.111073C16.7098 0.0400665 16.615 0 16.516 0H0.611246C0.274219 0 4.8802e-05 0.274267 0 0.611294V3.47173C0 3.6743 0.164219 3.83847 0.366747 3.83847C0.569276 3.83847 0.733495 3.6743 0.733495 3.47173V0.733543H16.3611L19.2666 3.72081V24.2531H17.1881C16.9855 24.2531 16.8213 24.4173 16.8213 24.6199C16.8213 24.8225 16.9855 24.9866 17.1881 24.9866H19.3888C19.7258 24.9866 20 24.7125 20 24.3754V3.57182C20 3.47632 19.9628 3.38462 19.8962 3.31615Z" fill="#384741" />
                        <path d="M19.896 3.31612L16.7788 0.111049C16.6747 0.00407491 16.5162 -0.0292081 16.3779 0.0269631C16.2396 0.0831342 16.1492 0.217486 16.1492 0.366772V3.5718C16.1492 3.77437 16.3134 3.93854 16.5159 3.93854H19.6332C19.7806 3.93854 19.9137 3.85031 19.971 3.71449C20.0283 3.57873 19.9988 3.42173 19.896 3.31612ZM16.8827 3.20505V1.26976L18.7649 3.20505H16.8827Z" fill="#384741" />
                        <path d="M11.6973 1.94727H2.86088C2.5238 1.94727 2.24963 2.22148 2.24963 2.55851V4.58541C2.24963 4.92248 2.52385 5.19665 2.86088 5.19665H11.6973C12.0343 5.19665 12.3085 4.92243 12.3085 4.58545V2.55846C12.3085 2.22139 12.0343 1.94727 11.6973 1.94727ZM11.575 4.46311H2.98313V2.68071H11.575V4.46311Z" fill="#384741" />
                        <path d="M5.91261 7.11575C5.75142 6.99331 5.52132 7.02454 5.39873 7.18583L3.77836 9.3179L3.2917 8.89205C3.1393 8.75863 2.90763 8.7741 2.77421 8.92655C2.64083 9.07901 2.6563 9.31067 2.80871 9.44405L3.59106 10.1286C3.65821 10.1873 3.74415 10.2193 3.83253 10.2193C3.84482 10.2193 3.85717 10.2187 3.86957 10.2175C3.97069 10.2072 4.06307 10.1555 4.12456 10.0745L5.98269 7.62964C6.10523 7.4684 6.07385 7.23829 5.91261 7.11575Z" fill="#384741" />
                        <path d="M16.9498 7.04102H7.71294C7.51041 7.04102 7.34619 7.20519 7.34619 7.40776C7.34619 7.61034 7.51041 7.77451 7.71294 7.77451H16.9498C17.1524 7.77451 17.3166 7.61034 17.3166 7.40776C17.3166 7.20519 17.1524 7.04102 16.9498 7.04102Z" fill="#384741" />
                        <path d="M13.71 8.26343H7.71294C7.51041 8.26343 7.34619 8.4276 7.34619 8.63018C7.34619 8.83275 7.51041 8.99692 7.71294 8.99692H13.71C13.9125 8.99692 14.0767 8.83275 14.0767 8.63018C14.0767 8.4276 13.9125 8.26343 13.71 8.26343Z" fill="#384741" />
                        <path d="M15.0791 9.48584H7.71294C7.51041 9.48584 7.34619 9.65001 7.34619 9.85259C7.34619 10.0552 7.51041 10.2193 7.71294 10.2193H15.0791C15.2816 10.2193 15.4459 10.0552 15.4459 9.85259C15.4459 9.65001 15.2816 9.48584 15.0791 9.48584Z" fill="#384741" />
                        <path d="M5.91261 12.1036C5.75142 11.9811 5.52132 12.0124 5.39873 12.1736L3.77836 14.3057L3.2917 13.8799C3.1393 13.7465 2.90763 13.762 2.77421 13.9144C2.64083 14.0668 2.6563 14.2985 2.80871 14.4319L3.59106 15.1164C3.65821 15.1751 3.74415 15.2071 3.83253 15.2071C3.84482 15.2071 3.85717 15.2065 3.86957 15.2053C3.97069 15.195 4.06307 15.1433 4.12456 15.0623L5.98269 12.6175C6.10523 12.4562 6.07385 12.2262 5.91261 12.1036Z" fill="#384741" />
                        <path d="M16.9498 12.0288H7.71294C7.51041 12.0288 7.34619 12.193 7.34619 12.3956C7.34619 12.5981 7.51041 12.7623 7.71294 12.7623H16.9498C17.1524 12.7623 17.3166 12.5981 17.3166 12.3956C17.3166 12.193 17.1524 12.0288 16.9498 12.0288Z" fill="#384741" />
                        <path d="M13.71 13.2512H7.71294C7.51041 13.2512 7.34619 13.4154 7.34619 13.618C7.34619 13.8205 7.51041 13.9847 7.71294 13.9847H13.71C13.9125 13.9847 14.0767 13.8205 14.0767 13.618C14.0767 13.4154 13.9125 13.2512 13.71 13.2512Z" fill="#384741" />
                        <path d="M15.0791 14.4736H7.71294C7.51041 14.4736 7.34619 14.6378 7.34619 14.8404C7.34619 15.043 7.51041 15.2071 7.71294 15.2071H15.0791C15.2816 15.2071 15.4459 15.043 15.4459 14.8404C15.4459 14.6378 15.2816 14.4736 15.0791 14.4736Z" fill="#384741" />
                        <path d="M16.9498 17.0166H7.71294C7.51041 17.0166 7.34619 17.1808 7.34619 17.3833C7.34619 17.5859 7.51041 17.7501 7.71294 17.7501H16.9498C17.1524 17.7501 17.3165 17.5859 17.3166 17.3833C17.3166 17.1808 17.1524 17.0166 16.9498 17.0166Z" fill="#384741" />
                        <path d="M13.71 18.239H7.71294C7.51041 18.239 7.34619 18.4032 7.34619 18.6058C7.34619 18.8083 7.51041 18.9725 7.71294 18.9725H13.71C13.9125 18.9725 14.0767 18.8083 14.0767 18.6058C14.0767 18.4032 13.9125 18.239 13.71 18.239Z" fill="#384741" />
                        <path d="M15.0791 19.4614H7.71294C7.51041 19.4614 7.34619 19.6256 7.34619 19.8282C7.34619 20.0308 7.51041 20.1949 7.71294 20.1949H15.0791C15.2816 20.1949 15.4459 20.0308 15.4459 19.8282C15.4459 19.6256 15.2816 19.4614 15.0791 19.4614Z" fill="#384741" />
                        <path d="M5.25065 17.0166H3.29472C2.95764 17.0166 2.68347 17.2908 2.68347 17.6278V19.5837C2.68347 19.9208 2.95769 20.195 3.29472 20.195H5.25065C5.58773 20.195 5.86189 19.9208 5.86189 19.5838V17.6278C5.86189 17.2908 5.58768 17.0166 5.25065 17.0166ZM5.12845 19.4615H3.41701V17.7501H5.12845V19.4615Z" fill="#384741" />
                    </svg>
                    <span className={menu.showText ? "":"hide"}>Projects</span>
                    </a></Link>
                    </li>
                   
                    
                   
                
                </ul>
                </div>
            </div>
         
         <Modal title="Profile Details" index="profile-view" show={pModal.view} close={()=>setPModal({...pModal, view:false})}>
            
            <div className="row">
                <div className="col s12 m9">
                    <p id="username">{user.firstName +" "+ user.lastName}<button className="btn edit-btn" onClick={openWrapper}>Edit Profile</button></p>
                    <p><span id="status">Active</span> <span id="dot"></span> <span id="role">{user.role}</span></p>
                    <p><span id="email">{user.email}</span></p>
                </div>
                <div className="col s12 m3">
                    <br />
                <img src="/image/icon/profile.svg" className="responsive-img" alt=""/>
                </div>
            </div>
            <div className="row" id="profile-form-wrapper">
                <div className="col s12 m12 form">
                    <div className="divider"></div>
                    <input type="text" placeholder="First Name" value={user.firstName} onChange={(e)=>setUser({...user,firstName:e.target.value})}/>
                    <input type="text" placeholder="Last Name" value={user.lastName} onChange={(e)=>setUser({...user,lastName:e.target.value})}/>
                    <input type="text" placeholder="Phone Number" className="disabled"/>
                <div className="">
                    <button className="btn z-depth-0" id="cancel" onClick={closeWrapper}>Cancel</button>
                    <button className="btn add-cta z-depth-0 right">Save Profile</button>
                </div>
                </div>
            </div>
         </Modal>
         
            
            <style jsx>
                {`
                    nav{
                        background-color:white !important;
                        border-bottom: 1px solid #E7E8F2;
                        height:80px !important;
                        padding-left:150px;
                    }

                    .page-title{
                        color:black !important;
                        font-weight:bold  !important;
                    }

                    .nav-wrapper #page-title{
                        color:black !important;
                        padding-top:60px !important;
                        font-weight:bold;
                    }

                    .profile-wrapper{
                       height:80px;
                       display: flex;
                       width:270px;
                       border-left: 1px solid #E7E8F2;
                       padding: 0 0 0 20px;
                       cursor:pointer;
                   }

                   .notification-wrapper{
                       height:80px;
                       width:100px;
                       border-left: 1px solid #E7E8F2;
                       display:flex;
                        justify-content:center;
                   }
                   
                    #user-info-wrapper{
                        padding:13px;
                    }
                  
                    #user-info-wrapper p{
                        line-height:2px;
                        color:white !important;
                       
                    }

                    .profile-wrapper #user-name{
                        color:#25233A !important;
                        font-size:1.2em;
                        margin-top:25px;
                    }

           
                    #sub-menu-wrapper{
                        position:fixed;
                        width:150px;
                        min-height:10px;
                        background-color:#F9F9F9;
                        border:1px solid #E5E9E8;
                        border-radius:2px;
                        right:80px;
                        top:80px;
                        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.15);
                        visibility:hidden;
                      
                    }

                    #sub-menu-wrapper ul li{
                        display:block;
                        height:50px !important;
                        width:100%  !important;
                        margin:0 !important;
                      
                    }

                    #sub-menu-wrapper ul li a{
                        color:black;
                        height:inherit !important;
                        margin: 0 !important;
                        line-height:1;
                        padding:14px 10px !important;
                    }

                    #profile:hover #sub-menu-wrapper{
                        visibility:visible;
                        transition: display 2s;
                    }

                  

                    #fixed-side-bar{
                        height:100%;
                        width:7%;
                        position:fixed;
                        left:0;
                        top:0;
                        background-color:white;
                        border-right: 1px solid #E7E8F2;
                        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.15);
                        -webkit-transform:translateZ(0) scale(1,1);
                        -webkit-transition:all .1s linear;
                        transition:all .1s linear;
                        z-index:10;
                    }

                 

                    #fixed-logo{
                        height:80px;
                        border-bottom: 1px solid #E7E8F2;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                    }

                  
                    #fixed-logo #fixed-logo-inner{
                        width:80%;
                        height:50%;
                        display: grid;
                        grid-template-columns:60% 40%;
                        align-items:center;
                    }

                   

                    #fixed-logo #fixed-logo-inner object{
                        width:70px; 
                    }

                   
                    #fixed-arrow{
                        height:15px;
                        
                    }

                   

                    #fixed-side-menu{
                        min-height:100%;
                        margin-top:120px;
                    }


                    .fixed-side-menu-item a span{
                        margin:3px 0 0 10px;
                    }
                    .fixed-side-menu-item a{
                        color:#000000;  
                    }

                    .fixed-side-menu-item a{
                        width:80px;
                        min-height:40px;
                        display:flex;
                        justify-items:center;
                        margin-bottom:10px;
                        padding:10px 2px 10px 20px;
                        border-radius: 0 10px 10px 0;
                    }
                    

                    .active-fixed-side-menu-item a > svg *,.active-fixed-side-menu-item a{
                        background-color:#0F9670;
                        color: #ffffff !important;
                        stroke:white;
                    }

                    svg{
                        width:40px;
                        height:30px;
                         
                    }


                  
                    .fixed-side-menu-item a:hover > svg *,.fixed-side-menu-item a:hover{
                        background-color:#0F9670;
                        color: #ffffff !important;
                        stroke:white;
                        padding:10px 2px 10px 20px;
                        border-radius: 0 10px 10px 0;
                    }

                    p{
                        margin: 15px 0;
                    }

                    #username{
                        font-size:16px;
                        color: #384741;
                    }

                    #status{
                        color: #0F9670;
                        font-size: 12px;
                        font-weight:bold;
                    }

                    #role,#email,#organisation{
                        font-size:12px;
                        color: #384741;
                    }

                    #role:before, #organisation:before{
                        content:"";
                        display:inline-block;
                        width:5px;
                        height:5px;
                        background-color:#384741;
                        margin:0 5px;
                    }

                    .edit-btn{
                        height:20px !important;
                        padding: 10px !important;
                        line-height:0;
                        border-radius:4px;
                        background-color:#0F9670;
                    }

                    #cancel{
                        color:#0F9670;
                        width:100px;
                        height:30px !important;
                        background: #FFFFFF !important;
                        border: 1px solid #0F9670 !important;
                        line-height:0;
                        margin-top:16px;
                    }

                    #profile-form-wrapper{
                        height:0;
                        overflow:hidden;
                        transition: height .2s;
                    }
                `}
            </style>
        </Fragment>
    )
}

export default Navigation
