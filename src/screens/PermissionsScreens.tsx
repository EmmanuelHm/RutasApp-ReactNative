import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { BlackButton } from '../components/BlackButton';
import { PermissionsContext } from '../context/PermissionsContext';

export const PermissionsScreen = () => {

    const { permissions, askLocationPermission } = useContext( PermissionsContext )

    return (
        <View style={style.container}>

            <Text style={style.simpleText}>
                Habilite el GPS para navegar:
            </Text>

            <BlackButton
                title='Permiso'
                onPress={ askLocationPermission }
            />

            <Text style={style.simpleText}>
                { JSON.stringify(permissions, null, 5) }
            </Text>


        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    simpleText: {
        color: '#000',
        marginVertical: 10, 
        fontSize: 18,
        width: 300,
        textAlign: 'center'
    }
}) 
