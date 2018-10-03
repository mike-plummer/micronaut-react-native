import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { MRN } from '../../model';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

interface OwnProps {}
interface DispatchProps {}
interface StateProps {}

type Props = OwnProps & DispatchProps & StateProps;

class InfoScreenComponent extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 5
  }
});

const mapDispatchToProps: DispatchProps = {

};

const mapStateToProps = (state: MRN.State.State): StateProps => ({

});

const ConnectedInfoScreen = connect(mapStateToProps, mapDispatchToProps)(InfoScreenComponent);

export {
  InfoScreenComponent,
  ConnectedInfoScreen as InfoScreen
}