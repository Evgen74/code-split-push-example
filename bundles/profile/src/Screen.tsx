import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { stylesheet } from './style';
import { observer } from 'mobx-react-lite';
import { Profile } from './model';

const model = new Profile();

export const Screen = observer(() => {
  const { state } = model;
  const { user } = state;

  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./profile.png')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user?.name} {user?.lastname}</Text>
        <Text style={styles.age}>{user?.age} years old</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{user?.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Last Name:</Text>
          <Text style={styles.value}>{user?.lastname}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>{user?.age}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={model.navigateToSettings}
      >
        <Text style={styles.buttonText}>Go to Settings</Text>
      </TouchableOpacity>
    </View>
  );
});
