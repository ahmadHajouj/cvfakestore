import http from "./httpService";

const apiEndpoint ='/types'

export function getTypes(){
    return http.get(apiEndpoint);
}


export function postType(id , name){
    return http.post(apiEndpoint, { id : id , name : name });

}