import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333'
  },
  inputGroup: {
    marginBottom: 15
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontWeight: '500'
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd'
  },
   actionButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 16,
    },
       submitButton: {
         minWidth: 140,
         backgroundColor: '#3498db',
         paddingVertical: 15,
         paddingHorizontal: 24,
         borderRadius: 8,
         alignItems: 'center',
       },
       submitButtonText: {
         color: 'white',
         fontSize: 16,
         fontWeight: 'bold'
       },
         cancelButton: {
           minWidth: 100,
           backgroundColor: '#e31c1c',
           paddingVertical: 15,
           paddingHorizontal: 20,
           borderRadius: 8,
           alignItems: 'center',
           borderWidth: 1,
           borderColor: '#ddd',
         },
         cancelButtonText: {
           color: 'white',
           fontSize: 16,
           fontWeight: 'bold'
         },

});