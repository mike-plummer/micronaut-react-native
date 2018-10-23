import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { MRN } from '../../model';
import { AuthActionCreators } from '../../app/store/auth/auth.actioncreators';
import { SwitchField } from '../../components/textField/SwitchField';

interface OwnProps {}
interface DispatchProps {
  onLogout: () => MRN.Actions.Auth.Logout;
  setAutoRefresh: (autoRefresh: boolean) => MRN.Actions.Auth.SetAutoRefresh;
}
interface StateProps {
  autoRefresh: boolean;
  expired: boolean;
  lastTokenRefresh: string;
  user: MRN.Structs.User;
}

type Props = OwnProps & DispatchProps & StateProps;

class UserScreenComponent extends React.Component<Props> {
  private readonly logout = (): void => {
    this.props.onLogout();
  };

  private readonly onChangeAutoRefresh = (value: boolean): void => {
    this.props.setAutoRefresh(value);
  };

  render(): React.ReactNode {
    const { autoRefresh, expired, lastTokenRefresh, user } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Text>Username: {user.username}</Text>
          <Text>Roles: {user.roles.join(', ')}</Text>
          <Text>Token Last Refreshed: {lastTokenRefresh}</Text>
          {expired && (<Text style={styles.expired}>TOKEN EXPIRED</Text>)}
        </View>
        <SwitchField label="Auto-Refresh Access Token" onValueChange={this.onChangeAutoRefresh} value={autoRefresh} />
        <Text>The app will automatically refresh your AccessToken when it expires using your RefreshToken</Text>
        <Button title="Logout" onPress={this.logout} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 20
  },
  userInfo: {
    margin: 5,
    textAlign: 'center'
  },
  expired: {
    color: 'red',
    fontWeight: 'bold'
  }
});

const mapDispatchToProps: DispatchProps = {
  onLogout: AuthActionCreators.logout,
  setAutoRefresh: AuthActionCreators.setAutoRefresh
};

const mapStateToProps = (state: MRN.State.State): StateProps => ({
  autoRefresh: state.auth.autoRefresh,
  lastTokenRefresh: state.auth.lastTokenRefresh,
  expired: state.auth.expired,
  user: state.auth.user
});

const ConnectedUserScreen = connect(mapStateToProps, mapDispatchToProps)(UserScreenComponent);

export {
  UserScreenComponent,
  ConnectedUserScreen as UserScreen
}