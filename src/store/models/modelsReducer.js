import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const modeloPadrao = {
    id: 1,
    nome: "padrao",
    aluno: null,
    perguntas: [
        { id: uuidv4(), pergunta: "pergunta 1?", resposta: "" },
        { id: uuidv4(), pergunta: "pergunta 2?", resposta: "" },
        { id: uuidv4(), pergunta: "pergunta 3?", resposta: "" },
        { id: uuidv4(), pergunta: "pergunta 4?", resposta: "" }
    ]
};

export const slice = createSlice({
    name: "modelo",
    initialState: {
        modelos: [modeloPadrao] // Lista de modelos, cada um com suas perguntas
    },
    reducers: {
        // Adiciona um novo modelo
        addModelo(state, action) {
            state.modelos.push(action.payload);
        },

        // Adiciona uma nova pergunta a um modelo específico
        addPergunta(state, action) {
            const { modeloId, novaPergunta } = action.payload;
            const modelo = state.modelos.find(modelo => modelo.id === modeloId);
            if (modelo) {
              modelo.perguntas.push({
                id: uuidv4(), // Gera um novo id para a pergunta
                pergunta: novaPergunta,
                resposta: "",
              });
            }
          },

        // Edita um modelo
        editModelo(state, action) {
            const { id, updatedNome, updatedPerguntas } = action.payload;
            const index = state.modelos.findIndex(modelo => modelo.id === id);
            if (index !== -1) {
                state.modelos[index].nome = updatedNome || state.modelos[index].nome;
                state.modelos[index].perguntas = updatedPerguntas || state.modelos[index].perguntas;
            }
        },

        // Remove um modelo
        removeModelo(state, action) {
            state.modelos = state.modelos.filter(modelo => modelo.id !== action.payload);
        },

        // Remove uma pergunta de um modelo específico
        deletePergunta(state, action) {
            const { modeloId, questionId } = action.payload;
            const modelo = state.modelos.find(m => m.id === modeloId);
            if (modelo) {
                modelo.perguntas = modelo.perguntas.filter(p => p.id !== questionId);
            }
        }
    }
});

export const { addModelo, editModelo, removeModelo, deletePergunta, addPergunta } = slice.actions;
export const modelsReducer = slice.reducer;
