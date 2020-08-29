import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Square = ({ style, grid, hor, ver, onPlay }) => {


    // render symbol according to which player is playing and which position was tapped
    const setSymbol = (hor, ver) => {

        let symbol = grid[hor][ver];

        switch(symbol) {
            case 1: return <Feather name='x' style={styles.symbol} />
            case 2: return <Feather name='circle' style={styles.symbol} />
            default: return <View />
        }
    }

    return <View style={styles.shadow}>
        <TouchableOpacity onPress={() => onPlay(hor, ver)} style={[styles.square, style]}>
            <Text style={[styles.symbol, grid[hor][ver] == 1 ? styles.x : styles.o]}>{setSymbol(hor, ver)}</Text>
        </TouchableOpacity>
    </View>
};

styles = StyleSheet.create({
    shadow: {
        width: 100,
        height: 100,
        shadowColor: "#ffffff",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: {
          height: 4,
          width: 0
        }
    },

    square: {
        borderWidth: 2,
        height: 100,
        width: 100,
        justifyContent: 'center',
        borderColor: '#000'
    },
    symbol: {
        fontSize: 40,
        alignSelf: 'center',
    },
    x: {
        color: 'green'
    },
    o: {
        color: 'red'
    }
});

export default Square;