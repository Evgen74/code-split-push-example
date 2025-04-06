import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet((theme) => ({
  view: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: 'black',
    margin: theme.paddings.p20,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  navigation: {
    marginTop: theme.paddings.p20,
    gap: theme.paddings.p20,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'black',
    padding: theme.paddings.p10,
  },
}));
