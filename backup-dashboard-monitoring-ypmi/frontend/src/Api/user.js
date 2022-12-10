import { httpClient, httpClientPrivate } from "./axios";
import { accessToken } from "./token"
//public
export const signIn = async(form)=>{
  return httpClient.post("/auth/signin", form);
}
//private
export const operatorListApi = async()=>{
  return httpClientPrivate.get("/auth/user/list", accessToken());
}
export const signUpApi = async(form)=>{
  return httpClientPrivate.post("/auth/signup", form, accessToken());
}
export const deleteUserApi = async(form)=>{
  return httpClientPrivate.post("/auth/user/remove", form, accessToken());
}
export const updateUserApi = async(form)=>{
  return httpClientPrivate.post("/auth/user/update", form, accessToken());
}
export const deactivateSystemApi =  async(form) => {
  return httpClientPrivate.post('/auth/user/deactivate', form, accessToken())
}