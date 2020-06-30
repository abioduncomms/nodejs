import React, { Fragment,useEffect, useState } from 'react'
import Navigation from '../../../../../components/navigations/Navigation'
import Link from 'next/link'
import { useQuery, useMutation} from '@apollo/react-hooks';
import {projectClient} from '../../../../../graphql/client/ProjectClient'
import {LOAD_PROJECT_BY_LGA_ID} from '../../../../../graphql/query/Project'
import {ADD_FEEDBACK} from '../../../../../graphql/mutation/Project'
import {decodeStateUrl} from '../../../../../config/modules/UrlFormater'
import Range from '../../../../../components/rangeslider/Range'
import {GOOGLE_API_KEY} from '../../../../../config/keys'
import GoogleMapReact from 'google-map-react'
import Marker from '../../../../../components/marker/Marker'
import Modal from '../../../../../components/modal/Modal'


function LgaProject(props) {

    const [modal, setModal] = useState({
        add:false,
        addFeedback:false
    })

   

    const [feedBackInput, setFeedBackInput] = useState({
        message:'',
        photo:'',
        projectId:props.projectId,
        lgaId:props.lgaId
    })

    const {data:lgaInfo, loading:loadingLgaInfo, refetch} = useQuery(LOAD_PROJECT_BY_LGA_ID,{
        client:projectClient,
        variables:{projectId:props.projectId,lgaId:props.lgaId }
    })

 

   const [addNewFeedback,{loading:addingFeedback}] = useMutation(ADD_FEEDBACK,{
       client:projectClient,
       onCompleted(response){
           console.log(response)
       },
       onError(error){
           console.log(error)
       }
   })

  
  const submitFeedback = ()=>{
    addNewFeedback({variables:feedBackInput}).then(()=>refetch())
  }
    const center = {lat: 9.0820, lng: 8.6753 };
    const zoom = 6;

    return (
        <Fragment>
              <Navigation page="Project"/>
              <main>
                  <div className="row">
                      <div className="col s12 m12"></div>
                  </div>
                    <div className="white" id="summary-wrapper">
                    <p style={{marginLeft:'10px'}}><b>Basic Info</b></p><div className="divider"></div>
                        <div className="row">
                            <div className="col s12">
                                <br />
                                     {
                                         loadingLgaInfo ? <p>Loading...</p>:
                                         <div className="row">
                                         <div className="col s12 m3">
                                             <p><span className="project-desc-title">LGA</span><br />
                                             <b>{lgaInfo && lgaInfo.loadSubProjectLGAId && lgaInfo.loadSubProjectLGAId.project ?lgaInfo.loadSubProjectLGAId.project.lga: ''}</b></p>
                                            
                                              </div>
                                         <div className="col s12 m3">
                                             <p><span className="project-desc-title">Communities</span><br />
                                             <b>{lgaInfo && lgaInfo.loadSubProjectLGAId && lgaInfo.loadSubProjectLGAId.project ?lgaInfo.loadSubProjectLGAId.project.communities: ''}</b></p>
                                         
                                           </div>
                                         <div className="col s12 m3">
                                             <p><span className="project-desc-title">Contractor</span><br />
                                             <b>{lgaInfo && lgaInfo.loadSubProjectLGAId && lgaInfo.loadSubProjectLGAId.project ?lgaInfo.loadSubProjectLGAId.project.contractor: ''}</b></p>
                                         
                                             </div>
                                             <div className="col s12 m3"></div>
                                     </div>
           
                                     }      
                  
                            </div>
                        </div>
                            
        
                    </div>

                    <div className="white" id="history">
                        <div className="row">
                            <div className="col s12 m12">
                                <p id="history-p"><b>Added Spend History</b></p>
                            </div>
                        </div>
                      <div className="divider"></div>
                      <div className="row">
                          <div className="col s12 m12">
                              <br />
                              {
                                  loadingLgaInfo ? <p>Loading...</p>:
                              
                                <table>
                                    <thead><tr><th>#</th><th>Added By</th><th>Amount</th><th>Date</th></tr></thead>
                                    <tbody>
                                       {
                                           lgaInfo && lgaInfo.loadSubProjectLGAId && lgaInfo.loadSubProjectLGAId.loadLgaSpend ? lgaInfo.loadSubProjectLGAId.loadLgaSpend.map(({addedBy,dateDisbursed,spendAmount},i)=>(
                                                <Fragment key={i}>
                                                    <tr className="tb-row"><td>{1+i}.</td><td>{addedBy}</td><td><b>N {spendAmount}</b></td><td>{dateDisbursed.split(" ")[0]}</td></tr>
                                                    <tr><td></td><td></td><td></td><td></td></tr>
                            
                                                </Fragment>
                                           )):<Fragment></Fragment>
                                       }
                                    
                                    </tbody>
                                </table>
                                }
                                <br />
                                <br />

                                <Range expected={12000000} released={1200000}/>
                          </div>
                      </div>
                    </div>

                    <div className="white" id="geo-location">
                      <p style={{marginLeft:'10px'}}><b>Geo Location</b></p><div className="divider"></div>
                      
                        <div id="map">
                            <GoogleMapReact
                            bootstrapURLKeys={{ key:GOOGLE_API_KEY,language: 'english',
                            region: 'english'}}
                            defaultCenter={center}
                            defaultZoom={zoom}>
                                {



                                        <Marker
                                                lat={lgaInfo && lgaInfo.loadSubProjectLGAId && lgaInfo.loadSubProjectLGAId.project ? lgaInfo.loadSubProjectLGAId.project.latitude:0}
                                                lng={lgaInfo && lgaInfo.loadSubProjectLGAId && lgaInfo.loadSubProjectLGAId.project ? lgaInfo.loadSubProjectLGAId.project.longitude:0}
                                                title={lgaInfo && lgaInfo.loadSubProjectLGAId && lgaInfo.loadSubProjectLGAId.project ? lgaInfo.loadSubProjectLGAId.project.lga:''}
                                                color="#ff6f00"/>
                                  
                                }
                                         
                           </GoogleMapReact>
                           </div>
                    </div>
                    <br />
                    <div className="row">
                    <div className="col s12 m6" style={{paddingLeft:"0"}}>
                            <div className="white">
                                <div style={{padding:"5px 20px"}}>
                                    <p><b>Feedbacks</b><button className="btn z-depth-0 right add-milestone-spend-cta" onClick={()=>setModal({...modal,addFeedback:true})}>Give Feedback</button></p>
                                </div>
                        
                                <div className="divider"></div>
                                <div className="row">
                                    <div className="col s12 m12" style={{padding: '5px 10px 5px 30px '}}>
                                        <ul className=" white-wrapper" style={{marginRight:"3px", paddingRight:"5px"}}>
                                                {
                                                    lgaInfo && lgaInfo.loadSubProjectLGAId && lgaInfo.loadSubProjectLGAId.feedbacks ? lgaInfo.loadSubProjectLGAId.feedbacks.map(({username,message,photo,feedBackDate, responses},i)=>(
                                                    <li className="feedback-item">
                                                        <p><span className="feedback-title">{username}</span><span className="right feedback-span">{feedBackDate}</span></p>
                                                        <p className="feedback-content">{message}<span className="blue-text"><u>View Photo</u></span></p>
                                                        <br />
                                                        <p><span className="feedback-type">COMPLAINT</span><span className="photo-cta right">Response (0)</span></p>
                                                        <div className="divider"></div><br />
                                                            {
                                                                responses.map(({username,response,responseDate},j)=>(
                                                                    <div className="response-wrapper">
                                                                        <p><span className="responder">{username}</span><span className="right feedback-span">{responseDate.split(" ")[0]}</span></p>
                                                                <p className="response">{response}</p>
                                                                    </div>
                                                                ))
                                                            }
                                                        
                                                    </li>
                                                    )):''
                                                }  
                                            
                                        </ul>
                                    </div>
                                </div>
                                <div>
                               
                               </div>
                            </div>
                        </div>
                        <div className="col s12 m6" style={{paddingRight:"0"}}>
                            <div className="white">
                                <div style={{padding:"5px 20px"}}>
                                    <p><b>Milestones</b></p>
                                </div>
                                <div className="divider"></div>
                                <div className="row">
                                    <div className="col s12 m12" style={{padding: '5px 30px'}}>
                                        <ol className="white-wrapper milestone">
                                            <li className="milestone-item">Foundation Constrution</li>
                                        </ol>
                                    </div>
                                </div>
                                <div>
                               
                               </div>
                            </div>
                        </div>
                    </div>
            </main>

           

            <Modal title="Give Feedback" index="add-spend" show={modal.addFeedback} close={()=>setModal({...modal,addFeedback:false})}>
                <div className="row">
                    <div className="col s12">
                        <textarea placeholder="Message" rows="5" value={feedBackInput.message} onChange={(e)=>setFeedBackInput({...feedBackInput,message:e.target.value})}></textarea>
                        
                        <div className="center">
                            {
                                addingFeedback ? <button className="btn disabled-btn disabled">Submitting...</button>:
                                <button className="btn add-cta" onClick={submitFeedback}>Submit Feedback</button>
                            }
                            
                        </div>
                    </div>
                </div>
            </Modal>
            
            <style jsx>{`
                #summary-wrapper,#history,#geo-location{
                    min-height:200px;
                    width:100%;
                    border:1px solid #E7E8F2;
                    margin-top:20px;
                    padding-bottom:50px;
                }

                #map{
                    height:500px;
                    padding-bottom:0px;
                }

                table thead tr{
                    border:none !important;
                }

                table thead tr th{
                    margin-top:20px;
                    font-weight:normal !important;
                    font-size:0.8em;
                }

                .tb-row{
                    border: 1px solid #E1E1E1;
                    border-radius: 20px !important;
                }

               
                .tb-row td{
                    font-size:16px;
                }

                tr:nth-child(even){
                    border:none !important;
                }
                tr:nth-child(even) td {
                    height:5px !important;
                    padding:0 !important;
                    
                    }

               .add-milestone-spend-cta{
                   background-color:#0F9670 !important;
                   border-radius:4px;
                   margin:0 !important;
                   height:  35px !important;
               }

                .progress-txt{
                    color:#0F9670;
                }

                .feedback-title{
                    font-size:14px;
                    font-weight:600;
                    color:#384741;
                }
                .feedback-item{
                    min-height:50px;
                    padding: 10px 0;
                    margin-right:10px
                }

                .feedback-content{
                    margin:8px 0 !important;
                    font-size:14px;
                }

                .feedback-type{
                    border:1px solid rgba(15, 150, 112, 0.5);
                    border-radius:4px;
                    font-size:12px;
                    padding: 5px;
                }

                .feedback-item .divider{
                    margin-top: 18px;
                }

                .photo-cta{
                    text-decoration:underline;
                    font-size:13px;
                }


                .feedback-item > *{
                    margin:0;
                }

                .feedback-span{
                    font-size:12px;
                    font-weight:bold;
                }

                .white-wrapper{
                    padding-right:20px;
                    height: 400px;
                    overflow-y:auto;
                    overflow-x:hidden;

                }

                .white-wrapper::-webkit-scrollbar {
                        width: 5px;
                    }

                    /* Track */
                    .white-wrapper::-webkit-scrollbar-track {
                        background-color:#ffffff; 
                        border-radius: 10px;
                    }
                    
                    /* Handle */
                    .white-wrapper::-webkit-scrollbar-thumb {
                    background: #E1E1E1; 
                    border-radius: 10px;
                    }

                    .milestone-item::before{
                        counter-increment:1;
                        content: counter()
                    }

                    .milestone{
                        list-style:none;
                        padding:0 !important;
                        counter-reset: number;
                    }

                    .milestone li{
                        counter-increment:number;
                    }

                    .milestone li:before{
                        display:  inline-block;
                        content: counter(number)
                        margin-right:5px;
                        width:2rem;
                        height:2rem;
                    }


                    .response-wrapper > *{
                        margin:0;
                    }

                    .responder{
                        font-weight:600;
                        font-size:14px
                    }

                    .response{
                        font-size:14px;
                    }
                    
                  
            `}</style>
        </Fragment>
    )
}

LgaProject.getInitialProps = async ({query})=>{

    if(query.lgaid){
        const res = await decodeStateUrl(query.lgaid)
    return{
       lga:query.lga,
       lgaId:parseInt(res[0]),
       projectId:parseInt(res[1])
        }
    }else{
        return {}
    }
    
    
}

export default LgaProject
