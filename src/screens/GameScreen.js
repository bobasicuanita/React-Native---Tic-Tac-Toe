import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Square from '../components/square';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Context as StatsContext } from '../context/StatsContext';
import { Context as SettingsContext } from '../context/SettingsContext';
import PlayerScore from '../components/playerScore';


// configure score and round counters
let firstPlayerScore = 0;
let secondPlayerScore = 0;
let round = 0;

const GameScreen = () => {

    // import Stats and Settings Context
    const { state: { firstPlayerWins, secondPlayerWins , reset}, playerOneWins, playerTwoWins, changeRound , setReset} = useContext(StatsContext);
    const { state: { nicknameOne, nicknameTwo }} = useContext(SettingsContext);

    // configure local state
    const [grid, setGrid] = useState([[0,0,0],[0,0,0],[0,0,0]]);
    const [notPressed, setNotPressed] = useState([[true,true,true],[true,true,true],[true,true,true]]);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [playing, setPlaying] = useState(true);
    const [turn, setTurn] = useState(1);
    const [someoneWon, setSomeoneWon] = useState(false);
    const [title, setTitle] = useState(nicknameOne);

    // Game Initialization after each round
    const initialize = () => {
        playerOneWins(firstPlayerScore, round);
        playerTwoWins(secondPlayerScore, round);
        changeRound(round);
        setGrid([[0,0,0],[0,0,0],[0,0,0]]);
        setNotPressed([[true,true,true],[true,true,true],[true,true,true]]);
        setCurrentPlayer(1);
        setPlaying(true);
        setTurn(1);
        setSomeoneWon(false);
        setTitle(nicknameOne);
    }

    // Game Initialization after game reset
    const rootInitialize = () => {
        playerOneWins(firstPlayerScore, round);
        playerTwoWins(secondPlayerScore, round);
        changeRound(round);
        setGrid([[0,0,0],[0,0,0],[0,0,0]]);
        setNotPressed([[true,true,true],[true,true,true],[true,true,true]]);
        setCurrentPlayer(1);
        setPlaying(true);
        setTurn(1);
        setSomeoneWon(false);
        setTitle(nicknameOne);
        firstPlayerScore = 0;
        secondPlayerScore = 0;
        round = 0;     
    }

    // Do these after each board tap
    const onPlay = (hor, ver) => {

        if (!notPressed[hor][ver] || someoneWon) return;

        let newGrid = [...grid];
        let isNotPressed = [...notPressed];

        isNotPressed[hor][ver] = false;
        newGrid[hor][ver] = currentPlayer;

        setNotPressed(isNotPressed);
        setGrid(newGrid);
    
        currentPlayer === 1
            ? setCurrentPlayer(currentPlayer + 1)
            : setCurrentPlayer(currentPlayer - 1)
        currentPlayer === 1
            ? setTitle(nicknameTwo)
            : setTitle(nicknameOne);
    };

    // determine winner
    const checkCombination = (array, playerOne, playerTwo) => {
        // player one
        if (array.every(playerOne)) {
            renderNewGameButton();
            setPlaying(false);
            setSomeoneWon(true);
            firstPlayerScore++;
            round++;
            playerOneWins(firstPlayerScore,round);
            changeRound(round)
            setTitle(`${nicknameOne} Wins!`);
            return;
        }

        // player two
        if (array.every(playerTwo)) {
            renderNewGameButton();
            setPlaying(false);
            setSomeoneWon(true);
            secondPlayerScore++;
            round++;
            playerTwoWins(secondPlayerScore,round);
            changeRound(round);
            setTitle(`${nicknameTwo} Wins!`);
            return;
        }
    }

    // check if someone has made a winning combination
    const checkIfWinner = (grid) => {
        
        const equalsPlayerOne = currentValue => currentValue == 1;
        const equalsPlayerTwo = currentValue => currentValue == 2;

        // rows

        grid.forEach(row => {
            checkCombination(row, equalsPlayerOne, equalsPlayerTwo);
        });

        // columns
        let firstColumn = []
        let secondColumn = []
        let thirdColumn = []

        for (let i = 0; i < 3; i++) {
            firstColumn = [...firstColumn, grid[i][0]];
        }

        for (let i = 0; i < 3; i++) {
            secondColumn = [...secondColumn, grid[i][1]];
        }

        for (let i = 0; i < 3; i++) {
            thirdColumn = [...thirdColumn, grid[i][2]];
        }

        checkCombination(firstColumn, equalsPlayerOne, equalsPlayerTwo);
        checkCombination(secondColumn, equalsPlayerOne, equalsPlayerTwo);
        checkCombination(thirdColumn, equalsPlayerOne, equalsPlayerTwo);

        // X
        let leftX = [];
        let rightX = [];
        let minus = 2;

        for (let i = 0; i < 3; i++) {
            leftX = [...leftX, grid[i][i]];
        }

        // [0][2], [1],[1], [2, 0]

        for (let i = 0; i < 3; i++) {
            
            rightX = [...rightX, grid[i][minus]];
            minus--;
        }

        checkCombination(leftX, equalsPlayerOne, equalsPlayerTwo);
        checkCombination(rightX, equalsPlayerOne, equalsPlayerTwo);

    }

    // End the game if all squares are filled
    const gameEnds = (turn) => {
        if (turn === 10) {
            setPlaying(false);
            setNotPressed([[true,true,true],[true,true,true],[true,true,true]]);
            round++;
            changeRound(round);
            setTitle('Draw!');
        }
    };

    // render a game round reset button
    const renderNewGameButton = () => {
        if (playing) return <View style={styles.newGameButton}><Text style={styles.newGameText}> </Text></View>

        if (!playing) return <TouchableOpacity style={styles.newGameButton} onPress={() => initialize()}><Text style={styles.newGameText}>Game Over ! New Game ?</Text></TouchableOpacity>
    }

    // rerenders
    useEffect(() => {
        setTurn(turn + 1);
        gameEnds(turn);
        checkIfWinner(grid);
    }, [grid])

    useEffect(() => {
        initialize();
    }, [nicknameOne,nicknameTwo]);

    useEffect(() => {
        rootInitialize();
        setReset(true);
    }, [reset]);


    return <LinearGradient colors={['#02AABD', '#00CDAC']} style={styles.viewport}>
        <Text style={[styles.title, styles.score]}>Score</Text>
        <View style={styles.table}>
            <PlayerScore nickname={nicknameOne} playerWins={firstPlayerWins} playerStyle={styles.playerOne} />
            <PlayerScore nickname={nicknameTwo} playerWins={secondPlayerWins} playerStyle={styles.playerTwo}/>
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.row}>
            <Square style={styles.one} hor={0} ver={0} grid={grid} onPlay={onPlay} />
            <Square style={styles.two} hor={0} ver={1} grid={grid} onPlay={onPlay} />
            <Square style={styles.three} hor={0} ver={2} grid={grid} onPlay={onPlay} />
        </View>
        <View style={styles.row}>
            <Square style={styles.four} hor={1} ver={0} grid={grid} onPlay={onPlay} />
            <Square style={styles.five} hor={1} ver={1} grid={grid} onPlay={onPlay} />
            <Square style={styles.six} hor={1} ver={2} grid={grid} onPlay={onPlay} />
        </View>
        <View style={styles.row}>
            <Square style={styles.seven} hor={2} ver={0} grid={grid} onPlay={onPlay} />
            <Square style={styles.eight} hor={2} ver={1} grid={grid} onPlay={onPlay} />
            <Square style={styles.nine} hor={2} ver={2} grid={grid} onPlay={onPlay}  />
        </View>
        <View style={styles.row}>
            {renderNewGameButton()}
        </View>
    </LinearGradient>
};

