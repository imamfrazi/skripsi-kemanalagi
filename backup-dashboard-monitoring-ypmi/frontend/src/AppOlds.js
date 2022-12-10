import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Main from "./layout/Main";
import Login from "./pages/Login";
import Home from "./pages/Home";
import History from "./pages/History";
import Inspection from "./pages/InspectionOLD";
import Setting from "./pages/Setting";
import "./App.css";
import "./style.scss";

function App() {
  const navigate = useNavigate()
  const [connected, setConnected] = useState(false);
  const [scanQR, setScanQR] = useState({});
  const [scanImage, setScanImage] = useState(true);
  const [scanAi, setScanAi] = useState(false);
  const socket = io(process.env.REACT_APP_SERVER_URL);
  
  const checkScanQR = async() => {
    await socket.emit("scan_qr_code", "Scan QR start");
  };
  //excecute after finished exceute 8image
  const checkAI = (body) => {
    console.log("CheckAi")
    setScanAi(false)
    socket.emit("scan_ai", {
      qrCode: body.qrCode,
      userId: body.userId,
    });
  };

  const startToCheck = (qrCode, userId) => {
    console.log("start to check", userId)
    addCheckImageSocket(qrCode, userId);
    sendToCheck(true, null);
  };
  
  const stopToCheck = (qrCode, userId) => {
    console.log("stop to check", userId)
    console.log("socket stop")
    socket.emit("scan_img_save", {
      qrCode: qrCode,
      userId: userId,
    });
    socket.off("scan_img_dir");
  };
  const sendToCheck = (state, totalInit, qrCode, userId) => {
    console.log("send to check", userId)
    socket.emit("scan_img_dir", {
      state,
      totalInit,
      qrCode: qrCode,
      userId: userId
    });
  };
  
  const addCheckImageSocket = (qrCode, userId) => {
    socket.on("scan_img_dir", (msg) => {
      if (msg.state === true) {
        console.log("check image true: ", msg.message);
        sendToCheck(true, msg.data.totalInit, qrCode, userId);
      } else if (msg.state === false) {
        if (msg.error) {
          console.log("error: ", msg.error);
        }
        setScanImage(false)
        console.log("check image stopped: ", msg.message);
      }
    });
  };


  useEffect(() => {
    socket.on("connect", () => console.log("server connected: ", socket.id));
    socket.on("disconnect", () => console.log("server disconnected"));
    beforeLogin()
    checkScanQR()
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
    socket.on("scan_img_save", () => {
      console.log("save scan image");
    });
    socket.on("scan_ai", (msg) => {
      console.log("scan ai: ", msg);
      setScanAi(true)
    });
    socket.on("scan_qr_code", async(msg) => {
      console.log("scan qr code: ", msg);
      setScanQR({})
      await setScanQR(msg)
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("scan_img_dir");
      socket.off("scan_img_save");
      socket.off("scan_img_dir");
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
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/inspection" element={<RequireAuth><Inspection handleCheckQR={checkScanQR} handleCheckImage={startToCheck} handleStopCheckImage={stopToCheck} handleScanAIJudgment={checkAI} callbackScanAi={scanAi} callbackScanImage={scanImage} callbackScanQR={scanQR} /></RequireAuth>} />
        <Route element={<Main />} >
          <Route path="/" element={<RequireAuth><Home handleCheckQR={checkScanQR} callbackScanQR={scanQR} /></RequireAuth>} />
          <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/about" element={<RequireAuth><History /></RequireAuth>} />
          <Route path="/setting" element={<RequireAuth><Setting /></RequireAuth>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
