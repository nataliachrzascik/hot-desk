import React, {useState,useEffect} from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import {Link, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from '@material-ui/core/Button';

import {getUserReservations} from "../actions/data.js";
import {declineReservations} from "../actions/data.js";




const Profile =(props)=> {

  

  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
const nick=currentUser.username;

props.dispatch(getUserReservations(`/${currentUser.username}`))
.then((res)=>{
setUserRecipes(res.data[0].reservations)
})
.catch((er)=>{
  console.log(er)
})

  },[]);

  const deleteReservation=(name,date,place,idUser,index)=>{


props.dispatch(declineReservations(`/${name}/${date}/${place}/${idUser}`))
.then((res)=>{

  document.getElementById(index).style.display="none";
 

})
.catch((er)=>{
  console.log(er)
})
  }


    const { user: currentUser } = props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    const { message } = props;

    return (
      
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>Profil {currentUser.username}</strong>
          </h3>
        </header>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong>Imię:</strong> {currentUser.name}
        </p>
        <p>
          <strong>Nazwisko:</strong> {currentUser.surname}
        </p>
        <p>
          <strong>Zespół:</strong> {currentUser.team}
        </p>

        <strong>Rezerwacje:</strong>
        
        {userRecipes.map((reservation, index) => <div id={index} key={index}>Data : {reservation.date._i} Nr. miejsca : {reservation.place} <Button className="clear" onClick={()=> deleteReservation(currentUser.username,reservation.date._i,reservation.place,currentUser.id,index)}>X</Button></div>)}
       


        
       
        </div>
       
       
      

      
    );
    
  }


function mapStateToProps(state) {
  const { user } = state.auth;
  const { message } = state.message;
  return {
    user,
    message
  };
}

export default connect(mapStateToProps)(Profile);