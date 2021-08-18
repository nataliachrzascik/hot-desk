import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import logged from "../css/logged.css";
import img from "../images/2pietrov2.png";
import img1 from "../images/2pietro.jpg";
import store from "../../store";
import {history} from "../../helpers/history";

import { connect } from "react-redux";
import  {seeData}  from "../../actions/data.js";



const Wroclaw2 = (props) => {

    const [succes, setSucces] = useState(false);

    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");

useEffect(() => {
    console.log("link")
  
    let href=window.location.href.substr(31,window.location.href.length)
    console.log(href)
    if(href.indexOf('/')===-1){
        setYear("");
        setMonth("");
        setDay("");
    }
    else{
    let tempDate=history.location.pathname;
    let temp=tempDate.substr(19,tempDate.length)
    
    
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
        //alert(`Wybrałeś/łaś stanowisko nr. ${number}`)
       let temp=window.location.href+'/'+number;
       alert(temp)
       seeData(temp)

    }
    const myStore = store.getState();

    return (
        <>
        <div className="menuHours">
        </div>
            <div id="mainContentContener">
                <div class="floorData"><h1 className="floorName">Wrocław zespół 1 <span> Data: {day?day:"Wybierz datę"} {month} {year}</span></h1></div>
                
                {/*
                area id bedzie odpowiadała w bazie danych placeNumber.idString, kalendarz bedzie przesyłał zapytania o zajęte biurka w wybranym dniu o wybranej godzinie,
                prześle odpowiedź które sa zajęte,a na froncie zostaną one zamalowane na czerwono

                dopiero po przesłaniu odpowiedzi z backendu dot terminu pojawia się mapa z naniesionymi kolorami
                */}
             
<img name="n2pietro" src={img1} border="0" width="1500px" height="700px" id="n2pietro"  alt="" />
<div id="1" className="table Place1Wro2" onClick={()=>chooseDesk(1)}/>
<div id="2" className="table Place2Wro2" onClick={()=>chooseDesk(2)}/>
<div id="3" className="table Place3Wro2" onClick={()=>chooseDesk(3)}/>
<div id="4" className="table Place4Wro2" onClick={()=>chooseDesk(4)}/>
<div id="5" className="table Place5Wro2" onClick={()=>chooseDesk(5)}/>
<div id="6" className="table Place6Wro2" onClick={()=>chooseDesk(6)}/>

<div id="7" className="room Place7Wro2" onClick={()=>chooseDesk(7)}/>

            </div>
            </>
           


    );

};


export default Wroclaw2;
