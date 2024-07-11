import { View, Text, SafeAreaView, Pressable, Alert, StyleSheet } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {

    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#50d5b7', '#067d68', 'transparent']}
                style={styles.background}
            />
            <View style={styles.logo}>
                <Text style={{ textAlign: 'center', fontSize: 30, color: 'white', fontWeight: 600 }}>Laravel API Sanctum</Text>
                <Text style={{ textAlign: 'center', fontSize: 20, fontStyle: 'italic', color: 'white' }} >Vs</Text>
                <Text style={{ textAlign: 'center', fontSize: 30, color: 'white', fontWeight: 600 }}>React Native</Text>
            </View>
            <View style={styles.card}>
                <Pressable style={styles.button} onPress={() => router.push("/screens/Register")}>
                    <Text style={styles.buttontxt}>Register</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => router.push("screens/Login")}>
                    <Text style={styles.buttontxt}>Login</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'aqua',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingVertical: 10
    },
    logo: {
        width: '100%',
        height: '50%',
        marginTop: 50,
        marginHorizontal: 15
    },
    button: {
        padding: 10,
        marginBottom: 15,
        marginHorizontal: 20,
        backgroundColor: '#007bff',
        borderRadius: 10
    },
    buttontxt: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white'
    },

    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
    }
})

