import React from 'react';
import { Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { stylesheet } from './style';

export const Component = () => {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.view}>
      <Text style={styles.text}>This is Shared Component</Text>
    </View>
  );
};
