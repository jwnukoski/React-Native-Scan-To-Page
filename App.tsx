// @ts-nocheck
import React, { useRef } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Camera from './Camera';
import Frame from './Frame';

/* Needed for WebView bug */
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.sendMessageToWebview = this.sendMessageToWebview.bind(this);
    
    this.frameRef = React.createRef();

    this.styles = StyleSheet.create({
      container: {
        width: deviceWidth,
        height: deviceHeight
      },
    });
  }

  sendMessageToWebview(data: String) {
    if (this.frameRef.current) {
      console.log(`sendMessageToWebview: ${data}`)
      this.frameRef.current.sendMessageToWebview(data)
    }
  }

  render() {
    return (
      <View style={this.styles.container}>
        <Camera sendMessageToWebview={this.sendMessageToWebview}/>
        <Frame ref={this.frameRef}/>
      </View>
    );
  }
}

export default App;