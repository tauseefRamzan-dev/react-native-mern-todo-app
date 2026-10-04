import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image } from "react-native";
import { useAuth } from "../context/Auth";
import Frontend from '../screens/Frontend/index';
import logo from '../../assets/images/logo/logo.png';

const RootNavigator = () => {
  const { isAppLoading } = useAuth();

  if (isAppLoading) {
    return (
      <View style={styles.loaderContainer}>
        <View style={styles.loaderCard}>
          <View style={styles.logoWrapper}>
            <Image source={logo} style={styles.logoImage} />
          </View>
          <ActivityIndicator size="large" color="#007AFF" style={styles.spinner} />
          <Text style={styles.loaderText}>TASKNATIVE APP</Text>
        </View>
      </View>
    );
  }

  return <Frontend />;
};

export default RootNavigator;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 24,
  },
  loaderCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF", 
    paddingVertical: 36,
    paddingHorizontal: 48,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  logoWrapper: {
    marginBottom: 16,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  logoImage: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
    borderRadius: 14,
  },
  spinner: {
    marginBottom: 14,
  },
  loaderText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#475569",
    letterSpacing: 1.5,
  },
});