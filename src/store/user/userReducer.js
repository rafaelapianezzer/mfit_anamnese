import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'user',
    initialState: {
        students: [],
        personalTrainers: [],  
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
        addPersonalTrainer: (state, action) => {  
            const existingTrainerIndex = state.personalTrainers.findIndex(trainer => trainer.email === action.payload.email);
            if (existingTrainerIndex !== -1) {
                state.personalTrainers[existingTrainerIndex] = action.payload;
            } else {
                state.personalTrainers.push(action.payload);
            }
        },
        incrementAnamneses: (state, action) => {
            const { nome } = action.payload;
            if (state.anamneses[nome] !== undefined) {
                state.anamneses[nome] += 1;
            }
        },
        updateUser: (state, action) => {
            const index = state.students.findIndex(user => user.email === action.payload.email);
            if (index !== -1) {
                state.students[index] = action.payload; // Atualiza o usuário existente
            }
        },
        deleteUser: (state, action) => {
            state.students = state.students.filter(student => student.email !== action.payload);
        },
        deletePersonalTrainer: (state, action) => {  
            state.personalTrainers = state.personalTrainers.filter(trainer => trainer.email !== action.payload);
        },
    },
});

export const { addUser, addPersonalTrainer, incrementAnamneses, updateUser, deleteUser, deletePersonalTrainer } = slice.actions;

export const userReducer = slice.reducer;
