// As a user, I want to be able to search for events by category so that I'm saving time

import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

const Search = (props) => {
  return (
    <View style={ styles.container }>
      <TextInput
        value={ props.value }
        style={ styles.input }
        placeholder="Search for an event"
        onChangeText={ (text) => props.onChangeHandler(text) }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#D4D8DD'
  }
})

export default Search
