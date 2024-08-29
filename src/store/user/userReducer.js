import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'user',
    initialState: {
        students: [],
        anamneses: {},
    },
    reducers: {
        addUser: (state, action) => {
            const existingUserIndex = state.students.findIndex(student => student.email === action.payload.email);
            if (existingUserIndex !== -1) {
                state.students[existingUserIndex] = action.payload;
            } else {
                state.students.push(action.payload);
                state.anamneses[action.payload.nome] = 0;
            }
        },
        incrementAnamneses: (state, action) => {
            const {nome} = action.payload;
            if (state.anamneses[nome] !== undefined) {
                state.anamneses[nome] += 1;
            }
        },

        deleteUser: (state, action) => {
            state.students = state.students.filter(student => student.email !== action.payload);
            console.log(state.students)
        },
    },
});

export const {addUser, incrementAnamneses, deleteUser} = slice.actions;

export const userReducer = slice.reducer;
