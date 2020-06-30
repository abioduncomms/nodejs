import {createContext, useReducer} from 'react'
import {useRouter} from 'next/router'

const initialState = {
    user:null
}




export const UserContext = createContext({
    user:null,
    login:(userData) =>{},
    logout:()=>{}
});

const reducer = (state,action)=>{
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user:action.payload
                }
                

        case 'LOGOUT':
            return{
                ...state,
                user:null
            }

        default:
            return state
    }
}


export const AuthProvider = (props)=>{
    const [state,dispatch] = useReducer(reducer, initialState)
    const router = useRouter();

    const login = (userData)=>{
        const data = {
            accessToken:userData.accessToken,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email:userData.email
        }
        localStorage.setItem('pubsiwp', JSON.stringify(data));
        dispatch({
            type:'LOGIN',
            payload:data
        })
    }

    const logout = ()=>{
        localStorage.removeItem('pubsiwp');
        dispatch({
            type:'LOGOUT'
        })
        router.push('/');
    }
    

    return(
        <UserContext.Provider value={{user:state.user, login, logout}}
        {...props} />
    )
}