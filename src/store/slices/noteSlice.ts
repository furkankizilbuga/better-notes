import type { NoteResponse } from "@/types/note";
import { createSlice } from "@reduxjs/toolkit";

type TInitialState = {
    notePayloadGlobal: NoteResponse | null
}

const initialState: TInitialState = {
    notePayloadGlobal: null
}

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        setNotePayloadGlobal: ((state, action) => {
            state.notePayloadGlobal = action.payload;
        })
    }
})

export const { setNotePayloadGlobal } = noteSlice.actions;