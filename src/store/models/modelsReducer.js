import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const modeloPadrao = {
    id: 1,
    nome: "Padrão",
    aluno: null,
    perguntas: [
        { id: uuidv4(), pergunta: "Qual é o seu objetivo?", resposta: "" },
        { id: uuidv4(), pergunta: "Pratica atividade física? Há quanto tempo e quais atividades?", resposta: "" },
        { id: uuidv4(), pergunta: "Faz quantas refeições por dia?", resposta: "" },
        { id: uuidv4(), pergunta: "Faz dieta? Acompanhada ou alguma específica?", resposta: "" },
        { id: uuidv4(), pergunta: "Faz suplementação? Se sim, quais suplementos?", resposta: "" },
        { id: uuidv4(), pergunta: "Dorme quantas horas por noite?", resposta: "" },
        { id: uuidv4(), pergunta: "Fuma? Se sim, quantos cigarros por dia?", resposta: "" },
        { id: uuidv4(), pergunta: "Consome bebidas alcoólicas? Se sim, quantas vezes por semana?", resposta: "" },
        { id: uuidv4(), pergunta: "Possui colesterol, triglicérides ou glicose altas?", resposta: "" },
        { id: uuidv4(), pergunta: "Possui alguma alteração cardiaca? Se sim, qual?", resposta: "" },
        { id: uuidv4(), pergunta: "Tem diabetes?", resposta: "" },
        { id: uuidv4(), pergunta: "É hipertenso?", resposta: "" },
        { id: uuidv4(), pergunta: "Possui problemas pulmonares? Quais?", resposta: "" },
        { id: uuidv4(), pergunta: "Toma algum medicamento controlado? Quais?", resposta: "" },
        { id: uuidv4(), pergunta: "Fez alguma cirurgia? Qual?", resposta: "" },
        { id: uuidv4(), pergunta: "Apresenta dores na coluna, articulações ou dores musculares?", resposta: "" },
        { id: uuidv4(), pergunta: "Possui algum problema ortopédico diagnosticado? Quais?", resposta: "" },
        { id: uuidv4(), pergunta: "Observações:", resposta: "" }
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
