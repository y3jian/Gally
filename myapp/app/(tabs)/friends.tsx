import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, TextInput, Modal, TouchableOpacity, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from './../styles/theme'; // import our shared styles
import CycleCard from '../../components/cycle_card';


export default function TabTwoScreen() {
    const [query, setQuery] = useState('');

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
                source={require('../../assets/images/short_background.png')} // local image
                style={styles.shortBackgroundImage}
                resizeMode="cover" // or 'contain', depending on your image
            >

                <Text style={[styles.tabTitle, { marginTop: 40 }]}>Your Status</Text>

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
                    barColor={styles.colors.pink2} //"#FFD54F" // custom yellow bar
                />


                <Pressable
                    style={styles.buttonContainer}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.buttonText}>Edit Your Status</Text>
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

                {/* <Text style={styles.tabTitle}>Find Friends</Text>

    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#888" style={styles.text} />
      <TextInput
        style={styles.loginInput}
        placeholder="Search..."
        placeholderTextColor={styles.colors.card}
        value={query}
        onChangeText={setQuery}
      />
    </View> */}

                <Text style={styles.tabTitle}>Your Friends</Text>


                <CycleCard
                    image={require('../../assets/animations/green/4.5.png')}
                    name="Gally"
                    phase="Luteal Phase (2 Days)" 
                    cravings="Salt and Vinegar Chips"
                    mood="Lazy"
                    status="Stay home and watch movies."
                    barColor={styles.colors.button} //"#FFD54F" // custom yellow bar
                />
                <CycleCard
                    image={require('../../assets/images/mascot.png')}
                    name="Luna"
                    phase="Follicular Phase (5 Days)"
                    cravings="Chocolate"
                    mood="Slay"
                    status="Go for ice cream with friends"
                    barColor={styles.colors.pink2} //"#FFD54F" // custom yellow bar
                />

            </ImageBackground>
        </View>
    );
}