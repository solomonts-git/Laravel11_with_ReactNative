import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import React, { useContext } from 'react'
import { deleteToken, getToken } from '../../services/tokenService'
import axios from 'axios'
import { router } from 'expo-router'
import { UserContext } from '../../context/UserContext'

export default function Profile() {
    const { user, loading } = useContext(UserContext)


    if (loading) {
        return <ActivityIndicator size="large" />
    }

    const handleLogout = async () => {
        try {
            const token = await getToken();

            if (token) {
                const response = await axios.post("http://192.168.56.1:8000/api/logout", {}, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                await deleteToken();
                router.push("/screens/Home")
            }
        } catch (e) {
            Alert.alert('Logout Error', 'Unable to logout');
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.userinfo}>
                <Text style={styles.name}>{user?.name}</Text>
                <Text style={styles.name}>{user?.email}</Text>
            </View>
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Text style={{color:'white'}}>Logout</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userinfo: {
        marginBottom: 20,
    },
    name: {
        fontSize: 24
    },
    email: {
        fontSize: 18
    },
    logoutButton: {
        padding: 20,
        marginTop: 20,
        backgroundColor: 'red',
        color: 'white',
        borderRadius: 15,
        width: '25%',
        alignItems: 'center'
    }
})