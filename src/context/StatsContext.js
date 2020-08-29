import createDataContext from './createDataContext';

const statsReducer = (state, action) => {
    switch(action.type) {
        case "player_one_win":
            return {...state, firstPlayerWins: action.payload.playerOneWin, rounds: action.payload.rounds }
        case 'player_two_win':
            return {...state, secondPlayerWins: action.payload.playerTwoWin, rounds: action.payload.rounds }
        case 'change_round':
            return {...state, rounds: action.payload}
        case 'reset_stats':
            return {...state, firstPlayerWins: 0 ,secondPlayerWins: 0, rounds: 0 , reset: true}
        case 'set_reset':
            return {...state, reset: false }
        default:
            return state;
    }
};

const playerOneWins = dispatch => (playerOneWin, rounds) => {
    dispatch({ type: 'player_one_win', payload: { playerOneWin, rounds }});
}

const playerTwoWins = dispatch => (playerTwoWin, rounds) => {
    dispatch({ type: 'player_two_win' , payload: { playerTwoWin, rounds }});
}

const changeRound = dispatch => (nextRound) => {
    dispatch({ type: 'change_round', payload: nextRound });
}

const resetStats = dispatch => () => {
    dispatch({ type: 'reset_stats' });
}

const setReset = dispatch => () => {
    dispatch({ type: 'set_reset' });
}


export const { Context, Provider } = createDataContext(
    statsReducer,
    { playerOneWins, playerTwoWins, changeRound, resetStats, setReset},
    { firstPlayerWins: 0, secondPlayerWins: 0, rounds: 0 , reset: false}
);