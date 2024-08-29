import { createSlice } from '@reduxjs/toolkit';

const modeloPadrao = {
    id: 1,
    nome: "padrao",
    aluno: null,
    perguntas: [
        { pergunta: "pergunta 1?", resposta: "" },
        { pergunta: "pergunta 2?", resposta: "" },
        { pergunta: "pergunta 3?", resposta: "" },
        { pergunta: "pergunta 4?", resposta: "" }
    ]
};

export const slice = createSlice({
    name: "modelo",
    initialState: {
        modelos: [modeloPadrao]
    },
    reducers: {
        addModelo(state, action) {
            state.modelos.push(action.payload);
        }
    }
});

export const { addModelo } = slice.actions;
export const modelsReducer = slice.reducer;
