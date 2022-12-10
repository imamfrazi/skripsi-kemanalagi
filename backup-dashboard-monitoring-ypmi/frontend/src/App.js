import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Main from "./layout/Main";
import Login from "./pages/Login";
import Home from "./pages/Home";
import History from "./pages/History";
import Inspection from "./pages/Inspection";
import InspectionPreparingRobot from "./pages/InspectionPreparingRobot";
import InspectionProduct from "./pages/InspectionProduct";
import InspectionLoading from "./pages/InspectionLoading";
import InspectionFinished from "./pages/InspectionFinished";
import Setting from "./pages/Setting";
import "./App.css";
import "./style.scss";
import AutoDeleteTimer from "./components/AutoDeteleTimer";

//Utils
import {setLocalStorage, getLocalStorage} from "./utils/localStorage"

function App() {
  const navigate = useNavigate()
  const [openAutoDelete, setOpenAutoDelete] = useState(false)
  const [connected, setConnected] = useState(false);
  const [scanQR, setScanQR] = useState({});
  const [scanImage, setScanImage] = useState(true);
  const socket = io(process.env.REACT_APP_SERVER_URL);

  const handleStopTimer = () =>{
    setOpenAutoDelete(false)
  }
  // const startToCheck = (qrCode, userId) => {
  //   setScanImage(true)
  //   addCheckImageSocket(qrCode, userId);
  //   sendToCheck(true, null);
  // };

  // const sendToCheck = (state, totalInit, qrCode, userId) => {
  //   socket.emit("scan_img_dir", {
  //     state,
  //     totalInit,
  //     qrCode: qrCode,
  //     userId: userId
  //   });
  // };

  // const addCheckImageSocket = (qrCode, userId) => {
  //   socket.on("scan_img_dir", (msg) => {
  //     if (msg.state === true) {
  //       // console.log("check image true: ", msg.message);
  //       sendToCheck(true, msg.data.totalInit, qrCode, userId);
  //     } else if (msg.state === false) {
  //       if (msg.error) {
  //         console.log("error: ", msg.error);
  //       }
  //       setScanImage(false)
  //       // console.log("check image stopped: ", msg.message);
  //     }
  //   });
  // };


  useEffect(() => {
    // socket.on("connect", () => console.log("server connected: ", socket.id));
    // socket.on("disconnect", () => console.log("server disconnected"));
    beforeLogin()
    // checkScanQR()
    // setTimeout(() => {
    //   setOpenAutoDelete(true)
    // }, 2000);
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("server connected: ", socket.id);
      setConnected(true);
    });
    socket.on("disconnect", () => {
      console.log("server disconnected");
      setConnected(false);
    });
    
    socket.on("backup_notification",(msg)=>{
      console.log(msg)
      if(msg.message == "Data will be deleted one hour from now"){
        if(!getLocalStorage("autoDeleteTimer")){
          setLocalStorage("autoDeleteTimer", {datetime: new Date()})
        }
        setOpenAutoDelete(true)
        socket.off("backup_notification")
      }
    })

    // socket.on("scan_qr_code", async(msg) => {
    //   console.log("scan qr code: ", msg);
    //   setScanQR({})
    //   await setScanQR(msg)
    // });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("scan_img_dir");
      socket.off("scan_img_save");
      socket.off("backup_notification");
    }; // eslint-disable-next-line
  }, []);


  const beforeLogin = ()=>{
    try {
      let user = null
      user = JSON.parse(localStorage.getItem('user'))
      if(user.accessToken){
        navigate('/')
      }else{
        navigate('/login')
      }
    } catch (error) {
      navigate('/login')
    }
  }

  function RequireAuth({children}) {
    try {
      let user = null
      user = JSON.parse(localStorage.getItem('user'))
      if(user.accessToken){
        return children
      }else{
        navigate('/login')
      }
    } catch (error) {
      navigate('/login')
    }
  }
  return (
    <>
      {
        openAutoDelete ?
          <AutoDeleteTimer handlestoptimer={handleStopTimer}/>
        :
          null
      }
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/inspection" element={<RequireAuth><Inspection /></RequireAuth>} />
        <Route path="/inspection/preparing/robot" element={<RequireAuth><InspectionPreparingRobot /></RequireAuth>} />
        <Route path="/inspection/scan/product" element={<RequireAuth><InspectionProduct /></RequireAuth>} />
        <Route path="/inspection/scan/loading" element={<RequireAuth><InspectionLoading /></RequireAuth>} />
        <Route path="/inspection/scan/finished" element={<RequireAuth><InspectionFinished /></RequireAuth>} />
        <Route element={<Main openAutoDelete={openAutoDelete} />} >
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/about" element={<RequireAuth><History /></RequireAuth>} />
          <Route path="/setting" element={<RequireAuth><Setting /></RequireAuth>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
