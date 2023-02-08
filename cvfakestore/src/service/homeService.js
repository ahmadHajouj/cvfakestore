import http from "./httpService";

const apiEndpoint = '/home'


export function getElements(){
    return http.get(apiEndpoint);
}


export function setElement(obj){
    if(obj._id){
        const body = { ...obj };
        delete body._id;
        return http.put(`${apiEndpoint}/${obj._id}`, body)
    }

    return http.post(apiEndpoint, obj);

}