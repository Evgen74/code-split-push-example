import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet((theme) => ({
  view: {
    flex: 1,
    backgroundColor: 'white',
    padding: theme.paddings.p16,
  },
  section: {
    marginBottom: theme.paddings.p24,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.paddings.p16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: theme.paddings.p8,
  },
  settingsImage: {
    width: 24,
    height: 24,
    marginRight: theme.paddings.p8,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.paddings.p12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingLabel: {
    fontSize: 16,
    color: 'black',
  },
  languageButton: {
    paddingHorizontal: theme.paddings.p12,
    paddingVertical: theme.paddings.p6,
    borderRadius: theme.raounding.r4,
    backgroundColor: '#007AFF',
  },
  languageButtonText: {
    color: 'white',
    fontSize: 14,
  },
}));
