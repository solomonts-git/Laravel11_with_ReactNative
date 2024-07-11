import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import Register from './screens/Register';
import { useNavigation, useRouter } from 'expo-router';
import { getToken } from '../services/tokenService';
import TabsLayout from './tabs/_layout';
import Login from './screens/Login';

const Stack=  createStackNavigator();

export default function Index() {
  const [token, setToken] = useState('');
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(()=>{
    const fetchToken= async ()=>{
      const res= await getToken();
      setToken(res);
    };

    fetchToken();
  },[]);


  return (
   <NavigationContainer independent={true}>
       <Stack.Navigator>
      {
        !token ?  
        <>
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
          <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        </>:
        <Stack.Screen name="TabsLayout" component={TabsLayout} options={{headerShown: false}} />
      } 
       
              
      </Stack.Navigator>
   </NavigationContainer>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})