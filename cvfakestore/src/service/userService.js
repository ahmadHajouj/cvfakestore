import http from "./httpService";


const apiEndpoint ='/user';


export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    username: user.username,
    password: user.password
  });
}
export function getUser(user) {
  return http.get(`${apiEndpoint}/${user._id}`);
}
