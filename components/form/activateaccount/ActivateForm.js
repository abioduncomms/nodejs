import {Fragment,useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ACTIVATE_PUBLIC_USER_ACCOUNT } from '../../../graphql/mutation/AuthMutation';
import { toast } from 'react-toastify';
import Link from 'next/link'

const ActivateForm = (props)=>{

    const [activate, {loading,data}] = useMutation(ACTIVATE_PUBLIC_USER_ACCOUNT,{
        onCompleted(result){
          
            if(result.activatePublicUserAccount.status){
                toast.success(result.activatePublicUserAccount.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                    });
            }else{
                toast.error(result.activatePublicUserAccount.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                    });
            }
        },
        onError(error){
            console.log(error)
        }
    })

    useEffect(()=>{
        var code = new URLSearchParams(window.location.search).get("code");
        
        if(code){
            activate({variables:{code:code}})
        }
    },[])

    return (
        <>
          <div className="form-wrapper">
                <div className="row">
                <div className="col s12">
                    {
                        loading ? <p>Loading...</p>:
                        <div>
                            {
                               data && data.activatePublicUserAccount && data.activatePublicUserAccount.status ? 
                                <h5 className="green-text">{data && data.activatePublicUserAccount && data.activatePublicUserAccount.message} <Link href="/"><a>Login Now</a></Link></h5>:
                                <h5 className="red-text">{data && data.activatePublicUserAccount && data.activatePublicUserAccount.message}</h5>
                            }
                        </div>
                    }
                    
                    </div>
                </div>
            </div>

            <style jsx>{`
                            

                .form-title{
                    font-weight: 600;
                    font-size: 1.2em;
                }

                .col{
                    padding: 0 !important;
                }
           
               
            `}</style>
            </>
      
    )
}


export default ActivateForm