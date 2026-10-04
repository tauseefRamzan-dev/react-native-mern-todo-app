import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Modal, Alert, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from "@env";

const Home = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Incompleted');
  const [visibility, setVisibility] = useState('Public');
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
const [IsProcessing,setIsProcessing]=useState(false)
  const getTodos = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${API_URL}/todos/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status===200) {
        const { todos: apiTodos } = response.data;
        setTodos(apiTodos?.reverse());
      }
    } catch (error) {
      console.error(error);
      setTodos([]);
    } finally {
      setIsLoading(false);
    }
  };




  useEffect(() => {
    getTodos();
  }, []);

  const deleteTodo=async(id)=>{
    const token=await AsyncStorage.getItem("token")
    await axios.delete(`${API_URL}/todos/delete?id=${id}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
    .then(({status,data})=>{
       if(status===200){
        const {message: apiMessage}=data;
        // message.success(apiMessage);
        getTodos();
       }
    }).catch((error)=>{
      console.error(error)
      // message.error("Something went wrong. Please try again!")
    })

  }

  

  const handleDelete = (id) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Delete", 
        style: "destructive", 
        onPress: () => deleteTodo(id) 
      }
    ]);
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setTitle(item.title);
    setLocation(item.location || '');
    setDescription(item.description);
    setDueDate(item.dueDate || '');
    setStatus(item.status || 'Incompleted');
    setVisibility(item.visibility || 'Public');
    setModalVisible(true);
  };

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setTitle('');
    setLocation('');
    setDescription('');
    setDueDate('');
    setStatus('Incompleted');
    setVisibility('Public');
    setModalVisible(true);
  };

  const handleSave=async() => {
    if (!title.trim()) {
      Alert.alert("Error", "Title field is required!");
      return;
    }
      if(title.length<2 || description.length<2)
    {
         Alert.alert("Error", "Please enter correct detail!");
      return;
  }

    if (isEditing) {
      
  let TodoToUpdate={
  title,
  location,
  description,
  dueDate,
  status,
  visibility,
  }
  const token =await AsyncStorage.getItem("token");
  console.log("Sending payload:", TodoToUpdate);
    setIsProcessing(true)

 await axios.patch(`${API_URL}/todos/update?id=${currentId}`,TodoToUpdate,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
 .then(({status,data})=>{
  if(status===201)
  {
    const {message: apiMessage}=data;
    
setTodos(todos.map(item => (item.id === currentId || item._id === currentId) ? {
            ...item,
            ...TodoToUpdate
          } : item));
    setModalVisible(false);
    Alert.alert("Success", apiMessage)
  }
 }).catch((error)=>{
 console.error(error)
      console.error(error);
  const errorMsg = error?.response?.data?.message || "Something went wrong";
  Alert.alert("Error", errorMsg);
 }).finally(()=>{
  setIsProcessing(false)
 })
    } 
    else
       {
const newTodo = {
        title,
        location: location || "Home",
        description,
        dueDate: dueDate || "2026-10-20",
        status,
        visibility
      };
setIsProcessing(true)
  const token = await AsyncStorage.getItem("token");
 await axios.post(`${API_URL}/todos/create`,newTodo,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
 .then(({status,data})=>{
  if(status===201)
  {
    const {message: apiMessage}=data;
    Alert.alert("Success", apiMessage)
    // setTodos([newTodo, ...todos]);
    getTodos();
    setModalVisible(false);
  }
 }).catch((error) => {
  console.error("API Error details:", error?.response || error);
  const errorMsg = error?.response?.data?.message || "Something went wrong";
  Alert.alert("Error", errorMsg);
}).finally(()=>{
  setIsProcessing(false)
 })
    }
  };
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('TaskDetail', { todo: item })}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={[styles.statusTag, item.status === 'Completed' ? styles.completed : styles.pending]}>
            {item.status}
          </Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        <View style={styles.cardFooterInfo}>
          <Text style={styles.footerText}>📍 {item.location}</Text>
          <Text style={[styles.visibilityTag, item.visibility === 'Public' ? styles.publicTag : styles.privateTag]}>
            {item.visibility}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.editBtn} onPress={() => handleEdit(item)}>
          <Text style={styles.actionText}>✏️ Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>


          <Text style={styles.actionText}>🗑 Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.subText}>Manage your daily goals efficiently</Text>
        </View>
      </View>

      <View style={styles.controlBar}>
        <TouchableOpacity style={styles.addBtn} onPress={handleOpenAddModal}>
          <Text style={styles.addBtnText}>+ Add New Task</Text>
        </TouchableOpacity>
      </View>



      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) :
      (!todos || todos.length === 0)?
                  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>📋 No tasks found. Add a new task!</Text>
  </View>
      :
      (
        <FlatList
          data={todos}
          keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <KeyboardAvoidingView 
          behavior={'height'} 
          style={styles.modalOverlay}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.modalContent}>
              
              <View style={styles.modalHeaderRow}>
                <Text style={styles.modalTitle}>{isEditing ? 'Edit Todo' : 'Add Todos'}</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                  <Text style={styles.closeBtnText}>✕</Text>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.inputLabel}>
                <Text style={styles.requiredStar}>* </Text>Title
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter title"
                placeholderTextColor="#aaa"
                value={title}
                onChangeText={setTitle}
              />

              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter location"
                placeholderTextColor="#aaa"
                value={location}
                onChangeText={setLocation}
              />

              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter description"
                placeholderTextColor="#aaa"
                value={description}
                onChangeText={setDescription}
              />

              <Text style={styles.inputLabel}>Due Date</Text>
              <View style={styles.dateInputContainer}>
                <TextInput
                  style={styles.dateInput}
                  placeholder="mm/dd/yyyy"
                  placeholderTextColor="#aaa"
                  value={dueDate}
                  onChangeText={setDueDate}
                />
                <Text style={styles.calendarIcon}>📅</Text>
              </View>

              <Text style={styles.inputLabel}>Status</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={status}
                  onValueChange={(itemValue) => setStatus(itemValue)}
                  style={styles.androidPicker}
                >
                  <Picker.Item label="Incompleted" value="Incompleted" />
                  <Picker.Item label="Completed" value="Completed" />
                </Picker>
              </View>

              <Text style={styles.inputLabel}>Visibility</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={visibility}
                  onValueChange={(itemValue) => setVisibility(itemValue)}
                  style={styles.androidPicker}
                >
                  <Picker.Item label="Public" value="Public" />
                  <Picker.Item label="Private" value="Private" />
                </Picker>
              </View>

              <TouchableOpacity style={styles.saveTodoBtn} onPress={handleSave}>
                
{IsProcessing ? (
    <ActivityIndicator size="small" color="#fff" />
  ) : (
    <Text style={styles.saveTodoBtnText}>{isEditing ? 'Update Todo' : 'Add Todo'}</Text>
  )}

              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  headerContainer: {
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginTop: 2,
  },
  controlBar: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  addBtn: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusTag: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  pending: {
    backgroundColor: '#FFF3CD',
    color: '#856404',
  },
  completed: {
    backgroundColor: '#D4EDDA',
    color: '#155724',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  cardFooterInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 12,
    color: '#888',
  },
  visibilityTag: {
    fontSize: 11,
    fontWeight: '600',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  publicTag: {
    backgroundColor: '#E1F5FE',
    color: '#0288D1',
  },
  privateTag: {
    backgroundColor: '#FCE4EC',
    color: '#C2185B',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 8,
  },
  editBtn: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  deleteBtn: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    elevation: 5,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
    textAlign: 'center',
  },
  closeBtn: {
    padding: 4,
  },
  closeBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  inputLabel: {
    fontSize: 13,
    color: '#333',
    marginBottom: 6,
    fontWeight: '500',
  },
  requiredStar: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 14,
    color: '#333',
    backgroundColor: '#fff',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    marginBottom: 14,
    backgroundColor: '#fff',
    paddingRight: 10,
  },
  dateInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  calendarIcon: {
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    marginBottom: 14,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  androidPicker: {
    width: '100%',
    height: 50,
    color: '#333',
  },
  saveTodoBtn: {
    backgroundColor: '#0066FF',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  saveTotalBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  emptyContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 50,
},
emptyText: {
  fontSize: 16,
  color: '#888',
  fontWeight: '500',
},
});