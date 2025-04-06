import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { stylesheet } from './style';
import { observer } from 'mobx-react-lite';
import { Home } from './model';

const model = new Home();

export const Screen = observer(() => {
  const { styles } = useStyles(stylesheet);

  useEffect(() => {
    model.loadMeta();
  }, []);

  const { state } = model;

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Home screen</Text>
      {state.isLoading && <Text style={styles.text}>Loading...</Text>}
      {state.metaArray.map((meta) => (
        <Text key={meta.name} style={styles.text}>{meta.name} - {meta.version}</Text>
      ))}
      {state.isSuccess && (
        <View style={styles.navigation}>
          <TouchableOpacity onPress={model.navigateToProfile}>
            <Text style={styles.buttonText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={model.navigateToSettings}>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
});
