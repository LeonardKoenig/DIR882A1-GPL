/* svn info: $Revision: 1021 $ $Date: 2018-08-10 14:15:20 +0800 (Fri, 10 Aug 2018) $ */
var Time_GetReciprocalTime,setTime,changeFlag=!1;function stopGetReciprocalTime(){}function setGetReciprocalTime(){}function confirmExit(){if(changeFlag)return!!confirm(I18N("j","There is unsaved data on this page. Do you want to abandon it?"))}var startPoint=0,actionPoint=0,timeoutCycleSec=170;function stopTimeout(){clearTimeout(setTime)}function startTimeout(){var t=(new Date).getTime();startPoint=parseInt(t/1e3,10),actionPoint=startPoint,stopTimeout(),setTime=setTimeout("calaulateTimeout()",1e3*timeoutCycleSec)}function calaulateTimeout(){if(actionPoint==startPoint)sessionStorage.removeItem("PrivateKey"),0<=location.href.indexOf("UpdateFirmware_Simple.html")?location.assign("/info/Login_Simple.html"):location.assign("/");else{var t=new SOAPAction;0<=sessionStorage.getItem("currentMode").indexOf("Router")?t.sendSOAPAction("GetSysLogSettings",null,null):t.sendSOAPAction("GetUplinkInterface",null,null);var e=(new Date).getTime();startPoint=actionPoint;var i=timeoutCycleSec-(parseInt(e/1e3,10)-actionPoint);setTime=setTimeout("calaulateTimeout()",1e3*i)}}function changeTimeoutAction(){var t=(new Date).getTime();actionPoint=parseInt(t/1e3,10)}