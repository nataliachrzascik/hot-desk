import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import logged from "../css/logged.css";
import img from "../images/2pietrov2.png";
import img1 from "../images/2pietro.jpg";
import img2 from "../images/rzuut1.png";
import store from "../../store";
import {history} from "../../helpers/history";

import { connect } from "react-redux";

import {makeReservation} from "../../actions/data.js";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import  {seeData} from "../../actions/data.js";




const Zespol1 = (props) => {


    let date=props.date;

    const [succes, setSucces] = useState(false);
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");

    const [tableNumber, setTableNumber] = useState("");



    const myStore = store.getState();

    const userID=myStore.auth.user.id;

    

    useEffect(() => {

      document.getElementById('placeContainer').style.visibility = "hidden";
  
     
      props
        .dispatch(
          seeData(`/mainPage/zespol1/wroclaw2/${date.format("YYYY")}${date.format("MM")}${date.format("DD")}`)
          )
          .then((res)=>{
            let temp=[];
            
            res.data.forEach((e)=>{
             temp.push(e.placeNumber)
            })
            
  
            
          
           document.getElementById(1).style.backgroundColor="green";
           document.getElementById(2).style.backgroundColor="green";
           document.getElementById(3).style.backgroundColor="green";
           document.getElementById(4).style.backgroundColor="green";
           document.getElementById(5).style.backgroundColor="green";
           document.getElementById(6).style.backgroundColor="green";
           document.getElementById(7).style.backgroundColor="green";
           document.getElementById(8).style.backgroundColor="green";
           document.getElementById(9).style.backgroundColor="green";
           document.getElementById(10).style.backgroundColor="green";
           document.getElementById(11).style.backgroundColor="green";
           document.getElementById(12).style.backgroundColor="green";
           document.getElementById(13).style.backgroundColor="green";
       
           document.getElementById(1).style.pointerEvents="auto";
           document.getElementById(2).style.pointerEvents="auto";
           document.getElementById(3).style.pointerEvents="auto";
           document.getElementById(4).style.pointerEvents="auto";
           document.getElementById(5).style.pointerEvents="auto";
           document.getElementById(6).style.pointerEvents="auto";
           document.getElementById(7).style.pointerEvents="auto";
           document.getElementById(8).style.pointerEvents="auto";
           document.getElementById(9).style.pointerEvents="auto";
           document.getElementById(10).style.pointerEvents="auto";
           document.getElementById(11).style.pointerEvents="auto";
           document.getElementById(12).style.pointerEvents="auto";
           document.getElementById(13).style.pointerEvents="auto";
       
           
          
       
           temp.forEach(element => {
               let el= document.getElementById(element.toString());
               el.style.backgroundColor="red";
               el.style.pointerEvents='none';
           });
           document.getElementById('placeContainer').style.visibility = "visible";
            
            
  
          })
          .catch(()=>{
            console.log("nie sukces")
          })
  
      
  
      
      
    },[date])

    
    



    const makeReservationUser=()=>{
      //po dodanie ID usera który nie istnieje apka sie przewraca
        props.dispatch(makeReservation(`/reservation/${tableNumber}/${year}${month}${day}/${userID}`))
          .then((res)=>{

            if(res==="Ktoś prawdopodobnie ubiegł Cię w rezerwacji miejsca!"){
              //to zabezpieczenie nie działa
              document.getElementById('popup').style.visibility = "hidden";
              document.getElementById(tableNumber).style.backgroundColor="red";
              document.getElementById(tableNumber).style.pointerEvents='none';
              alert("Ktoś prawdopodobnie ubiegł Cię w rezerwacji miejsca!");
              return
            }

            document.getElementById('popup').style.visibility = "hidden";

            document.getElementById(tableNumber).style.backgroundColor="red";
            document.getElementById(tableNumber).style.pointerEvents='none';

            
           
          })
          .catch((er)=>{
            console.log(er)
          })
          
    
   

    };

useEffect(() => {
  
    let href=window.location.href.substr(31,window.location.href.length)
    if(href.indexOf('/')===-1){
        setYear("");
        setMonth("");
        setDay("");
    }
    else{
    let tempDate=history.location.pathname;
    let temp=tempDate.substr(18,tempDate.length);
   let year=temp.substr(0,4);
   let month=temp.substr(4,2);
   let day=temp.substr(6,2);
    setYear(year);
    setMonth(month);
    setDay(day);
    }



  },[window.location.href]);


 

    if(props.year||props.month||props.day){
        setSucces(true)
    }

    const chooseDesk=(number)=>{
        setTableNumber(number);
        document.getElementById('popup').style.visibility = "visible";

    }

    const makeITDissapear=()=>{
        document.getElementById('popup').style.visibility = "hidden";
    }
   
 
  

    
    

    return (
        <>
        <div className="menuHours">
        </div>
            <div id="mainContentContener">
                <div class="floorData"><h1 className="floorName">WROCŁAW ZESPÓŁ NR.1 <span> DATA: {day?day:"Wybierz datę"}.{month}.{year}</span></h1></div>

               

                <img name="n2pietro" src={img2} border="0" width="1200px" height="700px" id="n2pietro"  alt="" />          
               <div id="placeContainer">
        <div id="1" className="table Place1Wro2 zespol1" onClick={()=>chooseDesk(1)}/>
        <div id="2" className="table Place2Wro2 zespol1" onClick={()=>chooseDesk(2)}/>
        <div id="3" className="table Place3Wro2 zespol1" onClick={()=>chooseDesk(3)}/>
        <div id="4" className="table Place4Wro2 zespol1" onClick={()=>chooseDesk(4)}/>
        <div id="5" className="table Place5Wro2 zespol1" onClick={()=>chooseDesk(5)}/>
        <div id="6" className="table Place6Wro2 zespol1" onClick={()=>chooseDesk(6)}/>
        <div id="7" className="table Place7Wro2 zespol1" onClick={()=>chooseDesk(7)}/>
        <div id="8" className="table Place8Wro2 zespol1" onClick={()=>chooseDesk(8)}/>
        <div id="9" className="table Place9Wro2 zespol1" onClick={()=>chooseDesk(9)}/>
        <div id="10" className="table Place10Wro2 zespol1" onClick={()=>chooseDesk(10)}/>
        <div id="11" className="table Place11Wro2 zespol1" onClick={()=>chooseDesk(11)}/>
        <div id="12" className="table Place12Wro2 zespol1" onClick={()=>chooseDesk(12)}/>
        <div id="13" className="table Place13Wro2 zespol1" onClick={()=>chooseDesk(13)}/>
        </div>


            </div>

            <Paper elevation={3} id="popup" className="visibility" >
                <Button variant="contained" style={{"float":"right"}} onClick={()=> makeITDissapear()}><span class="bolder">X</span></Button>
                <h1 class="popupText">{`Czy chcesz zarezerwować stanowisko nr. ${tableNumber} na dzień : ${day}.${month}.${year}?`}</h1>
                <Button variant="contained" style={{"marginRight":"5%"}} onClick={()=> makeReservationUser()}>Tak</Button>
                <Button variant="contained" onClick={()=> makeITDissapear()}>Nie</Button>
                </Paper>
            </>
           


    );

};
function mapStateToProps(state){
    const {message}=state.message;
    const {data}=state.data;
    return{
      message,
      data
    };
  }


export default connect(mapStateToProps)(Zespol1);
