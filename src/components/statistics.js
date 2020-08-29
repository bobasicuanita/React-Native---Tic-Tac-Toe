import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Statistics = ({ nickname, playerWins }) => {
    return <View>
    <View style={styles.table}>
        <Text style={styles.players}>{nickname}</Text>
    </View>
    <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />
    <View style={styles.table}>
        <Text style={styles.players}> {playerWins}</Text>
    </View>
</View>
};

const styles = StyleSheet.create({
    table: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    players: {
        color: '#fff',
        margin: 10,
        fontSize: 30
    }
});

export default Statistics;