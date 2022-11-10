import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export const LoadingScreen = () => {

    return (
        <View style={style.container}>
            <ActivityIndicator
                size={70}
                color='black'
            />
            <Text style={{color: '#000'}}>
                Cargando...
            </Text>
        </View>
    )
}


const style =  StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
})