import React, { Fragment,useEffect } from 'react'
import Navigation from '../../../../components/navigations/Navigation'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks';
import {projectClient} from '../../../../graphql/client/ProjectClient'
import {LOAD_SUB_PROJECT_BY_ID,LOAD_PROJECT_DETAIL} from '../../../../graphql/query/Project'
import {decodeUrl,formatStateUrl} from '../../../../config/modules/UrlFormater'
import Range from '../../../../components/rangeslider/Range'
import {GOOGLE_API_KEY} from '../../../../config/keys'
import GoogleMapReact from 'google-map-react'
import Marker from '../../../../components/marker/Marker'


function Single(props) {

    const {data:subProject, loading:loadingLocationInfo} = useQuery(LOAD_SUB_PROJECT_BY_ID,{
        client:projectClient,
        variables:{projectId:props.project }
    })

   
    const {data:projectDetail, loading:loadingDetail} = useQuery(LOAD_PROJECT_DETAIL,{
        client:projectClient,
        variables:{projectId:props.project }
    })
  
    const center = {lat: 9.0820, lng: 8.6753 };
    const zoom = 6;

    return (
        <Fragment>
              <Navigation page="Project"/>
              <main>
                    <Fragment>
                  <div className="row">
                      <div className="col s12 m12"></div>
                  </div>
                    <div className="white" id="summary-wrapper">
                        <p style={{marginLeft:'10px'}}><b>Summary</b></p><div className="divider"></div>
                        <div className="row">
                            <div className="col s12">
                                <br />
                                {
                                    loadingLocationInfo ? <p>Loading...</p>:
                               
                                <table>
                                    <thead><tr><th>#</th><th>State</th><th>Budget</th><th>Disbursed</th><th>Progress</th></tr></thead>
                                    <tbody>
                                       {
                                           

                                           subProject && subProject.loadSubProjectById ? subProject.loadSubProjectById.map(({budget,disbursed,state,progress,stateId},i)=>(
                                            <Fragment key={i}>
                                                <tr className="tb-row"><td>{1+i}.</td><td><Link href="/account/project/state/[state]/[stpid]" as={`/account/project/state/${state.toLowerCase()}/${formatStateUrl(projectDetail && projectDetail.loadProjectById ? projectDetail.loadProjectById.title : state,props.project,stateId)}`}><a><u>{state}</u></a></Link></td><td><b>N {budget}</b></td><td>N {disbursed}</td><td className="progress-txt">{progress}% COMPLETED</td></tr>
                                                <tr><td></td><td></td><td></td><td></td><td></td></tr>
                                           </Fragment>
                                           )):<Fragment></Fragment>

                                           
                                           
                                       }
                                        </tbody>
                                </table>
                                 }
                            </div>
                        </div>
                        <div id="project-desc-wrapper">
                            {
                                loadingDetail ? <p>Loading...</p>:
                                
                                
                            <div className="row">
                                <div className="col s12 m3">
                                    <p><span className="project-desc-title">Project Title</span><br />
                                    <b>{projectDetail && projectDetail.loadProjectById ? projectDetail.loadProjectById.title : ''}</b></p>
                                    
                                    <p><span className="project-desc-title">Location</span><br />
                                    <b>{projectDetail && projectDetail.loadProjectById ? projectDetail.loadProjectById.address : ''}</b></p>
                                </div>
                                <div className="col s12 m3">
                                    <p><span className="project-desc-title">Organisation</span><br />
                                    <b>NMA</b></p>
                                
                                    <p><span className="project-desc-title">Start Date</span><br />
                                    <b>{projectDetail && projectDetail.loadProjectById ? projectDetail.loadProjectById.projectedStartDate.split(" ")[0] : ''}</b></p>
                                </div>
                                <div className="col s12 m3">
                                    <p><span className="project-desc-title">Beneficiary</span><br />
                                    <b>{projectDetail && projectDetail.loadProjectById ? projectDetail.loadProjectById.beneficiaries : ''}</b></p>
                                
                                    <p><span className="project-desc-title">End Date</span><br />
                                    <b>{projectDetail && projectDetail.loadProjectById ? projectDetail.loadProjectById.projectedFinishDate.split(" ")[0] : ''}</b></p>
                                </div>
                                    <div className="col s12 m3"></div>
                            </div>
                        }
                        </div>

                            
        
                    </div>

                    <div className="white" id="history">
                      <p style={{marginLeft:'10px'}}><b>Budget</b></p><div className="divider"></div>
                      <div className="row">
                          <div className="col s12 m10 offset-m1">
                              <br />
                            <Range released={12000000} expected={123000000}/> 
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
                                    subProject && subProject.loadSubProjectById ? subProject.loadSubProjectById.map(({latitude,longitude,state},j)=>(
                                        <Marker
                                                key={j}
                                                lat={latitude}
                                                lng={longitude}
                                                title={state}
                                                color="#ff6f00"/>
                                    )):<Fragment></Fragment>
                                }
                                         
                           </GoogleMapReact>
                           </div>
                         
                    </div>
                    </Fragment>
                    
            </main>
            
            <style jsx>{`
                #summary-wrapper,#history,#geo-location{
                    min-height:100px;
                    border:1px solid #E7E8F2;
                    margin-top:20px;
                    padding-bottom:10px;
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

                #project-desc-wrapper{
                    padding-left:50px;
                }

                .project-desc-title{
                    font-size:12px;
                }


                #map{
                    height:500px;
                }

                .progress-txt{
                    color:#0F9670;
                }
               
            `}</style>
        </Fragment>
    )
}

Single.getInitialProps = async ({query})=>{

    if(query.pid){
        const pid = await parseInt(decodeUrl(query.pid))
    return{project:pid}
    }else{
        return{}
    }
    
    
}

export default Single
