import createDataContext from './createDataContext';

const settingsReducer = (state, action) => {
    switch(action.type) {
        case 'change_name_one':
            return {...state, nicknameOne: action.payload}
        case 'change_name_two':
            return {...state, nicknameTwo: action.payload}
        default:
            return state;
    }
};

const changeNameOne = dispatch => (name) => {
    dispatch({ type: 'change_name_one', payload: name });
}

const changeNameTwo = dispatch => (name) => {
    dispatch({ type: 'change_name_two', payload: name });
}


export const { Context, Provider } = createDataContext(
    settingsReducer,
    { changeNameOne, changeNameTwo },
    { nicknameOne: 'Player 1', nicknameTwo: 'Player 2' }
);