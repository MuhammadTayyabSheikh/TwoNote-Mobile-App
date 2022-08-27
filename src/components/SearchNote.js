import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import colors from '../config/colors';

function SearchNote({ query, handleSearch }) {
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="never"
        focusable={true}
        value={query}
        onChangeText={queryText => handleSearch(queryText)}
        placeholder="Search"
        style={{ paddingHorizontal: 3, color: colors.tershary1, fontSize: 18, position: 'relative', top: 0, focusable: "true" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.quaternary,
    padding: 10,
    marginVertical: 10,
    borderRadius: 7
  }
})

export default SearchNote;