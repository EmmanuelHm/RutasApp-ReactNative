import React from 'react'
import { StyleProp, TouchableOpacity, ViewStyle, Text, StyleSheet } from 'react-native';

interface Props {
    title: string, 
    onPress: () => void,
    style?: StyleProp<ViewStyle>
}

export const BlackButton = ({title, onPress, style = {} }: Props) => {
    return (
        <TouchableOpacity
            onPress={ onPress }
            activeOpacity={ 0.8 }
            style={{
                ...style as any,
                ...styles.blackButton
            }}
        >
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    blackButton:{
        backgroundColor: '#000',
        height: 45,
        width: 200,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,

        elevation: 6

    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
    }
})
