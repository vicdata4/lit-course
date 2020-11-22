export const notes = (state = { list: [] }, action) => {
  switch (action.type) {
    case 'ADD_NOTE': {
      return { list: [...state.list, action.payload] };
    }
    case 'GET_ALL': {
      return { list: action.payload };
    }
    case 'DELETE_NOTE': {
      const deleteNote = state.list.filter((x, i) => i !== action.payload);
      return { list: deleteNote };
    }
    case 'CATCH_ERROR': {
      const string = `error: ${action.payload.error} errorCode: ${action.payload.errorCode}`;
      // eslint-disable-next-line no-console
      console.log('****CATCHED:', string);
      break;
    }
    default:
      return state;
  }
};
