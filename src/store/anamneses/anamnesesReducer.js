import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  anamnesesList: [],
};

const anamnesesSlice = createSlice({
  name: 'anamneses',
  initialState,
  reducers: {
    addAnamnese: (state, action) => {
      state.anamnesesList.push({ ...action.payload, status: 1 });
    },
    
    removeAnamnese: (state, action) => {
      state.anamnesesList = state.anamnesesList.filter(
        (anamnese) => anamnese.id !== action.payload
      );
    },

    updateAnamneseStatus: (state, action) => {
      const { id, status } = action.payload;
      const anamnese = state.anamnesesList.find((anamnese) => anamnese.id === id);
      if (anamnese) {
        anamnese.status = status;
      }
    },

    saveRespostas: (state, action) => {
      const { id, respostas } = action.payload;
      const anamnese = state.anamnesesList.find((anamnese) => anamnese.id === id);
      if (anamnese) {
        anamnese.perguntas = respostas; 
      }
    },

    editAnamnese: (state, action) => {
      const { id, updatedData } = action.payload;
      const anamneseIndex = state.anamnesesList.findIndex(
        (anamnese) => anamnese.id === id
      );
      if (anamneseIndex !== -1) {
        state.anamnesesList[anamneseIndex] = {
          ...state.anamnesesList[anamneseIndex],
          ...updatedData,
        };
      }
    },

    hasPendingAnamnese(state) {
      return state.anamnesesList.some(anamnese => anamnese.status === 1);
    },

    hasRespondedAnamnese(state) {
      return state.anamnesesList.some(anamnese => anamnese.status === 2);
    },
  },
});

export const selectHasPendingAnamnese = (state) => state.anamneses.anamnesesList.some(anamnese => anamnese.status === 1);

export const selectHasRespondedAnamnese = (state) => state.anamneses.anamnesesList.some(anamnese => anamnese.status === 2);

export const {
  addAnamnese,
  removeAnamnese,
  updateAnamneseStatus,
  saveRespostas,
  editAnamnese, 
  hasPendingAnamnese,
  hasRespondedAnamnese
} = anamnesesSlice.actions;


export default anamnesesSlice.reducer;
