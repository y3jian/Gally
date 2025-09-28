import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, TextInput, Modal, TouchableOpacity, FlatList, Pressable } from 'react-native';
import { useThemedStyles } from './../styles/theme'; // import our shared styles
import CycleCard from '../../components/cycle_card';


export default function TabTwoScreen() {
  const styles = useThemedStyles();

  // State for CycleCard props
//   const [phase, setPhase] = useState("Follicular");
  const [cravings, setCravings] = useState("Low");
  const [mood, setMood] = useState("Calm");
  const [status, setStatus] = useState("Stable");

  // State for modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // Temporary values for editing
//   const [tempPhase, setTempPhase] = useState(phase);
  const [tempCravings, setTempCravings] = useState(cravings);
  const [tempMood, setTempMood] = useState(mood);
  const [tempStatus, setTempStatus] = useState(status);

  
  const handleConfirm = () => {
    // setPhase(tempPhase);
    setCravings(tempCravings);
    setMood(tempMood);
    setStatus(tempStatus);
    setModalVisible(false);
  };

  const handleCancel = () => {
    // reset temps so unsaved changes don’t persist
    // setTempPhase(phase);
    setTempCravings(cravings);
    setTempMood(mood);
    setTempStatus(status);
    setModalVisible(false);
  };
    
  return (
    <View style={styles.container}>
    <ImageBackground
        source={require('../../assets/images/green_background.png')} // local image
        style={styles.shortBackgroundImage}
        resizeMode="cover" // or 'contain', depending on your image
        >

        <Text style={styles.tabTitle}>Your Status</Text>

        <CycleCard
            image={require('../../assets/images/mascot.png')}
            name="Sunny"
            phase="Luteal Phase (2 Days)"
            cravings={cravings}
            mood={mood}
            status={status}
            // cravings="Salt and Vinegar Chips"
            // mood="Lazy"
            // status="Stay home and watch movies."
            barColor = {styles.colors.pink2} //"#FFD54F" // custom yellow bar
            />

      
      <Pressable
        style={styles.buttonContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Edit</Text>
      </Pressable>

      {/* <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity> */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Cycle Info</Text>

            {/* <TextInput
              style={styles.input}
              placeholder="Phase"
              value={tempPhase}
              onChangeText={setTempPhase}
            /> */}
            <TextInput
              style={styles.input}
              placeholder="Cravings"
              value={tempCravings}
              onChangeText={setTempCravings}
            />
            <TextInput
              style={styles.input}
              placeholder="Mood"
              value={tempMood}
              onChangeText={setTempMood}
            />
            <TextInput
              style={styles.input}
              placeholder="Status"
              value={tempStatus}
              onChangeText={setTempStatus}
            />

            <View style={styles.buttonRow}>
                <Pressable
                    style={styles.buttonContainer}
                    onPress={() => handleCancel()}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
                <Pressable
                    style={styles.buttonContainer}
                    onPress={() => handleConfirm()}
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </Pressable>
              {/* <Button title="Cancel" onPress={handleCancel} />
              <Button title="Confirm" onPress={handleConfirm} /> */}
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
    </View>
  );
}