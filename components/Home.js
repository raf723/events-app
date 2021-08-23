// Home page fetching events from API and displaying a list of Event components

import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native'

// Component imports
import Search from './Search'
import Event from './Event'

const Home = ({ navigation }) => {
  const [ inputText, setInputText ] = useState('')
  const [ events, setEvents ] = useState([])
  const [ filteredEvents, setFilteredEvents ] = useState([])

  // Fetch events
  async function getEvents() {
    try {
      const eventbrite = await fetch(`https://thedistance.co.uk/wp-content/uploads/2020/01/eventbrite.json`)
      const response = await eventbrite.json()

       // Store all events in a state that won't be mutated once set
      setEvents(response.events)

      // Also store all events in a state that may be mutated depending on the <Search/> query
      setFilteredEvents(response.events)
    } catch {
      Alert.alert('Error', 'Cannot fetch events at the moment. Please try again later.')
    }
  }

  // Set states
  useEffect(() => { getEvents() }, [])

  // Filter events based on <Search/> query
  const eventsFilter = (inputString) => {
    setInputText(inputString)

    // Filter events based on if the event description contains the <Search/> query
    const filteredEvents = events.filter((event) => event.description.text.includes(inputString))

    // If we never had a filteredEvents state, the events state would have been mutated
    // And events may have been lost once the user clears their search query from the <Search/> component
    // E.g. I search 'Snoop' and an event shows up
    // After I backspace the search query, all the original events will show up because they were still stored
    setFilteredEvents(filteredEvents)
  }

  // Navigate to detail page on event pressed
  const eventHandler = (selectedEvent) => {
    navigation.push('Detail', {
      event: selectedEvent
    })
  }

  return (
    <View style={ styles.container }>
      <ScrollView style={ styles.eventsScroll }>
        <Search value={ inputText } onChangeHandler={ (text) => eventsFilter(text) } />
        <Text style={ styles.sectionTitle }>Upcoming events</Text>
        <View style={ styles.eventsList }>
          {/* For each event in the state's events array, render a touchable component */}
          { filteredEvents.map((event, index) => {
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
    fontWeight: 'bold',
    marginTop: 20
  },

  eventsList: {
    marginTop: 16,
    marginBottom: 50
  }
})

export default Home
