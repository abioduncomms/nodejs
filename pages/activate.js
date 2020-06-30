import React from 'react'
import {withRouter} from 'next/router'
import AuthLayout from "../components/layout/auth/AuthLayout"
import ActivateForm from '../components/form/activateaccount/ActivateForm'


const Token = (props)=>{


    return (
        <AuthLayout>
              <ActivateForm code={props.code}/>
        </AuthLayout>
    )
}

Token.getInitialProps = async(req)=>{
    const {code} = await req.query

    return{code:code}
}

export default withRouter(Token)