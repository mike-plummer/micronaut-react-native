import * as React from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import { TextField } from '../../components/textField/TextField';
import { MRN } from '../../model';

interface Props {
  loggingIn: boolean;
  loginError: string | null;
  onLogin: (username: string, password: string) => void;
}

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class LoginScreenComponent extends React.Component<Props> {
  private readonly onLogin = (values: MRN.Forms.LoginForm): void => {
    this.props.onLogin(values.username, values.password);
  };

  private readonly validate = (values: MRN.Forms.LoginForm): object => {
    const errors = {} as MRN.Forms.LoginForm;
    if (!values.username) {
      errors.username = 'Username is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  render(): React.ReactNode {
    const { loggingIn, loginError } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>{instructions}</Text>

        <Formik
          initialValues={{} as MRN.Forms.LoginForm}
          validate={this.validate}
          onSubmit={this.onLogin}
        >
          {
            ({ values, errors, touched, handleChange, handleSubmit, handleReset, isSubmitting }) => (
              <View>
                <TextField
                  label="Username"
                  value={values.username}
                  error={errors.username}
                  onChangeText={handleChange('username')}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoFocus={true}
                  textContentType="username"
                />
                <TextField
                  label="Password"
                  value={values.password}
                  error={errors.password}
                  onChangeText={handleChange('password')}
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="password"
                  secureTextEntry={true}
                />
                <Button title="Login" onPress={handleSubmit} disabled={loggingIn}/>
              </View>
            )
          }
        </Formik>
        {loginError && (
          <Text style={styles.error}>{loginError}</Text>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  error: {
    color: 'red'
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 5
  }
});

export {
  LoginScreenComponent as LoginScreen
}