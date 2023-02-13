import http from "./httpService";

const apiEndpoint = '/items'

export function getItem(){
    return http.get(apiEndpoint);
}

export function postItem(item){
    return http.post(apiEndpoint, item);
}

export function addInfo(item, info){
    return http.put(`${apiEndpoint}/${item._id}`,info);
}

export function getOneItem(item){
    return http.get(`${apiEndpoint}/${item._id}`);
}