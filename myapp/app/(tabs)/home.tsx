import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, Image } from 'react-native';
import { useThemedStyles } from './../styles/theme'; // import our shared styles
import GreenAnimation from '../../components/green_animation';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function Home() {
  const styles = useThemedStyles();

  const [stage, setStage] = useState(0);

  // Example rolling calendar data
  const today = new Date();
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 3 + i); // 3 days back to 3 days forward
    return {
      day: d.getDate(),
      weekDay: d.toLocaleDateString('en-US', { weekday: 'short' }),
      isToday: i === 3,
    };
  });

  const tasksInitial: Task[] = [
    { id: 1, title: 'Drink 7+ glasses of water', completed: false },
    { id: 2, title: 'Complete 30 minutes of yoga', completed: false },
    { id: 3, title: 'Eat an iron-packed lunch', completed: false },
    { id: 4, title: 'Get at least 8 hours of sleep', completed: true },
  ];

  const [tasks, setTasks] = useState<Task[]>(tasksInitial);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

    // <-- Add this effect to update stage
  useEffect(() => {
    const completedCount = tasks.filter(t => t.completed).length;
    const total = tasks.length;

    if (completedCount === total) {
      setStage(2); // all tasks done
    } else if (completedCount >= Math.ceil(total / 2)) {
      setStage(1); // half or more done
    } else {
      setStage(0); // less than half done
    }
  }, [tasks]);

  return (
    <View style={styles.container}>
      {/* Rolling Calendar */}
      <View style={styles.calendarContainer}>
        <FlatList
          horizontal
          data={days}
          keyExtractor={(item) => item.day.toString()}
          contentContainerStyle={{ justifyContent: 'center' }}
          renderItem={({ item }) => (
            <View
              style={[
                styles.calendarDay,
                item.isToday && styles.calendarDayActive
              ]}
            >
              <Text style={styles.calendarWeekDay}>{item.weekDay}</Text>
              <Text style={styles.calendarDate}>{item.day}</Text>
            </View>
          )}
        />
      </View>

      {/* Mascot */}
      {/* <Image
        source={require('../../assets/images/mascot_stars.png')}
        style={styles.mascotImage}
        resizeMode="contain"
      /> */}
      <GreenAnimation stage={stage} />

      {/* Phase */}
      <View style={styles.phaseContainer}>
        <Text style={styles.phaseDay}>Day 3</Text>
        <Text style={styles.phaseName}>Menstrual Phase</Text>
      </View>

      {/* Daily Tasks */}
      <View style={styles.taskList}>
        {tasks.map(task => (
          <Pressable key={task.id} onPress={() => toggleTask(task.id)} style={[styles.taskItem, task.completed && styles.taskItemCompleted]}>
            <Text style={styles.taskText}>{task.title}</Text>
            <View style={[styles.checkbox, task.completed && styles.checkboxChecked]} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}





// export default function ExampleScreen() {
//   const [stage, setStage] = useState(0);

//   return (
//     <View>
//       <GreenAnimation stage={stage} />

//       <Button title="Reach Halfway" onPress={() => setStage(1)} />
//       <Button title="Complete All" onPress={() => setStage(2)} />
//     </View>
//   );
// }