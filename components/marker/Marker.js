import { Fragment } from 'react'

const Marker = (props)=>{


    return(
        <Fragment>
        <div  className="marker" style={{backgroundColor:props.color}}>
            <p>{props.title}</p>
            <div className="marker-circle" style={{animationDelay: '0s',backgroundColor:props.color}}></div>
            <div className="marker-circle" style={{animationDelay: '1s',backgroundColor:props.color}}></div>
            <div className="marker-circle" style={{animationDelay: '2s',backgroundColor:props.color}}></div>
            <div className="marker-circle" style={{animationDelay: '3s',backgroundColor:props.color}}></div>
        </div>
            <style jsx>{`
            .marker{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #000000;
                font-weight: bold;
                font-size: 1.2em;
                position: relative;
            }

            .marker-circle {
                border-radius: 50%;
                width: 50px;
                height: 50px;
                position: absolute;
                opacity: 0;
                animation: scaleIn 4s infinite cubic-bezier(.36, .11, .89, .32);
            }

            @keyframes scaleIn {
                from {
                transform: scale(.5, .5);
                opacity: .5;
                }
                to {
                transform: scale(2.5, 2.5);
                opacity: 0;
                }
            }
            `}</style>
        </Fragment>

    )
}

export default Marker;