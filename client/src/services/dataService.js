import axios from "axios";

const API_URL = "/mainPage";
const API_URL_User_reservation = "/user";
const decline_reservation = "/decline";
//http://localhost:8080

class DataService {
    seeData(url) {
      return axios.post(API_URL + url);
    }
    makeReservation(data) {
      return axios.post( data);
    }
    getUserReservations(data){
      return axios.post(API_URL_User_reservation + data)
    }
    declineReservations(data){
      return axios.post(decline_reservation + data)
    }
  }
 
  
  export default new DataService();