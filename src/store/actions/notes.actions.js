export const addNote = (message) => {
  return (dispatch) => {
    if (message) {
      dispatch({ type: 'ADD_NOTE', payload: message });
    } else {
      dispatch({ type: 'CATCH_ERROR', payload: '' });
    }
  };
};

export const deleteNote = (index) => {
  return async (dispatch) => {
    if (index >= 0) {
      dispatch({ type: 'DELETE_NOTE', payload: index });
    } else {
      dispatch({ type: 'CATCH_ERROR', payload: '' });
    }
  };
};
