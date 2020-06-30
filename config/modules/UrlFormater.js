export const FormatUrl = (url, id)=>{
    const splitted = url.split(" ")
    const joined = splitted.join("-")+'-'+id

    return joined.toLowerCase()
}

export const decodeUrl = (str)=>{
    const arr = str.split("-")

    return arr[arr.length - 1]
}

export const formatStateUrl = (state,pid,stateId)=>{
    const splitted = state.split(" ")
    const joined = splitted.join("-")+'-'+pid+'-'+stateId

    return joined.toLowerCase()
}

export const decodeStateUrl = (str)=>{
    const arr = str.split("-")

    return [arr[arr.length - 1],arr[arr.length - 2]]
}

export const dateFormater = (str)=>{
    const arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const split = str.split("/")
   

    return split[1]+', '+arr[split[0]-1]+' '+split[2]
}