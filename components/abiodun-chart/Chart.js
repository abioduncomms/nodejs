import {Fragment, useEffect} from 'react';


const Chart = (props)=>{

    return(
    <Fragment>
        <div id="chart">
        <div className="bar-1"></div>
       <div className="bar-2"></div>
       <div className="bar-3"></div>
       <div className="bar-4"></div>
       <div className="bar-5"></div>
       <div className="bar-6"></div>
       <div className="bar-7"></div>
       <div className="bar-8"></div>
       <div className="bar-9"></div>
       <div className="bar-10"></div>
       <div className="bar-11"></div>
       <div className="bar-12"></div>
        </div>

        <style jsx>{`
            #chart{
                margin-top:70px;
                display:grid;
                height: 450px;
                width: 450px;
                grid-template-columns: repeat(12,1fr);
                grid-template-rows:repeat(100,1fr);
                grid-column-gap: 5px;
                padding:5px 10px;
                border-left:1px solid #eee;
                border-bottom:1px solid #eee;
            }

            [class*="bar"]{
                margin:0;
                padding:0;
                background-color:red;
                grid-row-end: 101;
            }

            [class*="bar"]:nth-child(odd) {
                background-color: #0074d9;
            }
            
            .bar-1{
                grid-row-start:81
            }
            
            .bar-2{
                grid-row-start:30
            }
            
            .bar-3{
                grid-row-start:2
            }
        `}</style>
    </Fragment>
    )
}



export default Chart;