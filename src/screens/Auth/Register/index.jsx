import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL } from '@env';

export default function Register() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const emailValidCheck = (emailText) => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(emailText);
  };

  const handleSubmit = async () => {
    if (fullName.length < 3) {
      return Alert.alert("Error", "Please enter correct name.");
    }
    if (!emailValidCheck(email)) {
      return Alert.alert("Error", "Please enter correct email address.");
    }
    if (password.length < 8) {
      return Alert.alert("Error", "Password must be at least 8 characters.");
    }
    if (password !== confirmPassword) {
      return Alert.alert("Error", "Passwords must match.");
    }

    const user = {
      fullName,
      email,
      password,
    };

    setIsProcessing(true);
    
    axios.post(`${API_URL}/auth/register`, user, { timeout: 10000 })
      .then(({ status, data }) => {
        if (status === 201) {
          const responseMessage = data.message || "Registered successfully!";
          Alert.alert("Success", responseMessage);
          navigation.navigate('Login');
        }
      })
      .catch(error => {
        console.error("error", error);
        const errorMessage = error.response?.data?.message || error.message || "User not registered.";
        Alert.alert("Error", errorMessage);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.mainContainer}
      behavior="height"
      keyboardVerticalOffset={20}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>Register</Text>

          <Text style={styles.label}>
            <Text style={styles.required}>* </Text>Full Name
          </Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#999"
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>
            <Text style={styles.required}>* </Text>Email
          </Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter your email address"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>
            <Text style={styles.required}>* </Text>Password
          </Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

          <Text style={styles.label}>
            <Text style={styles.required}>* </Text>Confirm Password
          </Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter confirm password"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />

          <TouchableOpacity 
            style={[styles.registerButton, isProcessing && { opacity: 0.7 }]} 
            onPress={handleSubmit}
            disabled={isProcessing}
          >
            {isProcessing ? (
    <ActivityIndicator size="small" color="#fff" />
  ) : (
<Text style={styles.registerButtonText}>
            Register
            </Text>
  )}
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text 
                style={styles.linkText} 
                onPress={() => navigation.navigate('Login')}
              >
                Login
              </Text>
            </Text>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1e293b',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 30,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 6,
  },
  required: {
    color: '#ef4444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0f172a',
    backgroundColor: '#fff',
    marginBottom: 14,
  },
  registerButton: {
    backgroundColor: '#2563eb',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerContainer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#475569',
  },
  linkText: {
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
});