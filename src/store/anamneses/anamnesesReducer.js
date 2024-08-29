

export const addAnamnese = (anamnese) => ({
  type: 'ADD_ANAMNESE',
  payload: {
    ...anamnese,
    status: 1,
  },
});

export const removeAnamnese = (id) => ({
  type: 'REMOVE_ANAMNESE',
  payload: id,
});

export const updateAnamneseStatus = (id, status) => ({
  type: 'UPDATE_ANAMNESE_STATUS',
  payload: { id, status },
});

const initialState = {
  anamnesesList: [],
};

const anamnesesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ANAMNESE':
      return {
        ...state,
        anamnesesList: [
          ...state.anamnesesList,
          action.payload, 
        ],
      };
    case 'REMOVE_ANAMNESE':
      return {
        ...state,
        anamnesesList: state.anamnesesList.filter(
          (anamnese) => anamnese.id !== action.payload
        ),
      };
    case 'UPDATE_ANAMNESE_STATUS': 
      return {
        ...state,
        anamnesesList: state.anamnesesList.map((anamnese) =>
          anamnese.id === action.payload.id
            ? { ...anamnese, status: action.payload.status }
            : anamnese
        ),
      };
    default:
      return state;
  }
};

export default anamnesesReducer;



