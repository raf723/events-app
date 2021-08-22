// Home page fetching events from API and displaying a list of Event components

import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native'

// Component imports
import Event from './Event'

const Home = ({ navigation }) => {
  const [ events, setEvents ] = useState([])

  // Fetch events and set to state
  useEffect(() => {
    async function getEvents() {
      try {
        const eventbrite = await fetch(`https://thedistance.co.uk/wp-content/uploads/2020/01/eventbrite.json`)
        const response = await eventbrite.json()
        setEvents(response.events)
      } catch {
        Alert.alert('Error', 'Cannot fetch events at the moment. Please try again later.')
      }
    }
    getEvents();
  }, [])

  // Navigate to detail page on event pressed
  const eventHandler = (selectedEvent) => {
    navigation.push('Detail', {
      event: selectedEvent
    })
  }

  return (
    <View style={ styles.container }>
      <ScrollView style={ styles.eventsScroll }>
        <Text style={ styles.sectionTitle }>Upcoming events</Text>
        <View style={ styles.eventsList }>
          {/* For each event in the state's events array, render a touchable component */}
          { events.map((event, index) => {
            return (
              <TouchableOpacity key={ index } onPress={ () => eventHandler(event) }>
                <Event name={ event.name.text } date={ event.start.utc } image={ event.logo.url } />
              </TouchableOpacity>
            )
          }) }
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED'
  },

  eventsScroll: {
    paddingTop: 70,
    paddingHorizontal: 20,
    marginBottom: 30
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },

  eventsList: {
    marginTop: 16,
    marginBottom: 50
  }
})

export default Home
