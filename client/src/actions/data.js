import {
    SEE_DATA,
    SEE_DATA_FAIL,
    SET_MESSAGE,
    MAKE_RESERVATION,
    MAKE_RESERVATION_FAIL,
    GET_RESERVATION_4_USER,
    GET_RESERVATION_4_USER_FAIL,
    DECLINE_RESERVATION,
    DECLINE_RESERVATION_FAIL
    
  } from "./types";
  import DataService from "../services/dataService.js";

  export const seeData = (data) => (dispatch)=> {
    return DataService.seeData(data).then(
      (response)=>{
        dispatch({
          type: SEE_DATA,
          payload: data
        });
        dispatch({
          type: SET_MESSAGE,
          payload: "Dane daty pobrane"
        });

        return Promise.resolve(response);
      },
      (error)=>{
        console.log("error in actions")
        dispatch({
          type: SEE_DATA_FAIL,
          payload:error
        });
        return Promise.reject();
      }
    )
  }

  export const makeReservation=(data)=>(dispatch)=>{
    
    return DataService.makeReservation(data).then(
      
      (response)=>{
        dispatch({
          type:MAKE_RESERVATION,
          payload:data
        });
        dispatch({
          type:SET_MESSAGE,
          payload:"Rezerwacja poprawnie dodana"
        });
        return Promise.resolve(response);
        
      },
      (error)=>{
        console.log("error in actions")
        dispatch({
          type: MAKE_RESERVATION_FAIL,
          payload:error
        });
        return Promise.reject();
      }
    )
  }


  export const getUserReservations=(data)=>(dispatch)=>{
    
    return DataService.getUserReservations(data).then(
    
      (response)=>{
        dispatch({
          type:GET_RESERVATION_4_USER,
          payload:data
        });
        dispatch({
          type:SET_MESSAGE,
          payload:"Poprawnie pobrane rezerwacje użytkownika"
        });
        return Promise.resolve(response);
        
      },
      (error)=>{
        console.log("error in actions")
        dispatch({
          type: GET_RESERVATION_4_USER_FAIL,
          payload:error
        });
        return Promise.reject();
      }
    )
  }

  export const declineReservations=(data)=>(dispatch)=>{
    
    return DataService.declineReservations(data).then(
    
      (response)=>{
        dispatch({
          type:DECLINE_RESERVATION,
          payload:data
        });
        dispatch({
          type:SET_MESSAGE,
          payload:"Poprawnie usunięta rezerwacja"
        });
        return Promise.resolve(response);
        
      },
      (error)=>{
        console.log("error in actions")
        dispatch({
          type: DECLINE_RESERVATION_FAIL,
          payload:error
        });
        return Promise.reject();
      }
    )
  }


