import React from 'react'
import cartItems from './data'
import reducer from './reducer'
import { ACTIONS } from './action';
import { getTotal } from './utils';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project';

const AppContext = React.createContext();

const initialState= {
  cart: [],
  isLoading: false,
  isError: false,
}

const AppProvider = ({ children }) => {
  const [ state, dispatch ] = React.useReducer(reducer, initialState);

  const { totalAmount, totalCost } = getTotal(state.cart);
  
  const clearCart = () => {
    dispatch({type: ACTIONS.CLEAR_CART})
  }

  const removeItem = (id) => {
    dispatch({type: ACTIONS.REMOVE, payload: { id }})
  }

  const increaseAmount = (id) => {
    dispatch({type: ACTIONS.INCREASE, payload: {id}})
  }

  const decreaseAmount = (id) => {
    dispatch({type: ACTIONS.DECREASE, payload: {id}})
  }

  const fetchData = async() => {
    dispatch({type: ACTIONS.LOADING})
    const response = await fetch(url);

    if(response.ok){
      const responseInJson = await response.json();
      dispatch({type: ACTIONS.DISPLAY_ITEMS, payload: {cart: responseInJson.map(item => [item.id, item])}})
    }else{
      dispatch({ type: ACTIONS.ERROR})
    }
  }
  React.useEffect(() => {
    fetchData()
  },[])

  const value = {...state, 
    clearCart, 
    removeItem, 
    increaseAmount, 
    decreaseAmount, 
    totalCost, 
    totalAmount
  }
  return (
    <AppContext.Provider
      value={value}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return React.useContext(AppContext)
}

export { AppContext, AppProvider }
