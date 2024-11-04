import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'rgb(230, 230, 250)', 
  },
  appTitle: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#4a90e2', 
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#6c757d', 
    marginBottom: 24,
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
    color: '#333',
    textAlign: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4a90e2',
  },
  movieButton: {
    width: '90%',
    padding: 12,
    marginVertical: 8,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    borderRadius: 8,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  balance: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e8b57', 
    marginVertical: 16,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  expenseText: {
    fontSize: 16,
    color: '#333',
  },
  image: {
    width: 200, 
    height: 200, 
    marginTop: 20,
    resizeMode: 'contain', 
  },
});

export default styles;
