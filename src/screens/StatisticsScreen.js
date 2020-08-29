import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Context as StatsContext } from '../context/StatsContext';
import { Context as SettingsContext } from '../context/SettingsContext';
import Statistics from '../components/statistics';

const StatisticsScreen = () => {


    // import Context
    const { state: { firstPlayerWins, secondPlayerWins, rounds }} = useContext(StatsContext);
    const { state: { nicknameOne, nicknameTwo }} = useContext(SettingsContext);

    return <LinearGradient colors={['#02AABD', '#00CDAC']} style={styles.viewport}>
        <Text style={styles.title}>Statistics</Text>
        <Ionicons style={{ alignSelf: 'center', marginBottom: 20 }} size={40} color="#fff" name="ios-stats" />
        <Statistics nickname={nicknameOne} playerWins={firstPlayerWins} />
        <Statistics nickname={nicknameTwo} playerWins={secondPlayerWins} />
        <Statistics nickname='Rounds' playerWins={rounds} />
    </LinearGradient>
};

// Render statistics botton tab navigator icon and title
StatisticsScreen.navigationOptions = {
    title: 'Statistics',
    tabBarIcon: ({tintColor}) => <Ionicons size={22} name="ios-stats" color={tintColor}/>,
};


const styles = StyleSheet.create({
    viewport: {
        flex: 1,
        justifyContent: 'center',
        
    },
    title: {
        fontSize: 50,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 20,
        color: 'white'
    }
});

export default StatisticsScreen;