import {useContext, useEffect, Fragment, useState} from 'react'
import { UserContext } from '../../config/context'
import {useRouter} from 'next/router'
import Head from 'next/head'
import Navigation from '../../components/navigations/Navigation'
import {GOOGLE_API_KEY} from '../../config/keys'
import GoogleMapReact from 'google-map-react'
import {GET_DASHBOARD_SUMMARY} from '../../graphql/query/Dashboard';
import {projectClient} from '../../graphql/client/ProjectClient'
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import dynamic from 'next/dynamic'

const Chart = dynamic(
    () => import('react-apexcharts'),
    { ssr: false }
  )

  const Marker = dynamic(
    () => import('../../components/marker/Marker'),
    { ssr: false }
  )

const Dashboard = ()=>{

    const [chartCategory, setChartCategory] = useState("project")
    const [projectOpt, setProjectOpt] = useState("sector")
    const [budgetOpt, setBudgetOpt] = useState("sector")

    const {user} = useContext(UserContext)
    const router = useRouter()
    const [center, setCenter] = useState({lat: 9.0820, lng: 8.6753 });
    const [zoom, setZoom] = useState(7);

   

    useEffect(() => {
        let savedUser = JSON.parse(localStorage.getItem("pubsiwp"));
        if(!savedUser){
            Router.push("/")
        }
    }, [])

    const {data, loading} = useQuery(GET_DASHBOARD_SUMMARY,{
        client:projectClient
    });

    const projectByStateOption = {
        options: {
            
            chart: {
                id: "project-by-state",
            },
            fill:{
                colors:["#01058A"],
                opacity:0.9,
                type:"solid"
            },
            labels: data && data.getDashboardSummary && data.getDashboardSummary.stateChartInfo && data.getDashboardSummary.stateChartInfo.label ? data.getDashboardSummary.stateChartInfo.label:[],
            xaxis: {
                labels: {
                    show: true,
                    rotate: -45,
                    rotateAlways: true,
                    style: {
                        colors: ["#384741"],
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-xaxis-label',
                    }
                }
                
            },
            yaxis: {
                show: true,
                showAlways: true,
                title: {
                    text: "No of Projects",
                    rotate: 90,
                    rotateAlways: true,
                    showDuplicates: true,
                    trim: false,

                    style: {
                        color: "#384741",
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-yaxis-title',
                    },
                }
                    
                }
      },
      series: [
        {
          name: "series-1",
          data: data && data.getDashboardSummary && data.getDashboardSummary.stateChartInfo && data.getDashboardSummary.stateChartInfo.projectCount ? data.getDashboardSummary.stateChartInfo.projectCount:[]
        }
      ]
    };

    const projectBySectorOption = {
        options: {
            chart: {
            id: "project-by-sector"
            },
            fill:{
                colors:["#0F9670"],
                opacity:0.9,
                type:"solid"
            },
            labels: data && data.getDashboardSummary && data.getDashboardSummary.sectorChartInfo && data.getDashboardSummary.sectorChartInfo.label ? data.getDashboardSummary.sectorChartInfo.label:[],
            xaxis: {
                labels: {
                    show: true,
                    rotate: -45,
                    rotateAlways: true,
                    style: {
                        colors: ["#384741"],
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-xaxis-label',
                    }
                }
                
            },
            yaxis: {
                show: true,
                showAlways: true,
                title: {
                    text: "No of Projects",
                    rotate: 90,
                    rotateAlways: true,
                    showDuplicates: true,
                    trim: false,

                    style: {
                        color: "#384741",
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-yaxis-title',
                    },
                }
                    
                }
      },
      series: [
        {
          name: "series-1",
          data: data && data.getDashboardSummary && data.getDashboardSummary.sectorChartInfo && data.getDashboardSummary.sectorChartInfo.projectCount ? data.getDashboardSummary.sectorChartInfo.projectCount:[]
        }
      ]
    };

    const budgetByStateOption = {
        options: {
            
            chart: {
            id: "budget-by-state",
            },
            fill:{
                colors:["#FF7193"],
                opacity:0.9,
                type:"solid"
            },
            labels: data && data.getDashboardSummary && data.getDashboardSummary.stateChartInfo && data.getDashboardSummary.stateChartInfo.label ? data.getDashboardSummary.stateChartInfo.label:[],
            xaxis: {
                labels: {
                    show: true,
                    rotate: -45,
                    rotateAlways: true,
                    style: {
                        colors: ["#384741"],
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-xaxis-label',
                    }
                }
                
            },
            yaxis: {
                show: true,
                showAlways: true,
                title: {
                    text: "Total State Budget",
                    rotate: 90,
                    rotateAlways: true,
                    showDuplicates: true,
                    trim: false,

                    style: {
                        color: "#384741",
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-yaxis-title',
                    },
                }
                    
                }
      },
      series: [
        {
          name: "series-1",
          data:data && data.getDashboardSummary && data.getDashboardSummary.stateChartInfo && data.getDashboardSummary.stateChartInfo.projectBudget ? data.getDashboardSummary.stateChartInfo.projectBudget:[],
        }
      ]
    };

    const budgetBySectorOption = {
        options: {
            
            chart: {
            id: "budget-by-sector",
            },
            fill:{
                colors:["#FF9800"],
                opacity:0.9,
                type:"solid"
            },
            labels: data && data.getDashboardSummary && data.getDashboardSummary.sectorChartInfo && data.getDashboardSummary.sectorChartInfo.label ? data.getDashboardSummary.sectorChartInfo.label:[],
            xaxis: {
                labels: {
                    show: true,
                    rotate: -45,
                    rotateAlways: true,
                    style: {
                        colors: ["#384741"],
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-xaxis-label',
                    }
                }
                
            },
            yaxis: {
                show: true,
                showAlways: true,
                title: {
                    text: "Total Sector Budget",
                    rotate: 90,
                    rotateAlways: true,
                    showDuplicates: true,
                    trim: false,

                    style: {
                        color: "#384741",
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        cssClass: 'apexcharts-yaxis-title',
                    },
                }
                    
                }
      },
      series: [
        {
          name: "series-1",
          data: data && data.getDashboardSummary && data.getDashboardSummary.sectorChartInfo && data.getDashboardSummary.sectorChartInfo.projectBudget ? data.getDashboardSummary.sectorChartInfo.projectBudget:[],
        }
      ]
    };

    return (
        <Fragment>
            <Head>
                <title>Dashboard</title>
            </Head>
            <Navigation page="DASHBOARD"/>
            <main>
                {
                    loading ? <p>Loading...</p>:
                
                <div className="row">
                    <div className="col s12 m6">
                        <div id="overview-card-wrapper">
                            <div className="overview-card">
                                <div className="card-inner">
                                    <object type="image/svg+xml" data="/image/icon/projects.svg"/>
                                    <div className="card-stats">
                                        <p className="card-title">TOTAL PROJECTS</p>
                                        <p className="stats">{data && data.getDashboardSummary.totalProject ? data.getDashboardSummary.totalProject : 0}</p>
                                    </div>
                                </div>
                               </div>
                            <div className="overview-card">
                            <object type="image/svg+xml" data="/image/icon/expenditures.svg"/>
                                    <div className="card-stats">
                                        <p className="card-title">EXPECTED EXPENDITURE</p>
                                        <p className="stats">N {data && data.getDashboardSummary.totalProjectBudget ? data.getDashboardSummary.totalProjectBudget : 0}</p>
                                    </div>
                            </div>
                        </div>
                        <br />
                        <p><b>ALL PROJECTS IN THE DELTA REGION</b></p>
                        <div id="map-wrapper">
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: GOOGLE_API_KEY,language: 'english',
                            region: 'english', }}
                            defaultCenter={center}
                            defaultZoom={zoom}>

                                {
                                    data && data.getDashboardSummary && data.getDashboardSummary.projectForMap ? data.getDashboardSummary.projectForMap.map(({colorCode,lgaName,longitude,latitude,projectTitle},i)=>(
                                        <Marker
                                        key={i}
                                        lat={latitude}
                                        lng={longitude}
                                        title={lgaName}
                                        color={colorCode}/>
                                    )):''
                                }
                                
                            </GoogleMapReact>
                           
                        </div>
                    </div>
                    <div className="col s12 m6">
                        <div id="chart-outer-wrapper">
                            <ul id="chart-menu">
                                <li onClick={()=>setChartCategory("project")} className={chartCategory == "project" ? "active-chart-menu":''}>Project</li>
                                <li onClick={()=>setChartCategory("budget")} className={chartCategory == "budget" ? "active-chart-menu":''}>Budget</li>
                            </ul>
                            {
                                chartCategory == 'project' ?
                           
                            <div className="chart-wrapper">
                                <br />
                                <div className="row">
                                    <div className="col m6"></div>
                                    <div className="col m6">
                                        <ul>
                                            <li onClick={()=>setProjectOpt("sector")} className={projectOpt =="sector" ? "menu-opt":''}>Sector</li>
                                            <li onClick={()=>setProjectOpt("state")} className={projectOpt =="state" ? "menu-opt":''}>State</li>
                                        </ul>
                                    </div>
                                 </div>
                                 {
                                     projectOpt == "sector" ?
                                  
                                <Chart
                                    options={projectBySectorOption.options}
                                    series={projectBySectorOption.series}
                                    type="bar"
                                    width="500"
                                    height="500"
                                    />:
                                    <Chart
                                    options={projectByStateOption.options}
                                    series={projectByStateOption.series}
                                    type="bar"
                                    width="500"
                                    height="500"
                                    />
                                } 
                            </div>:
                            <div className="chart-wrapper">
                            <br />
                            <div className="row">
                                    <div className="col m6"></div>
                                    <div className="col m6">
                                        <ul>
                                        <li onClick={()=>setBudgetOpt("sector")} className={budgetOpt =="sector" ? "menu-opt":''}>Sector</li>
                                        <li onClick={()=>setBudgetOpt("state")} className={budgetOpt =="state" ? "menu-opt":''}>State</li>
                                        
                                        </ul>
                                    </div>
                                 </div>

                                 {
                                     budgetOpt == "sector" ?
                                     <Chart
                                        options={budgetBySectorOption.options}
                                        series={budgetBySectorOption.series}
                                        type="bar"
                                        width="500"
                                        height="500"/>:
                                        <Chart
                                        options={budgetByStateOption.options}
                                        series={budgetByStateOption.series}
                                        type="bar"
                                        width="500"
                                        height="500"/>
                                 }
                            
                        </div>

}
                        </div>
                    </div>
                </div>
            }
            </main>
            <style jsx>{`
                #overview-card-wrapper{
                    display:flex;
                    justify-content:space-between;
                }

                .overview-card{
                    height:120px;
                    border:1px solid #E5E9E8;
                    width: 48%;
                    background-color:white;
                    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
                    display: flex;
                    justify-content: center;
                    align-items:center; 
                }

                .overview-card{
                    border-top:none;
                }

                .card-inner{
                    display: grid;
                    grid-template-columns: 30% 70%;
                    width: 80%;
                    height:50%;
                    color: #515E59;
                    align-items:center
                }

                .card-inner object{
                    width:100px;
                    height:40px;
                    margin-right:2px;
                }
                
                .card-stats p{
                    line-height:1;
                    margin:0 0 0 10px;
                }

                .card-title{
                    font-size:1em;
                }
                .stats{
                    font-size:2em;
                    margin-top:0;
                }

                #map-wrapper{
                    height:450px;
                    border:1px solid #E5E9E8;
                    border-radius:10px;
                    position:relative;
                }

               


                #chart-outer-wrapper{
                    height:650px;
                    background-color:white;
                    width:95%;
                    border:1px solid #E5E9E8;
                    border-top:none;
                    padding: 30px 30px;
                    
                }

                #chart-menu li{
                    box-sizing: border-box;
                    display:inline-block;
                    color:#384741;
                    border-top:3px solid #FFFFFF;
                    width:100px;
                    text-align:center;
                    cursor:pointer;
                    padding: 10px 0;
                }

                #chart-menu li.active-chart-menu{
                    border-top: 3px solid #0F9670;
                }
                #chart-menu li:hover{
                    border-top: 3px solid #0F9670;
                    color:#0F9670;
                }

                .chart-wrapper ul li{
                    display:inline-block;
                    width:100px;
                    text-align:center;
                    padding:3px 20px;
                    margin: 0 10px;
                    border:1px solid #f5f5fe;
                    border-radius:4px;
                    cursor:pointer;
                }

                .chart-wrapper ul li:hover{
                    border:1px solid #0F9670;
                }

                .chart-wrapper ul li.menu-opt{
                    border: 1px solid #0F9670;
                }
               
                
            `}</style>
        </Fragment>
    )
}

export default Dashboard;