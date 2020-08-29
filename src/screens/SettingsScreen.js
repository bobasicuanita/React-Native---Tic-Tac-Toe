import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Context as SettingsContext } from '../context/SettingsContext';
import { Context as StatsContext } from '../context/StatsContext';

const SettingsScreen = () => {

    // import Stats and settings context
    const { resetStats } = useContext(StatsContext);
    const { changeNameOne , changeNameTwo } = useContext(SettingsContext);

    // declare local state
    const [playerTab, setPlayerTab] = useState(0);
    const [nickname, setNickname] = useState('');

    // determine which player is chosen and change nickname
    const handleNickNameChange = () => {
        if (nickname === '') return;
        if (playerTab === 1) changeNameOne(nickname);
        if (playerTab === 2) changeNameTwo(nickname);
    }

    return <LinearGradient colors={['#02AABD', '#00CDAC']} style={styles.viewport}>
        <Text style={styles.title}>Settings</Text>
        <Ionicons style={{ alignSelf: 'center', marginBottom: 20 }} size={40} color="#fff" name="ios-settings" />
        <Text style={styles.changeName}>Change Nickname for:</Text>
        <View style={styles.boxes}>
            <TouchableHighlight
                onPress={() => playerTab === 1 ? setPlayerTab(0) : setPlayerTab(1)}
                style={playerTab === 1 ? styles.pressedBox : styles.box}
            >
                <Text style={styles.playerBox}>Player 1</Text>
            </TouchableHighlight>
            <TouchableHighlight
                onPress={() => playerTab === 2 ? setPlayerTab(0) : setPlayerTab(2)}
                style={playerTab === 2 ? styles.pressedBox : styles.box}
            >
                <Text style={styles.playerBox}>Player 2</Text>
            </TouchableHighlight>
        </View>
        <TextInput
            placeholder='Nickname..' 
            style={styles.input}
            onChangeText={(text) => setNickname(text)}
            clearButtonMode='always'
        />
        <TouchableOpacity onPress={() => handleNickNameChange()} style={styles.button}>
            <Text style={{ fontSize: 20 }}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => resetStats()} style={styles.button}>
            <Text style={{ fontSize: 20 }}>Reset Challenge</Text>
        </TouchableOpacity>
    </LinearGradient>
};

// Render statistics botton tab navigator icon and title
SettingsScreen.navigationOptions = {
    title: 'Settings',
    tabBarIcon: ({tintColor}) => <Ionicons size={22} name="ios-settings" color={tintColor}/>,
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
        color: '#fff'
    },
    changeName: {
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 30,
        color: '#fff'
    },
    boxes: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    box: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 40,
        paddingRight: 40,
        borderWidth: 3,
        borderColor: '#fff',
        margin: 5,
        marginTop: 20
    },
    pressedBox: {
        // backgroundColor: '#fff',
        // color: '#2193b0',
        borderColor: '#000',
        margin: 5,
        marginTop: 20,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 40,
        paddingRight: 40,
        borderWidth: 3
    },
    playerBox: {
        color: '#fff',
        fontSize: 20
    },
    input: {
        color: '#fff',
        borderColor: '#fff',
        borderWidth: 3,
        height: 50,
        width: 320,
        alignSelf: 'center',
        marginTop: 2,
        padding: 10,
        fontSize: 20
    },
    button: {
        alignSelf: 'center',
        marginTop: 20
    }
});

export default SettingsScreen;