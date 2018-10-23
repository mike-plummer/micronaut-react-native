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
  data: MRN.State.Data;
}

type Props = OwnProps & DispatchProps & StateProps;

class InfoScreenComponent extends React.Component<Props> {
  private readonly fetchData = (): void => {
    this.props.fetchData();
  };

  render(): React.ReactNode {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>You're logged in!</Text>
        <View style={styles.data}>
          <Text>Pull data from a secured endpoint using your AccessToken</Text>
          <Button title="Reload" onPress={this.fetchData} disabled={data.loading} />
          {data.loading && (<ActivityIndicator />)}
          {!data.loading && (<Text>{data.data}</Text>)}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  data: {
    margin: 5
  },
  info: {
    fontSize: 14
  },
  error: {
    color: 'red'
  },
  header: {
    fontSize: 18,
    marginBottom: 10
  }
});

const mapDispatchToProps: DispatchProps = {
  fetchData: DataActionCreators.fetch
};

const mapStateToProps = (state: MRN.State.State): StateProps => ({
  data: state.data
});

const ConnectedInfoScreen = connect(mapStateToProps, mapDispatchToProps)(InfoScreenComponent);

export {
  InfoScreenComponent,
  ConnectedInfoScreen as InfoScreen
}