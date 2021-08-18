import {
    SEE_DATA,
    SEE_DATA_FAIL,
    MAKE_RESERVATION,
    MAKE_RESERVATION_FAIL,
    GET_RESERVATION_4_USER,
    GET_RESERVATION_4_USER_FAIL
  } from "../actions/types";

  const initialState = {
    data:""
  };

  
export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case SEE_DATA:
        return { 
          ...state,
          data: "ok",
        };
      case SEE_DATA_FAIL:
        return { 
          ...state,
          data: "error",
        };
      case MAKE_RESERVATION:
        return { 
          ...state,
          data: "reservation ok",
        }; 
      case MAKE_RESERVATION_FAIL:
        return { 
          ...state,
          data: "reservation fail",
        };
        case GET_RESERVATION_4_USER:
        return { 
            ...state,
            data: "get user reservations ok",
          };
          case GET_RESERVATION_4_USER_FAIL:
        return { 
              ...state,
              data: "get user reservations fail",
            };
  
      default:
        return state;
    }
  }