import http from "./httpService";

const apiEndpoint = '/items'

export function getItem(){
    return http.get(apiEndpoint);
}

export function postItem(item){
    return http.post(apiEndpoint, item);
}
