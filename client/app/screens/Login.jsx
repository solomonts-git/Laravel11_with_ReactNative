import { View, Text, ScrollView, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation, useRouter } from 'expo-router';
import axios from '../../services/api';
import { setToken } from '../../services/tokenService';


export default function Login() {
    const router = useRouter();
    const navigation = useNavigation();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [loginToken, setLoginToken] = useState(null);
    const [errors, setErrors] = useState({});

    const login = (data) => axios.post('/login',data);

    const handleLogin = async () => {
        if (email ==''|| password ==''){
            Alert.alert('All Fields Required','All Fields are Required');
        }

        try{
            setLoading(true);

            const response = await login({
                email: email.toLowerCase(),
                password:password
            });

            setLoading(false);
            await setToken(response?.data?.token);
            setLoginToken(response?.data?.token)
            router.push("/tabs")
        }catch(e){
            setLoading(true);
            setErrors(e.reponse?.data?.errors);
            setLoading(false);
        }
    }


  return (
   <SafeAreaView style={{flex: 1, justifyCotent:'center',alignItems:'center' ,backgroundColor:'aqua'}}>
    <LinearGradient 
        colors={['#50d5b7','#067d68','transparent']}
        style={styles.background}
    />

    <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,width:'100%'}}>
        <View style={{flex:1,width:'100%',marginTop:100}}>
            <Text style={{
                fontSize:24,
                fontWeight:'bold',
                marginBottom:20,
                textAlign:'center',
                color:'white'
            }}>User Login</Text>
            <View style={{width:'100%',padding:20}}>

                <Text style={{margingBottom:5,fontSize:20,color:'white'}}>Email</Text>
                <TextInput onChangeText={(v)=>setEmail(v)} style={{borderWidth:1,marginBottom:15,padding:10,borderRadius:5,color:'white'}}/>
                
                {errors && <Text style={{color:'red',fontsize:14}}>{errors.email}</Text>}
                <Text style={{margingBottom:5,fontSize:20,color:'white'}}>Password</Text>
                <TextInput onChangeText={(v)=>setPassword(v)} secureTextEntry style={{borderWidth:1,marginBottom:15,padding:10,borderRadius:5,color:'white'}}/>
                {errors && <Text style={{color:'red',fontsize:14}}>{errors.password}</Text>}
                <TouchableOpacity onPress={handleLogin} style={{marginVertical:10,borderRadius:10,paddingVertical:10,backgroundColor:'#007bff'}}>
                <Text style={{fontSize:20,textAlign:'center',color:'white'}}>Login</Text>
            </TouchableOpacity>
            </View>
            {loading ?<ActivityIndicator size="large" />: <Text></Text>}
        </View>
        {errors && <Text style={{fontSize:20,textAlign:'center',color:'white'}}>{errors.message}</Text>}
    </ScrollView>

   </SafeAreaView>
  )
}

const styles= StyleSheet.create({
    background:{
        position:'absolute',
        left:0,
        right:0,
        top:0,
        height:'100%'
    }
})