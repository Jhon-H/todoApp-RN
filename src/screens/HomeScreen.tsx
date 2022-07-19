import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CardGoal from '../components/CardGoal';
import { GoalsContext } from '../context/GoalsProvider';
import { styles } from '../utils/theme/appTheme';


const HomeScreen = () => {
  const navigate = useNavigation()
  const { goals } = useContext(GoalsContext)

  return (
    <ScrollView
      style={{
        ...styles.globalMargin,
        ...stylesScreen.container
      }}
      showsVerticalScrollIndicator={false}
    >

      {/* Header */}
      <View style={stylesScreen.header}>
        <Text style={ stylesScreen.title }>Goals</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={stylesScreen.headerButton}
          onPress={() => navigate.navigate('NewCardGoalScreen' as any)}
        >
          <Text style={ stylesScreen.headerButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* section to filter */}
      <View><Text>----</Text></View>

      {/* Goals */}
      <View style={ stylesScreen.goalsList }>
        {
          goals.map(goal => (
            <CardGoal
              key={goal.id}
              {...goal}
            />
          ) )
        }
      </View>

    </ScrollView>
  )
}

const stylesScreen = StyleSheet.create({
  container: {
  },
  header: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 37,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'rgba(0,0,0,0.8)'
  },
  headerButtonText: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 18
  },
  goalsList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
  }
});

export default HomeScreen
