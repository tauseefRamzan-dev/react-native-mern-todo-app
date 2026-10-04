import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthContext, { useAuth } from './src/context/Auth';
import RootNavigator from './src/navigator/RootNavigator'

export default function App() {
  return (
    <NavigationContainer>
      <AuthContext>
        <RootNavigator />
      </AuthContext>
    </NavigationContainer>
  );
}

