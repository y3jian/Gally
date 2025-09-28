import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // install this
import { useThemedStyles } from '../app/styles/theme';

export default function FlowModal({ visible, onClose, onSave }: {
  visible: boolean;
  onClose: () => void;
  onSave: (data: { date: Date; flow: string; symptoms: string }) => void;
}) {
  const styles = useThemedStyles();

  const [date, setDate] = useState(new Date());
  const [flow, setFlow] = useState<'Heavy' | 'Medium' | 'Light' | ''>('');
  const [symptoms, setSymptoms] = useState('');

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      {/* darkened backdrop */}
      <View style={styles.modalBackdrop}>
        {/* content card */}
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Track Flow</Text>

          {/* Date picker */}
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) =>
              setDate(selectedDate || date)
            }
          />

          {/* Flow choice */}
          <View style={styles.flowChoiceContainer}>
            {['Heavy', 'Medium', 'Light'].map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.flowOption,
                  flow === option && styles.flowOptionSelected,
                ]}
                onPress={() => setFlow(option as 'Heavy' | 'Medium' | 'Light')}
              >
                <Text
                  style={[
                    styles.flowOptionText,
                    flow === option && styles.flowOptionTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Symptoms input */}
          <TextInput
            style={styles.symptomInput}
            placeholder="Enter symptoms..."
            placeholderTextColor="#aaa"
            value={symptoms}
            onChangeText={setSymptoms}
            multiline
          />

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <Pressable onPress={onClose} style={styles.smallButtonContainer}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                onSave({ date, flow, symptoms });
                onClose();
              }}
              style={styles.smallButtonContainer}
            >
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
