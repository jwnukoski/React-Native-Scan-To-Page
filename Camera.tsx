// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';
// https://docs.expo.dev/versions/latest/sdk/bar-code-scanner/

export default function Camera(props) {
  const [showCam, setShowCam] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    props.sendMessageToWebview(data);
    setShowCam(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      { 
        showCam 
          ? <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={StyleSheet.absoluteFillObject}/>
          : <Button color='#0070d0' title='Click here to begin' onPress={() => {
                setShowCam(!showCam);
            }} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
