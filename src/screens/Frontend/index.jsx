import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'; // 1. Imported TransitionPresets
import Home from './Home/index';
import Todos from './Todos/index';
import Todo from './Todo/index';
import Login from '../Auth/Login/index';
import Register from '../Auth/Register/index';

const Stack = createStackNavigator();

const Frontend = () => {
  return (
    <Stack.Navigator 
      initialRouteName='Home'
      screenOptions={{
        headerStyle: { backgroundColor: '#F8FAFC' },
        headerTintColor: '#0F172A',
        headerTitleStyle: { fontWeight: '700' },
        
        ...TransitionPresets.SlideFromRightIOS,
      
        gestureEnabled: true,
      }}
    >
      <Stack.Screen 
        name='Login' 
        component={Login} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name='Register' 
        component={Register} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name='Home' 
        component={Home} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name='Todos' 
        component={Todos} 
        options={{ title: 'My Tasks' }} 
      />
      <Stack.Screen 
        name='TaskDetail' 
        component={Todo} 
        options={{ title: 'Task Details' }} 
      />
    </Stack.Navigator>
  );
};

export default Frontend;
