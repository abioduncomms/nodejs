import React,{Fragment,useState} from 'react'

function Accordion({title, children}) {

    const [state,setState] = useState(false)

    const toggle = ()=>{
        if(state){
            setState(false)
        }else{
            setState(true)
        }
    }
    return (
        <div className="wrapper">
            <p className="accord"><b>{title}</b><img className="right accordion-indicator" onClick={toggle} src={state ? '/image/icon/minus.svg':'/image/icon/plus.svg'}/></p>
            <div className={state ? 'show':'hide' }>
                {children}
            </div>

            <style jsx>{`
                .show{
                    height:auto;
                }

                .hide{
                    display:none;
                    overflow:hidden;
                }

                .wrapper{
                    margin-top:30px;
                }
                .accord{
                    line-height:.5;
                }
                .accordion-indicator{
                    font-size:1.1em;
                    padding:0 10px;
                    cursor:pointer;
                    vertical-align:middle;
                }


                `}</style>
        </div>
    )
}

export default Accordion
