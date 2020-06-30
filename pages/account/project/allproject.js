import {Fragment, useState, useEffect} from 'react'
import Head from 'next/head'
import Router from 'next/router'
import Link from 'next/link'
import Navigation from '../../../components/navigations/Navigation'
import {GET_ALL_PROJECT,LOAD_FILTER} from '../../../graphql/query/Project'
import { useQuery } from '@apollo/react-hooks';
import {projectClient} from '../../../graphql/client/ProjectClient'
import {GOOGLE_API_KEY} from '../../../config/keys'
import GoogleMapReact from 'google-map-react'
import dynamic from 'next/dynamic'
import { toast,ToastContainer } from 'react-toastify';
import Accordion from '../../../components/accordion/Accordion'
import {FormatUrl,dateFormater} from '../../../config/modules/UrlFormater'

const Marker = dynamic(
    () => import('../../../components/marker/Marker'),
    { ssr: false }
  )


export default()=>{

    const [filterInput, setFilterInput] = useState({
        pageNumber:1,
        startDate:'',
        endDate:'',
        sectorIds:'',
        coreAreaIds:'',
        stateIds:'',
        orgIds:''
    })

    const [dateInput, setDateInput] = useState({
        start:"text",
        end:"text"
    })

    useEffect(()=>{
        let savedUser = JSON.parse(localStorage.getItem("pubsiwp"));
        if(!savedUser){
            Router.push("/")
        }
    },[])

    const [tab,setTabs] = useState("table");

    const center = {lat: 9.0820, lng: 8.6753 };
    const zoom = 7;

    const {data, loading} = useQuery(GET_ALL_PROJECT,{
        client:projectClient,
        variables:{pageNumber:1}
    })

    const changeFilterSector = (e)=>{
        if(e.target.checked){
            setFilterInput({...filterInput,sectorIds:e.target.value})
        }
    }

    const changeFilterState = (e)=>{
        if(e.target.checked){
            setFilterInput({...filterInput,stateIds:e.target.value})
        }
    }

    const changeFilterStartDate = (e)=>{
            setFilterInput({...filterInput,startDate:e.target.value})
    }

    const changeFilterEndDate = (e)=>{
        setFilterInput({...filterInput,endDate:e.target.value})
}


    const {data:filter,loading:loadingFilter} = useQuery(LOAD_FILTER,{
        client:projectClient
    })

    const submitFilter = ()=>{
        refetch({variables:filterInput})
    }
  

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
                <title>Project</title>
            </Head>
            <Navigation page="PROJECT"/>
            <main>
               <br />
              <div id="row-wrapper">
              <div id="v-search-wrapper">
                        <p id="search-wrapper-title"><b>FILTER</b></p>
                        <span className="line"></span>
                            <div id="search-items-wrapper">
                                <Accordion title="Sector">
                                    {
                                        loadingFilter ? '':
                                        
                                            filter && filter.loadProjectFilter && filter.loadProjectFilter.sectors ? filter.loadProjectFilter.sectors.map(({sectorName,id},i)=>(
                                                <p key={i}>
                                                    <label>
                                                        <input name="sector" value={id} type="radio" onChange={changeFilterSector} />
                                                        <span>{sectorName}</span>
                                                    </label>
                                                </p>
                                            )):''
                                        
                                        
                                    }
                                
                                </Accordion>
                                <br />
                                <Accordion title="Organisations">
                                {
                                        loadingFilter ? '':
                                        
                                            filter && filter.loadProjectFilter && filter.loadProjectFilter.organisations ? filter.loadProjectFilter.organisations.map(({longName,id},i)=>(
                                                <p key={i}>
                                                     <label>
                                                        <input name="sector" value={id} type="radio" />
                                                        <span>{longName}</span>
                                                    </label>
                                                </p>
                                            )):''
                                        
                                        
                                    }
                                </Accordion>
                                    <br />
                                <Accordion title="State">
                                <select className="browser-default" defaultValue={filterInput.stateIds} onChange={changeFilterState}>
                                    <option value={0} disabled>Choose State</option>
                                {
                                        loadingFilter ? <option value={0}>Choose State</option>:
                                        
                                            filter && filter.loadProjectFilter && filter.loadProjectFilter.states ? filter.loadProjectFilter.states.map(({state,stateId},i)=>(
                                                <option value={stateId} key={i}>{state}</option>
                                            )):''
                                        
                                        
                                    }
                                   
                                </select>
                                </Accordion>
                                    <br />
                                <Accordion title="Date">
                                    <input type={dateInput.start} onFocus={()=>openPicker("start")} onChange={(e)=>closePicker(e,"start")} placeholder="From" onChange={changeFilterStartDate}/>
                                    <input type={dateInput.end} onFocus={()=>openPicker("end")} onChange={(e)=>closePicker(e,"end")} placeholder="To" onChange={changeFilterEndDate}/>
                                </Accordion>
                        
                        
                        
                        <div className="center">
                            {
                                loading ?<button className="btn z-depth-0 disabled-btn disabled">Fetching...</button>:
                                <button className="btn add-cta z-depth-0" onClick={submitFilter}>Filter</button>
                            }
                        
                        </div>
                        </div>
                    </div>
              

                <div id="main-content">
                    <div className="row" id="row-search">
                        <div className="col s12 m4">
                           <div id="tab-type-wrapper">
                               <span onClick={()=>setTabs("table")} className={tab =='table' ? "active-tab center":"center"}>Table</span><span onClick={()=>setTabs("map")}  className={tab =='map' ? "active-tab center":"center"}>Map</span>
                           </div>
                        </div>
                        <div className="col s12 m5">
                            <input type="text" id="search" placeholder="Search by title, location" />
                        </div>
                        <div className="col s12 m3">
                            <button className="btn z-depth-0 right" id="download">Download</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s12 m12">
                            {
                                loading ? "Loading...":
                                <div id="opt-wrapper">
                                    {
                                        tab == 'table' ? 
                                        <table className="striped">
                                    <thead>
                                        <tr><th>Title</th><th>Location</th><th>Budget</th><th>Disbursed</th><th>Created</th><th></th></tr>
                                    </thead>
                                    <tbody>
                                    {
                                        data && data.getAllProjects && data.getAllProjects.projects ?  data.getAllProjects.projects.map(({title,address,budget,creationDate,totalSpend,projectId},i)=>(
                                        <tr key={i}><td><Link href="/account/project/single/[pid]" as={`/account/project/single/${FormatUrl(title,projectId)}`}><a>{title}</a></Link></td><td>{address}</td><td>{budget}</td><td>{totalSpend}</td><td>{creationDate.split(" ")[0]}</td></tr>
                                        )):<></>
                                    }
                                    </tbody>
                                </table>:
                               <GoogleMapReact
                                    bootstrapURLKeys={{ key:GOOGLE_API_KEY,language: 'english',
                                    region: 'english'}}
                                    defaultCenter={center}
                                    defaultZoom={zoom}>
                                        {
                                          data && data.getAllProjects && data.getAllProjects.projects ?  data.getAllProjects.projects.map(({states,sectors},j)=>(
                                                <Marker
                                                key={j}
                                                lat={states[0].latitude}
                                                lng={states[0].longitude}
                                                title={states[0].state}
                                                color="#ff6f00"/>
                                            )):<Fragment></Fragment>
                                        }
                                </GoogleMapReact>
                        
                                    }
                                </div>
                            }
                           
                        </div>
                    </div>

                </div>
              </div>
            </main>

            <style jsx>{`


                #row-wrapper{
                    height:85%;
                    display:grid;
                    grid-template-columns:15% 85%;
                }
                #v-search-wrapper{
                    height:100%;
                    background-color:white;
                    box-shadow: 2 2.8px 2.2px rgba(0, 0, 0, 0.034);
                    padding:20px 20px 20px 20px;
                    border-radius:10px 0 0 0;
                }

              

                #search-wrapper-title{
                    color:#0F9670;
                    margin:0;
                }
               
               #main-content{
                   background-color:white;
                   min-height:100%;
                   margin-left:2px;
                   padding:20px;
                   border-radius: 0 10px 0 0;
               }

               .line{
                   display:inline-block;
                   height:5px;
                   width:50px;
                   background-color:#0F9670;
                   margin:0
               }

             
               #download{
                   background-color:#F8F8F8 !important;
                   color:#0F4A39;
                   border-radius:5px;
                   padding: 0px 30px;
                   height:43px;
               }

               tbody tr td{
                   padding: 20px 10px;
               }

               .approved{
                   display:inline-block;
                   background-color:#A9FFE6;
                   padding:3px 15px;
                   color:#384741;
                   border-radius:10px;
               }

               .pending{
                   display:inline-block;
                   background-color: rgba(241, 224, 70, 0.3);
                   padding:3px 15px;
                    color:#A49302;
                   border-radius:10px;
               }

              #tab-type-wrapper{
                    width:160px;
                    height:43px;
                    margin:0;
                    background-color:#F8F8F8;
                    border-radius:5px;
                    display:flex;
                    align-items:center;
                    justify-items:center;
                    border-radius:5px;
                    padding:2px;
              }

              #tab-type-wrapper span{
                  width:50%;
                  height:100%;
                  padding:10px 2px;
                  border-radius:5px;
                  cursor:pointer;
              }

              .active-tab{
                  background-color:#ffffff;
                 
              }

              #opt-wrapper{
                  height:600px;

              }

             

             
             

            `}</style>
        </Fragment>
    )
}