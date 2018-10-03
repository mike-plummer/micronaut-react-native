import * as React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface Props extends TextInputProps {
  error?: string | null;
  label: string;
}

const TextFieldComponent: React.SFC<Props> =({ label, onChange, error, value, ...rest }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.field} value={value} {...rest} />
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 14,
    marginBottom: 5
  },
  field: {
    width: '100%',
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 5
  },
  error: {
    fontSize: 10,
    color: 'red',
    marginTop: 5
  }
});

export {
  TextFieldComponent as TextField
}