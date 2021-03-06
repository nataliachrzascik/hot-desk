import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import logged from "./css/logged.css";

import { history } from "../helpers/history";

import store from "../store";
import Wroclaw2 from "./offices/Wroclaw2";

import { connect } from "react-redux";
import  {seeData} from "../actions/data.js";
import Button from '@material-ui/core/Button';


import {
    DayPickerRangeController,
    DayPickerSingleDateController
  } from "react-dates";
  import 'react-dates/initialize';
  import 'react-dates/lib/css/_datepicker.css';
  import moment from "moment";
import Choose from './offices/Choose';
import Zespol1 from './offices/Zespol1';
import ChooseTime from './offices/ChooseTime';



const LoggedIn = (props) => {

  
    const [year, setYear] = useState(undefined);
    const [month, setMonth] = useState(undefined);
    const [day, setDay] = useState(undefined);
    const [hour, setHour] = useState(undefined);

    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(moment());
    const [focusedInput, setFocusedInput] = useState(null);

    const [date, setDate] = useState("");

    const [finalDate, setFinalDate] = useState(false);


  
    


    const newFunction=date=>{

      props
      .dispatch(
        seeData(`/mainPage/zespol1/wroclaw2/${date.format("YYYY")}${date.format("MM")}${date.format("DD")}`)
        )
        .then((res)=>{
          let temp=[];
          
          res.data.forEach((e)=>{
           temp.push(e.placeNumber)
          })
          

          setFinalDate(true)
        

          
          history.push(`/mainPage/zespol1/${date.format("YYYY")}${date.format("MM")}${date.format("DD")}`);
          

        })
        .catch(()=>{
          console.log("nie sukces")
        })


    }


    const onDateChange = date => {
        setDate(date)

        setYear(date.format("YYYY"));
        setMonth(date.format("MM"));
        setDay(date.format("DD"));

        setFinalDate(true);
        history.push(`/mainPage/zespol1/${date.format("YYYY")}${date.format("MM")}${date.format("DD")}`);

  

      };

        

      const onFocusChange = () => {
        setFocusedInput(true)
      };
      const focusedInputFunction = focused => {
        focusedInput(focused)
      };
   


    const changeWroclaw=()=>{
        let elements=document.getElementsByClassName("Wroc??aw");
        [...elements].forEach(element => {
            if(element.classList.contains("hidden")){
             element.classList.remove("hidden");
             element.classList.add("visible");
            }
            else if(element.classList.contains("visible")){
             element.classList.remove("visible");
             element.classList.add("hidden");
            }
         
        });
       
    }
    const changeWarszawa=()=>{
       let elements=document.getElementsByClassName("Warszawa");
       [...elements].forEach(element => {
           if(element.classList.contains("hidden")){
            element.classList.remove("hidden");
            element.classList.add("visible");
           }
           else if(element.classList.contains("visible")){
            element.classList.remove("visible");
            element.classList.add("hidden");
           }
        
       });

     }
     const changeKrakow=()=>{
        let elements=document.getElementsByClassName("Krak??w");
        [...elements].forEach(element => {
            if(element.classList.contains("hidden")){
             element.classList.remove("hidden");
             element.classList.add("visible");
            }
            else if(element.classList.contains("visible")){
             element.classList.remove("visible");
             element.classList.add("hidden");
            }
         
        });
       
     }
     const changeGliwice=()=>{
        let elements=document.getElementsByClassName("Gliwice");
        [...elements].forEach(element => {
            if(element.classList.contains("hidden")){
             element.classList.remove("hidden");
             element.classList.add("visible");
            }
            else if(element.classList.contains("visible")){
             element.classList.remove("visible");
             element.classList.add("hidden");
            }
         
        });
       
     }

    const myStore = store.getState();

    const nameTeam=myStore.auth.user.team;

    


    return (
        
<div id="MainContainer">
            <div id='menu'>

            <form>

  <div class="break" />
  
  <DayPickerSingleDateController
          onDateChange={onDateChange}
          onFocusChange={onFocusChange}
          focused={focusedInput}
          date={date}
        />

    <span class="validity"></span>

</form>


             
                    <div className="nameCity wroclaw" onClick={changeWroclaw}>WROC??AW</div>
                    <NavLink to="/mainPage/zespol1" ><Button variant="contained" className={`nameCity`} onClick={()=>setFinalDate(false)}>WROC??AW ZESP???? NR.1</Button></NavLink>

                    {/*
                    <NavLink to="/mainPage/Wroclaw7"><div className={`nameCity Wroc??aw ${nameCity==="Wroc??aw"?"visible":"hidden"}`}>Wroc??aw pi??tro 7</div></NavLink>
                    <NavLink to="/mainPage/Wroclaw11"><div className={`nameCity Wroc??aw ${nameCity==="Wroc??aw"?"visible":"hidden"}`}>Wroc??aw pi??tro 11</div></NavLink>
                    */}

                {/*
                    <div className="nameCity" onClick={changeWarszawa}>Warszawa</div>
                    <NavLink to="/mainPage/Warszawa1"><div className={`nameCity Warszawa ${nameCity==="Warszawa"?"visible":"hidden"}`}>Warszawa pi??tro 1</div></NavLink>
                    
                    <div className="nameCity" onClick={changeKrakow}>Krak??w</div>
                    <NavLink to="/mainPage/Krakow1"><div className={`nameCity Krak??w ${nameCity==="Krak??w"?"visible":"hidden"}`}>Krak??w pi??tro 1</div></NavLink>
                    

              
                    <div class="nameCity" onClick={changeGliwice}>Gliwice</div>
                    <NavLink to="/mainPage/Gliwice1"><div className={`nameCity Gliwice ${nameCity==="Gliwice"?"visible":"hidden"}`}>Gliwice pi??tro 1</div></NavLink>
                */}



            </div>
            <div id="mainContentContener">
            <Route path="/mainPage/choose" component={Choose} />
            
           {finalDate?<Zespol1 date={date} />:<h1 class="chooseDate">Wybierz Dat??</h1>}
            </div>


 </div>

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


export default connect(mapStateToProps)(LoggedIn);
