import http from "./httpService";

const apiEndpoint = "/carts";

export function getCarts(){
    return http.get(apiEndpoint);
}

export function getUserCart(obj){
    return http.post(`${apiEndpoint}/one`, obj);
}

export function makeCart(obj){
    return http.post(apiEndpoint, obj);
}

export function addToCart(obj){
    return http.post(`${apiEndpoint}/addone`, obj);
}

export function removeFromCart(obj){
    return http.post(`${apiEndpoint}/removeone`, obj);
}

export function removeCart(obj){
    return http.delete(`${apiEndpoint}/${obj._id}`)
}

export function updateCart(obj){
    if(obj._id){
        const body = { ...obj };
        delete body._id;
        return http.put(`${apiEndpoint}/${obj._id}`, body)
    }
    return http.post(apiEndpoint, obj);
}