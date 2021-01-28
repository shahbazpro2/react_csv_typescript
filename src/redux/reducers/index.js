import * as actions from '../actions/actionTypes';


const initialState = {
    user: {},
    allUsersData:{}
  };
  
  const user = (state = initialState, action) => {
    switch (action.type) {
      case actions.SET_CURRENT_USER:
        return {
          ...state,
          user:action.payload
        }
        case actions.ALL_USERS_DATA:
            return{
                ...state,
                allUsersData:action.payload
            }
        case action.LOGOUT_CURRENT_USER:
            return {
              user: initialState,
            }

      default:
        return state;
    }
  }

export default user;