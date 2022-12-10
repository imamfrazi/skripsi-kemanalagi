// export const imageURL =  (item, imagePoint="ai") =>{
//   if(item){
//     let URL = process.env.REACT_APP_SERVER_URL
//     if(imagePoint == "preview"){
//       URL = `${URL}/images/${item}`
//     }else{
//       let removeStatic = item.replace(process.env.REACT_APP_PUBLIC_BACKEND_URL, "");
//       URL = URL+removeStatic
//     }
//     return URL
//   }
// }
// for pc deploy
export const imageURL =  (item, imagePoint="ai") =>{
  if(item){
    let URL = process.env.REACT_APP_SERVER_URL
    if(imagePoint == "preview"){
      URL = `${URL}/Scan/Crack Detection/Picture/${item}`
    }else{
      let removeStatic = item.replace(process.env.REACT_APP_PUBLIC_BACKEND_URL, "");
      URL = URL+removeStatic
    }
    return URL
  }
}
