import React, {useState,useEffect} from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import {Link, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';

import {getUserReservations} from "../actions/data.js";




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
        <ul>
        {userRecipes.map((reservation, index) => <li key={index}>Data : {reservation.date._i} Nr. miejsca : {reservation.place} </li>)}
       </ul>

        
       
          

        
        <strong>Uprawnienia:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
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