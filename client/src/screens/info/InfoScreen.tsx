import * as React from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { MRN } from '../../model';
import { DataActionCreators } from '../../app/store/data/data.actioncreators';

interface OwnProps {}
interface DispatchProps {
  fetchData: () => MRN.Actions.Data.Fetch;
}
interface StateProps {
  user: MRN.Structs.User;
  data: MRN.State.Data;
}

type Props = OwnProps & DispatchProps & StateProps;

class InfoScreenComponent extends React.Component<Props> {
  private readonly fetchData = (): void => {
    this.props.fetchData();
  };

  render(): React.ReactNode {
    const { user, data } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Text style={styles.header}>You're logged in!</Text>
          <Text>{user.username}</Text>
          <Text>{user.roles.join(', ')}</Text>
        </View>
        <View style={styles.data}>
          {data.loading && (<ActivityIndicator  />)}
          <Text>{data.data}</Text>
          <Button title="Reload" onPress={this.fetchData} />
          {data.error && (
            <Text style={styles.error}>{data.error}</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  userInfo: {
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 4
  },
  data: {
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 4
  },
  header: {
    fontSize: 18,
    marginBottom: 10
  },
  error: {
    color: 'red'
  }
});

const mapDispatchToProps: DispatchProps = {
  fetchData: DataActionCreators.fetch
};

const mapStateToProps = (state: MRN.State.State): StateProps => ({
  user: state.auth.user,
  data: state.data
});

const ConnectedInfoScreen = connect(mapStateToProps, mapDispatchToProps)(InfoScreenComponent);

export {
  InfoScreenComponent,
  ConnectedInfoScreen as InfoScreen
}