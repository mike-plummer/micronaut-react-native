import * as React from 'react';
import { StyleSheet, Switch, SwitchProps, Text, TextInput, TextInputProps, View } from 'react-native';

interface Props extends SwitchProps {
  error?: string | null;
  label: string;
}

const SwitchFieldComponent: React.SFC<Props> =({ label, error, ...rest }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <Switch style={styles.field} {...rest} />
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
  },
  error: {
    fontSize: 10,
    color: 'red',
    marginTop: 5
  }
});

export {
  SwitchFieldComponent as SwitchField
}