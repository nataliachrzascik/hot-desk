import axios from "axios";

const API_URL = "http://localhost:8081/mainPage/";
const API_URL_reservation = "http://localhost:8081/";
const API_URL_User_reservation = "http://localhost:8081/user";

class DataService {
    seeData(url) {
      return axios.post(API_URL + url);
    }
    makeReservation(data) {
      return axios.post(API_URL_reservation + data);
    }
    getUserReservations(data){
      return axios.post(API_URL_User_reservation + data)
    }
  }
 
  
  export default new DataService();