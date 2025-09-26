import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  calculator: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  display: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  displayText: {
    color: '#ffffff',
    fontSize: 48,
    fontWeight: '300',
  },
  buttons: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    height: 80,
    backgroundColor: '#333333',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  functionButton: {
    backgroundColor: '#a6a6a6',
  },
  operatorButton: {
    backgroundColor: '#ff9500',
  },
  zeroButton: {
    flex: 2,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '500',
  },
});
