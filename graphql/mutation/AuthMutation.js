import gql from 'graphql-tag'


export const LOGIN_PUBLIC_USER = gql`
    mutation login(
        $email:String!,
        $password:String!
    ){
        loginPublicUser(puser:{
            email:$email,
            password:$password
        }){
            accessToken
            email
            expiresIn
            firstName
            lastName
            message
            status
        }
    }
`;

export const REGISTER_PUBLC_USER = gql`
        mutation addUser(
            $email:String!,
            $firstName:String!,
            $lastName:String!,
            $password:String!
        ){
            addPublicUser(
                puser:{
                    email:$email,
                    password:$password,
                    lastName:$lastName,
                    firstName:$firstName
                }
            ){
                message
                status
            }
        }
`;

export const ACTIVATE_PUBLIC_USER_ACCOUNT = gql`
    mutation activate(
        $code: String!
    ){
        activatePublicUserAccount(
            code:$code
        ){
            message
            status
        }
    }
`;

export const FORGOT_PASSWORD = gql`
    mutation ForgotPasswordPublicUser($email:String!){
        forgotPasswordPublicUser(email:$email){
            message
            status
        }
    }
`;