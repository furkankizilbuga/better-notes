import { configureStore } from '@reduxjs/toolkit'

import { noteSlice } from "./slices/noteSlice";

export const store = configureStore({
    reducer: {
        note: noteSlice.reducer
    }
})

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch