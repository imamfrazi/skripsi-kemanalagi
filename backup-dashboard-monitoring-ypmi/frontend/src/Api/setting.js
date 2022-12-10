import { httpClientPrivate } from "./axios";
import { accessToken } from "./token"
//private
export const getTimeSettingApi = async(userId)=>{
  return await httpClientPrivate.get(`/auth/user/${userId}/time`, accessToken());
}
export const timeSettingSaveApi = async(body)=>{
  return await httpClientPrivate.post(`/auth/user/time`, body, accessToken());
}