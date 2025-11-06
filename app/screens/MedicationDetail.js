import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function MedicationDetail({ route, navigation }) {
  const { med } = route.params || {};

  if (!med) return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text>No medication</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{med.name}</Text>
      <Text style={styles.text}>Dose: {med.dose}</Text>
      <Text style={styles.text}>Time: {med.time}</Text>

      <TouchableOpacity style={styles.button} onPress={() => { Alert.alert("Edit", "Edit modal placeholder"); }}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: "#FF4D4F" }]} onPress={() => { Alert.alert("Delete", "Not implemented"); }}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#fff', padding:20, paddingTop:60 },
  title: { fontSize:22, fontWeight:'700', color:'#003366' },
  text: { marginTop:12, color:'#555' },
  button: { marginTop:20, backgroundColor:'#007BFF', padding:12, borderRadius:10, alignItems:'center' },
  buttonText: { color:'#fff', fontWeight:'700' }
});
