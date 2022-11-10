import React, { useEffect, useRef, useState }  from 'react'
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screens/LoadingScreen';
import { Fab } from './Fab';

interface Props {
    markers?: typeof Marker[]
}

export const Map = ( { markers } : Props ) => {

    const [showPolyline, setShowPolyline] = useState(true)

    const { hasLocation,
         initialPosition,
         getCurrentLocation,
         followUserLocation,
         stopFollowUserLocation,
         userLocation,
         routeLines
    } = useLocation()

    const mapViewRef = useRef<MapView>()
    const following = useRef<boolean>(true)

    useEffect(() => {
        followUserLocation()
        return () => {
            stopFollowUserLocation()
        }
    }, [])


    useEffect(() => {

        if(!following.current) return 

        const {latitude, longitude } = userLocation
        mapViewRef.current?.animateCamera({
            center: {
                latitude,
                longitude
            }
        })  
    }, [userLocation])



    const centerPosition = async () => {

        const {latitude, longitude} = await getCurrentLocation() 

        following.current = true

        mapViewRef.current?.animateCamera({
            center: {
                latitude,
                longitude
            }
        })
    }


    if( !hasLocation ){
        return <LoadingScreen />
    }


    return (
        <>
            <MapView
                ref={ (el) => mapViewRef.current = el! }
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                showsUserLocation
                style={{flex: 1}}
                region={{
                    latitude: initialPosition.latitude,
                    longitude: initialPosition.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                onTouchStart={ () => following.current = false }
            >

                {/* Linea de ruta */}
                {
                    showPolyline && (
                        <Polyline 
                            coordinates={ routeLines }
                            strokeColor="#000"
                            strokeWidth={ 3 }
                        />
                    )
                }


                {/* <Marker
                    image={ require('../assets/marker.png') }
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title='Marcador 1'
                    description='Prueba de marcador'
                /> */}

            </MapView>

            <Fab  
                iconName='compass-outline'
                onPress={ centerPosition }
                style={{
                    position: 'absolute',
                    right: 20,
                    bottom: 20
                }}
            />

            <Fab  
                iconName='brush-outline'
                onPress={ () => setShowPolyline( !showPolyline ) }
                style={{
                    position: 'absolute',
                    right: 20,
                    bottom: 80
                }}
            />
        
        </>
    )
}
