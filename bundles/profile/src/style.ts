import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: theme.paddings.p20,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.paddings.p20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: theme.raounding.rounded,
    marginBottom: theme.paddings.p10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: theme.paddings.p4,
  },
  age: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#f5f5f5',
    padding: theme.paddings.p16,
    borderRadius: theme.raounding.r10,
    marginBottom: theme.paddings.p20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: theme.paddings.p10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.paddings.p8,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: theme.paddings.p16,
    borderRadius: theme.raounding.r8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
}));