// Render statistics botton tab navigator icon and title
GameScreen.navigationOptions = {
    title: 'Game',
    tabBarIcon: ({tintColor}) => <Ionicons size={22} name="logo-game-controller-b" color={tintColor}/>,
};

const styles = StyleSheet.create({
    viewport: {
        flex: 1,
        justifyContent: 'center',
    },
    table: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    number: {
        color: '#fff'
    },
    playerOne: {
        color: 'green'
    },
    playerTwo: {
        color: 'red'
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 50,
        color: 'white'
    },
    score:{
        fontStyle: 'italic',
        marginBottom: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    symbol: {
        fontSize: 60,
    },
    one: {
        borderTopWidth: 0,
        borderLeftWidth: 0
    },
    two: {
        borderTopWidth: 0
    },
    three: {
        borderRightWidth: 0,
        borderTopWidth: 0
    },
    four: {
        borderLeftWidth: 0,
    },
    six: {
        borderRightWidth: 0
    },
    seven: {
        borderBottomWidth: 0,
        borderLeftWidth: 0
    },
    eight: {
        borderBottomWidth: 0
    },
    nine: {
        borderBottomWidth: 0,
        borderRightWidth: 0
    },
    newGameButton: {
        marginTop: 30,
        marginBottom: 30
    },
    newGameText: {
        fontSize: 20,
        color: 'white'
    }
});

export default GameScreen;