import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from "../../../../assets/images/logo/logo.png";
import { useAuth } from '../../../context/Auth';

const Home = () => {
  const navigation = useNavigation();
  const {isAuth,user,handleLogout }=useAuth();
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      <View style={styles.brandBadge}>
        <View style={styles.dot} />
        <Text style={styles.badgeText}>TASKNATIVE APP</Text>
      </View>

      <View style={styles.heroContainer}>
        <View style={styles.logoWrapper}>
          <Image source={logo} style={styles.logoImage} />
        </View>

        {isAuth && (
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{getInitials(user?.fullName || user?.email)}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName} numberOfLines={1}>
                {user?.fullName || "User Profile"}
              </Text>
              <Text style={styles.profileEmail} numberOfLines={1}>
                {user?.email || "No email provided"}
              </Text>
            </View>
          </View>
        )}

        <Text style={styles.title}>
          {isAuth ? `Welcome Back! 👋` : 'Plan Your Day With Ease'}
        </Text>
        
        <Text style={styles.subtitle}>
          {isAuth 
            ? "Your tasks are synced and ready. Let's make today productive and get things done." 
            : "Keep track of your daily goals, stay organized, and never miss an important task again."}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {isAuth ? (
          <>
            <TouchableOpacity 
              style={styles.primaryBtn} 
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Todos')}
            >
              <Text style={styles.primaryBtnText}>View My Tasks</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.logoutBtn} 
              activeOpacity={0.8}
              onPress={() => handleLogout()}
            >
              <Text style={styles.logoutBtnText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity 
              style={styles.primaryBtn} 
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.primaryBtnText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryBtn} 
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.secondaryBtnText}>Create Account</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#007AFF',
    marginRight: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
    letterSpacing: 1.2,
  },
  heroContainer: {
    alignItems: 'center',
    width: '100%',
  },
  logoWrapper: {
    marginBottom: 20,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  logoImage: {
    width: 72,
    height: 72,
    resizeMode: 'contain',
    borderRadius: 18,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 14,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 3,
  },
  profileEmail: {
    fontSize: 12,
    color: '#64748B',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
  },
  primaryBtn: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  secondaryBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryBtnText: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  logoutBtn: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  logoutBtnText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});