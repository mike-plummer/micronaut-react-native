import { Platform, StyleSheet } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import * as React from 'react';
import { connect } from 'react-redux';
import { MRN } from '../model';
import { Routes } from './routes';
import { InfoScreen } from '../screens/info/InfoScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LoginScreen } from '../screens/login/LoginScreen';
import { AuthActionCreators } from './store/auth/auth.actioncreators';
import { UserScreen } from '../screens/user/UserScreen';
import { isEmpty } from 'lodash';

const icon_prefix = Platform.select({
  ios: 'ios-',
  android: 'md-'
});

interface OwnProps {}
interface DispatchProps {
  onLogin: (username: string, password: string) => MRN.Actions.Auth.Login;
}
interface StateProps {
  auth: MRN.State.Auth
}
type Props = OwnProps & DispatchProps & StateProps;

const Info = createStackNavigator({
  [Routes.Info]: {
    screen: InfoScreen,
    path: '/info',
    navigationOptions: () => ({
      title: 'Info'
    })
  }
}, {
  initialRouteName: Routes.Info
});

const User = createStackNavigator({
  [Routes.User]: {
    screen: UserScreen,
    path: '/user',
    navigationOptions: () => ({
      title: 'User'
    })
  }
}, {
  initialRouteName: Routes.User
});

const Content = createBottomTabNavigator({
  Info: { screen: Info },
  User: { screen: User }
}, {
  initialRouteName: Routes.Info,
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let icon;
      switch (routeName) {
        case Routes.Info:
          icon = 'checkmark';
          break;
        case Routes.User:
          icon = 'person';
          break;
        default:
          throw new Error('Unknown route');
      }
      return <Ionicons name={icon_prefix + icon} size={25} color={tintColor as string} />
    },
    tabBarOptions: {
      style: styles.navbar,
      activeTintColor: 'white',
      inactiveTingColor: 'gray'
    }
  })
});

class App extends React.Component<Props> {
  render(): React.ReactNode {
    const { auth, onLogin } = this.props;

    return (
      <React.Fragment>
        {!isEmpty(auth.user) ? (
          <Content />
        ) : (
          <LoginScreen onLogin={onLogin} loginError={auth.error} loggingIn={auth.loading} />
        )}
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: 'blue'
  }
});

const mapDispatchToProps: DispatchProps = {
  onLogin: AuthActionCreators.login
};

const mapStateToProps = (state: MRN.State.State): StateProps => ({
  auth: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(App);