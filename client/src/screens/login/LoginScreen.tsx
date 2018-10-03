import * as React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import { TextField } from '../../components/textField/TextField';
import { MRN } from '../../model';

interface Props {
  onLogin: (username: string, password: string) => void;
}

class LoginScreenComponent extends React.Component<Props> {
  private readonly onLogin = (values: MRN.Forms.LoginForm): void => {
    this.props.onLogin(values.username, values.password);
  };

  private readonly validate = (values: MRN.Forms.LoginForm): object => {
    return {};
  };

  render(): React.ReactNode {
    return (
      <View style={styles.container}>
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
                <Button title="Login" onPress={handleSubmit}/>
              </View>
            )
          }
        </Formik>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export {
  LoginScreenComponent as LoginScreen
}