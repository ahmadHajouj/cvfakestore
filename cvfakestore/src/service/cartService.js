import http from "./httpService";

const apiEndpoint = "/cart";

export function getFromCart(){
    return http.get(apiEndpoint);
}

export function getItemFromCart(obj){
    return http.get(`${apiEndpoint}/${obj._id}`);
}

export function addToCart(obj){
    return http.post(apiEndpoint, obj);
}

export function removeFromCart(obj){
    return http.delete(`${apiEndpoint}/${obj._id}`)
}