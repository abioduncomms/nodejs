import React, {Fragment, useState, useEffect} from 'react';

const Range = ({released,expected})=>{
    
    const [value, setValue] = useState({
        width:0,
        left:0
    });

    const calculate = ()=>{
        const perc = Math.ceil(released * 100/expected);
        setValue({...value, width:perc, left: perc-1});
    }

    const  numberWithCommas = (x)=>{
        
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
        
    }

    useEffect(() => {
       calculate();
    }, [])

    return(
        <Fragment>
            <div className="row">
                <div className="col s12 m6 center">
                <span><b>Released<br /><span style={{color:"#0F9670"}}>N {numberWithCommas(released)}</span></b></span>
                </div>
                <div className="col s12 m6 center">
                <span><b>Expected<br /><span style={{color:"#0F9670"}}>N {numberWithCommas(expected)}</span></b></span>
                </div>
            </div>
            <div className="range-container">
            <div className="range-bg">
                <div className="range-cover" style={{width:value.width+"%"}}></div>
                <div className="range-dot" style={{left:value.left+"%"}}></div>
            </div>
            </div>
            <style jsx>{`
                .range-container{
                    width: 50%;
                    margin: 0 auto;
                }
                .range-bg{
                    width: 100%;
                    height: 8px;
                    background: #C3E5DB;
                    border-radius: 20px;
                    position: relative;
                }

                .range-cover{
                    width: 0%;
                    height: inherit;
                    background: #4BB093;
                    border-radius: 20px;
                }

                .range-dot{
                    width: 30px;
                    height: 30px;
                    background-color: #ffffff;
                    border: 1px solid #4BB093;
                    border-radius: 50%;
                    position: absolute;
                    top: -10px;
                    left: 0%
                }

                col span{
                    font-size:14px;
                }
            `}</style>
        </Fragment>
    )
}

export default Range;