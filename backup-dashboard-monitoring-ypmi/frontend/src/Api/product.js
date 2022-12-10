import { httpClientPrivate } from "./axios";
import { accessToken } from "./token"
//private
export const productSaveApi = async(body)=>{
  return await httpClientPrivate.post("/product/save", body, accessToken());
}
export const productDetailApi = async(body)=>{
  return await httpClientPrivate.post("/product/detail", body,accessToken());
}
export const productInspectionListApi = async(body)=>{
  return await httpClientPrivate.post("/product/list", body,accessToken());
}
export const productInspectionUpdateApi = async(body)=>{
  return await httpClientPrivate.post("/product/update", body,accessToken());
}
export const productHistoryApi = async(limit,page)=>{
  return await httpClientPrivate.get(`/product/history/${limit}/${page}`, accessToken());
}
export const productInspectionApi = async(productId)=>{
  return await httpClientPrivate.get(`/product/inspection/${productId}`, accessToken())
}
export const productInfoApi = async()=>{
  return await httpClientPrivate.get(`/product/info`, accessToken())
}
export const productDirectorySize = async()=>{
  return await httpClientPrivate.get(`/product/directory/size`, accessToken())
}
export const productAutoDelete = async(body)=>{
  return await httpClientPrivate.post(`/product/update/delete`, body, accessToken())
}
export const productDeleteImagesApi = async(body)=>{
  return await httpClientPrivate.post(`/product/delete/images`, body, accessToken())
}