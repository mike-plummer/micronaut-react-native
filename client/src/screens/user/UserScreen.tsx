import * as React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { MRN } from '../../model';
import { AuthActionCreators } from '../../app/store/auth/auth.actioncreators';

interface OwnProps {}
interface DispatchProps {
  onLogout: () => MRN.Actions.Auth.Logout;
}
interface StateProps {
  user: MRN.Structs.User;
}

type Props = OwnProps & DispatchProps & StateProps;

class UserScreenComponent extends React.Component<Props> {
  private readonly logout = (): void => {
    this.props.onLogout();
  };

  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Button title="Logout" onPress={this.logout} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapDispatchToProps: DispatchProps = {
  onLogout: AuthActionCreators.logout
};

const mapStateToProps = (state: MRN.State.State): StateProps => ({
  user: state.auth.user
});

const ConnectedUserScreen = connect(mapStateToProps, mapDispatchToProps)(UserScreenComponent);

export {
  UserScreenComponent,
  ConnectedUserScreen as UserScreen
}