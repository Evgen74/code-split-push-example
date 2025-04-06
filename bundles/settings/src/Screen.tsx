import React from 'react';
import { Text, View, Switch, TouchableOpacity, Image } from 'react-native';
import { useStyles } from 'react-native-unistyles';
import { stylesheet } from './style';
import { observer } from 'mobx-react-lite';
import { Settings } from './model';

const model = new Settings();

export const Screen = observer(() => {
  const { state, toggleNotifications, toggleDarkMode, toggleCP, setLanguage } = model;
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.view}>
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
        <Image
          source={require('./settings.png')}
          style={styles.settingsImage}
        />
          <Text style={styles.sectionTitle}>Preferences</Text>
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Notifications</Text>
          <Switch
            value={state.isNotificationEnabled}
            onValueChange={toggleNotifications}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={state.isDarkMode}
            onValueChange={toggleDarkMode}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>Current Language</Text>
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => setLanguage(state.language === 'en' ? 'es' : 'en')}
          >
            <Text style={styles.languageButtonText}>
              {state.language.toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Advanced</Text>
        <View style={styles.settingRow}>
          <Text style={styles.settingLabel}>CP Mode</Text>
          <Switch
            value={state.isCPEnabled}
            onValueChange={toggleCP}
          />
        </View>
      </View>
    </View>
  );
});
