import { ACTIONS } from "./action";


const reducer = (state, action) => {
    switch(action.type){
        case ACTIONS.CLEAR_CART:
            return {...state, cart: new Map()};

        case ACTIONS.REMOVE:
            const newCart = new Map(state.cart.entries());
            newCart.delete(action.payload.id);
            return { ...state, cart: newCart};

        case ACTIONS.INCREASE:
            const newCarts = new Map(state.cart.entries());
            const itemID = action.payload.id;
            const item = newCarts.get(itemID);
            const newItem = {...item, amount: item.amount + 1 }
            newCarts.set(itemID, newItem)
            return { ...state, cart: newCarts}

        case ACTIONS.DECREASE:
            const newCar = new Map(state.cart.entries());
            const itemId = action.payload.id;
            const itemN = newCar.get(itemId);
            if(itemN.amount === 1){
                newCar.delete(itemId);
                return {...state, cart : newCar}
            }
            const newItemReduced = {...itemN, amount: itemN.amount - 1 }
            newCar.set(itemId, newItemReduced)
            return { ...state, cart: newCar}

        case ACTIONS.DISPLAY_ITEMS:
            const newCartContent = new Map(action.payload.cart)
            return {...state, cart: newCartContent, isLoading: false}

        case ACTIONS.LOADING:
            return {...state, isLoading: true}
        
        case ACTIONS.ERROR:
            return { ...state, isLoading: false, isError: true}

      default:
        throw new Error(`No matching type to:  ${action.type}`)
    }
}

export default reducer;