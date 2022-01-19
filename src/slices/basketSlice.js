import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        // Actions
        addToBasket: (state, action) => {
            state.items = [...state.items, action.payload]
        },
        removeFromBasket: (state, action) => {
            const { id } = action.payload
            const index = state.items.findIndex((item) => item.id === id)

            let newBasket = [...state.items]

            if (index >= 0) {
                newBasket.splice(index, 1)
                state.items = newBasket
            } else {
                console.error(
                    `Cant remove product {id: ${id} as item not in exists}`
                )
            }
        },
    },
})

export const { addToBasket, removeFromBasket } = basketSlice.actions

// Selectors - This is how we pull infomation from the Global store slice
export const selectItems = (state) => {
    //console.log(state)
    // basket: store -> reducer -> basket
    return state.basket.items
}

export const selectTotal = (state) => {
    const { items } = state.basket
    return items.reduce((total, item) => total + item.price, 0)
}

export default basketSlice.reducer
