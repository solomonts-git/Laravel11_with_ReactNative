import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRouter } from 'expo-router';
import axios from '../../services/api'
import { setToken } from '../../services/tokenService';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [loading,setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const router = useRouter();
    const navigation = useNavigation();

    const register = (data) => axios.post('/register',data);

    const handleRegister= async ()=>{
        if(name==''||email=='' || password=='' || passwordConfirmation==''){
            Alert.alert('Required Fields','All Fields are required');
        }

        try {
            setLoading(true);
            const response = await register({
                name:name,
                email:email.toLowerCase(),
                password: password,
                password_confirmation:passwordConfirmation
            });

            setLoading(false);
            await setToken(response?.data?.token);
            // navigation.navigate('Front');
            router.push('/tabs')

        }catch(e){
           
            console.error(e.response.data);
            setErrors(e.response?.data?.errors);
            setLoading(false);
        }
        // 
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: 'aqua' }}>
            <LinearGradient
                colors={['#50d5b7', '#067d68', 'transparent']}
                style={styles.background}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{ marginTop: 50, textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'white' }}>User Registration</Text>
                <TextInput placeholder="Full Nmae" placeholderTextColor="white" value={name} onChangeText={setName}
                    style={{ borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5, marginTop: 10,color:'white' }} />
                {errors && <Text style={{color:'red',fontSize:10}}>{errors.name}</Text>}
                <TextInput placeholder="Email" placeholderTextColor="white" value={email} onChangeText={setEmail}
                    style={{ borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5, marginTop: 10,color:'white' }} />
               {errors && <Text style={{color:'red',fontSize:10}}>{errors.email}</Text>}
                <TextInput placeholder="Password" placeholderTextColor="white" value={password} secureTextEntry onChangeText={setPassword}
                    style={{ borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5, marginTop: 10,color:'white' }} />
                 {errors && <Text style={{color:'red',fontSize:10}}>{errors.password}</Text>}
                <TextInput placeholder="Confirm Password" placeholderTextColor="white" value={passwordConfirmation}
                secureTextEntry
                onChangeText={setPasswordConfirmation}
                    style={{ borderWidth: 1, marginBottom: 15, padding: 10, borderRadius: 5, marginTop: 10 ,color:'white'}} />

                <TouchableOpacity onPress={handleRegister} style={{ marginVertical: 10, borderRadius: 10, paddingVertical: 10, backgroundColor: '#007bff' }}>
                    <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>Register</Text>
                </TouchableOpacity>
                {loading ? <ActivityIndicator size="large" color="white" />:<Text></Text>}
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
    }
})