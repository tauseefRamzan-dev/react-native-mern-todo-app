import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState } from 'react'

const Todo = ({ route }) => {
  const { todo } = route.params || {};

  if (!todo) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Task not found!</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.mainCard}>
        <View style={styles.headerRow}>
          <Text style={[styles.badge, todo.status === 'Completed' ? styles.completedBadge : styles.pendingBadge]}>
            {todo.status}
          </Text>
          <Text style={styles.visibilityBadge}>🔒 {todo.visibility}</Text>
        </View>

        <Text style={styles.title}>{todo.title}</Text>
        
        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.descriptionText}>{todo.description}</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.infoValue}>📍 {todo.location}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Due Date</Text>
            <Text style={styles.infoValue}>📅 {todo.dueDate}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Todo

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
    justifyContent: 'center',
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  badge: {
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    overflow: 'hidden',
  },
  pendingBadge: {
    backgroundColor: '#FFF8E1',
    color: '#F57C00',
  },
  completedBadge: {
    backgroundColor: '#E8F5E9',
    color: '#388E3C',
  },
  visibilityBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6C757D',
    backgroundColor: '#F1F3F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E9ECEF',
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ADB5BD',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 15,
    color: '#495057',
    lineHeight: 22,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 14,
  },
  infoBox: {
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#343A40',
    marginTop: 2,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  errorText: {
    fontSize: 16,
    color: '#DC3545',
    fontWeight: '600',
  },
})