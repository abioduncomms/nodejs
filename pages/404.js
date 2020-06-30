import React from 'react'
import Layout from '../components/layout/auth/AuthLayout'
import Link from 'next/link'

export default()=>{
    return (
        <Layout>
            <h4>Page Not Found</h4>
            <p>This may be because you entered the wrong URL or because the page have been removed.
                <br /> <Link href="/"><a>Click here to go back to the homepage</a></Link>
            </p>
        </Layout>
    )
}

