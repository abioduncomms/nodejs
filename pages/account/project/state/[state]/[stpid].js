import React, { Fragment,useEffect } from 'react'
import Navigation from '../../../../../components/navigations/Navigation'
import Link from 'next/link'
import { useQuery } from '@apollo/react-hooks';
import {projectClient} from '../../../../../graphql/client/ProjectClient'
import {LOAD_SUB_PROJECT_BY_STATE_ID,LOAD_PROJECT_DETAIL} from '../../../../../graphql/query/Project'
import {formatStateUrl,decodeStateUrl} from '../../../../../config/modules/UrlFormater'
import Range from '../../../../../components/rangeslider/Range'
import {GOOGLE_API_KEY} from '../../../../../config/keys'
import GoogleMapReact from 'google-map-react'
import Marker from '../../../../../components/marker/Marker'


function StateProject(props) {

    const {data:stateInfo, loading:loadingStateInfo} = useQuery(LOAD_SUB_PROJECT_BY_STATE_ID,{
        client:projectClient,
        variables:{projectId:props.projectId,stateId:props.stateId }
    })

    const {data:projectDetail, loading:loadingProjectDetail} = useQuery(LOAD_PROJECT_DETAIL,{
        client:projectClient,
        variables:{projectId:props.projectId}
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
                    <p style={{marginLeft:'10px'}}><b>{props.state ? props.state.charAt(0).toUpperCase() + props.state.slice(1):''} - Local Goverment Overview</b></p><div className="divider"></div>
                        <div className="row">
                            <div className="col s12">
                                <br />
                                {
                                    loadingStateInfo ? <p>Loading...</p>:
                                
                                <table>
                                    <thead><tr><th>#</th><th>LGA</th><th>Contractor</th><th>Budget</th><th>Disbursed</th><th>Progress</th></tr></thead>
                                    <tbody>
                                       {
                                           

                                           stateInfo && stateInfo.loadSubProjectByStateId && stateInfo.loadSubProjectByStateId.lgas ? stateInfo.loadSubProjectByStateId.lgas.map(({budget,disbursed,lga,contractor,progress,lgaId,state},i)=>(
                                            <Fragment key={i}>
                                                <tr className="tb-row"><td>{1+i}.</td><td><Link href="/account/project/lga/[lga]/[lgaid]" as={`/account/project/lga/${lga.toLowerCase()}/${formatStateUrl(projectDetail && projectDetail.loadProjectById ? projectDetail.loadProjectById.title.toLowerCase():lga,props.projectId,lgaId,)}`}><a>{lga}</a></Link></td><td>{contractor}</td><td><b>N {budget}</b></td><td>N {disbursed}</td><td className="progress-txt">{progress}% COMPLETED</td></tr>
                                                <tr><td></td><td></td><td></td><td></td><td></td></tr>
                                           </Fragment>
                                           )):<Fragment></Fragment>  
                                       }
                                        </tbody>
                                </table>
                                }
                            </div>
                        </div>
                            
        
                    </div>

                    <div className="white" id="history">
                      <p style={{marginLeft:'10px'}}><b>{props.state ? props.state.charAt(0).toUpperCase() + props.state.slice(1) : ''} - Budget Overview</b></p><div className="divider"></div>
                      <div className="row">
                          <div className="col s12 m10 offset-m1">
                              <br />
                            <Range released={12000000} expected={12300004500}/> 
                          </div>
                      </div>
                    </div>

                    <div className="white" id="geo-location">
                      <p style={{marginLeft:'10px'}}><b>{props.state ? props.state.charAt(0).toUpperCase() + props.state.slice(1): ''} - Geo Location</b></p><div className="divider"></div>
                      
                              <div id="map">
                          <GoogleMapReact
                            bootstrapURLKeys={{ key:GOOGLE_API_KEY,language: 'english',
                            region: 'english'}}
                            defaultCenter={center}
                            defaultZoom={zoom}>
                                {
                                    stateInfo && stateInfo.loadSubProjectByStateId && stateInfo.loadSubProjectByStateId.lgas ? stateInfo.loadSubProjectByStateId.lgas.map(({latitude,longitude,lga},j)=>(
                                        <Marker
                                                key={j}
                                                lat={latitude}
                                                lng={longitude}
                                                title={lga}
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
                    min-height:200px;
                    border:1px solid #E7E8F2;
                    margin-top:20px;
                    padding-bottom:20px;
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

StateProject.getInitialProps = async ({query})=>{
   
    if(query.stpid){
      const res = await decodeStateUrl(query.stpid)
    return{
       state:query.state,
       stateId:parseInt(res[0]),
       projectId:parseInt(res[1])
        }

    }else{
        return{}
    }
    
}

export default StateProject
