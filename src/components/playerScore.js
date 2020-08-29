import React from 'react';
import { Text, StyleSheet } from 'react-native';

const playerScore = ({ nickname, playerWins, playerStyle }) => {
    
    return  <Text style={[styles.players, playerStyle]}>{nickname}:  
        <Text style={styles.number}> {playerWins}</Text>
    </Text>
}

const styles = StyleSheet.create({
    players: {
        margin: 20,
        fontSize: 20
    },
    number: {
        color: '#fff'
    }
});

export default playerScore;