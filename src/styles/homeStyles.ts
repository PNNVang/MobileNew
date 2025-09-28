import { StyleSheet } from 'react-native';

 // Tương tự như thẻ <style> trong HTML
export const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#f5f5f5',
   },
   header: {
     backgroundColor: '#2196F3',
     padding: 20,
     alignItems: 'center',
   },
   headerTitle: {
     color: 'white',
     fontSize: 20,
     fontWeight: 'bold',
   },
    searchContainer: {
       flexDirection: 'row',
       alignItems: 'center',
       borderWidth: 1,
       borderColor: '#ccc',
       backgroundColor: 'white',
       borderRadius: 8,
       paddingHorizontal: 10,
       margin: 10,
     },
     searchIcon: {
       marginRight: 8,
     },
     searchStudent: {
       flex: 1,
       height: 40,
     },
   listContainer: {
     flex: 1,
     padding: 10,
   },
   sectionTitle: {
     fontSize: 16,
     fontWeight: '600',
     marginBottom: 15,
     color: '#333',
   },
   studentCard: {
     flexDirection: 'row',
     backgroundColor: 'white',
     marginBottom: 15,
     borderRadius: 10,
     padding: 15,
     elevation: 3, // Đổ bóng phần tử
   },
     avatarContainer: {
       marginRight: 15,
     },

     avatar: {
       width: 100,
       height: 105,
       backgroundColor: '#ddd',
     },

     avatarPlaceholder: {
       width: 60,
       height: 60,
       borderRadius: 30,
       backgroundColor: '#2196F3',
       justifyContent: 'center',
       alignItems: 'center',
     },

     avatarText: {
       fontSize: 20,
       color: 'white',
       fontWeight: 'bold',
     },
   cardHeader: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     marginBottom: 10,
     borderBottomWidth: 1,
     borderBottomColor: '#eee',
     paddingBottom: 10,
   },
   studentName: {
     fontSize: 18,
     fontWeight: 'bold',
     color: '#2196F3',
   },
   studentId: {
     fontSize: 14,
     color: '#666',
   },
   cardBody: {
     marginBottom: 10,
   },
   infoRow: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     marginBottom: 5,
   },
   label: {
     fontSize: 14,
     color: '#666',
     fontWeight: '500',
   },
   value: {
     fontSize: 14,
     color: '#333',
   },
   gpa: {
     color: '#E91E63',
     fontWeight: 'bold',
   },
   cardFooter: {
     borderTopWidth: 1,
     borderTopColor: '#eee',
     paddingTop: 10,
   },
   moreInfo: {
     fontSize: 12,
     color: '#2196F3',
     textAlign: 'right',
   },
   infoContainer: {
     flex: 1, // chiếm hết phần còn lại
   },
   addStudent: {
     position: 'absolute',
     right: 20,
     bottom: 20,
     backgroundColor: '#2196F3',
     width: 60,
     height: 60,
     borderRadius: 30,
     justifyContent: 'center',
     alignItems: 'center',
     elevation: 5,
   },
   addStudentText: {
     color: 'white',
     fontSize: 24,
     fontWeight: 'bold',
   },
   // Popup chi tiết sinh viên
   modalOverlay: {
       flex: 1,
       backgroundColor: 'rgba(0, 0, 0, 0.5)',
       justifyContent: 'center',
       alignItems: 'center',
       padding: 20,
     },
     modalContent: {
       backgroundColor: 'white',
       borderRadius: 16,
       width: '100%',
       maxHeight: '80%',
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 2 },
       shadowOpacity: 0.25,
       shadowRadius: 4,
       elevation: 5,
     },
     modalHeader: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       padding: 16,
       borderBottomWidth: 1,
       borderBottomColor: '#f0f0f0',
     },
     modalTitle: {
       fontSize: 18,
       fontWeight: 'bold',
       color: '#333',
     },
     closeButton: {
       fontSize: 24,
       color: '#666',
       paddingHorizontal: 8,
     },
     modalBody: {
       padding: 16,
     },
     studentInfo: {
       alignItems: 'center',
       marginBottom: 20,
     },
     modalAvatar: {
       width: 80,
       height: 80,
       borderRadius: 40,
       marginBottom: 12,
     },
     modalAvatarPlaceholder: {
       width: 80,
       height: 80,
       borderRadius: 40,
       backgroundColor: '#4A90E2',
       justifyContent: 'center',
       alignItems: 'center',
       marginBottom: 12,
     },
     modalAvatarText: {
       color: 'white',
       fontSize: 24,
       fontWeight: 'bold',
     },
     modalName: {
       fontSize: 20,
       fontWeight: 'bold',
       marginBottom: 4,
     },
     modalId: {
       fontSize: 16,
       color: '#666',
     },
     detailInfo: {
       gap: 12,
     },
     detailRow: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       paddingVertical: 8,
       borderBottomWidth: 1,
       borderBottomColor: '#f5f5f5',
     },
     detailLabel: {
       fontSize: 16,
       color: '#666',
       fontWeight: '500',
     },
     detailValue: {
       fontSize: 16,
       color: '#333',
     },
     gpaHighlight: {
       color: '#E91E63',
       fontWeight: 'bold',
     },
     modalFooter: {
       padding: 16,
       borderTopWidth: 1,
       borderTopColor: '#f0f0f0',
     },
     closeModalButton: {
       backgroundColor: '#4A90E2',
       padding: 12,
       borderRadius: 8,
       alignItems: 'center',
     },
     closeModalText: {
       color: 'white',
       fontSize: 16,
       fontWeight: 'bold',
     },
     // Thanh sectionTitle và lọc sinh viên
       sectionHeader: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         marginBottom: 16,
       },
       sectionTitle: {
         fontSize: 18,
         fontWeight: 'bold',
         color: '#333',
       },
       filterButton: {
           backgroundColor: '#ffffff',
           paddingHorizontal: 16,
           paddingVertical: 10,
           borderRadius: 15,
           borderWidth: 1,
           borderColor: '#e0e0e0',
           shadowColor: '#000',
           shadowOffset: { width: 0, height: 2 },
           shadowOpacity: 0.1,
           shadowRadius: 4,
           elevation: 2,
       },
       filterButtonText: {
           color: '#333333',
           fontWeight: '600',
           fontSize: 14,
         },
       filterMenuOverlay: {
         position: 'absolute',
         top: 50,
         left: 230,
         right: -10,
         zIndex: 999,
         alignItems: 'center',
       },
       filterMenu: {
         backgroundColor: '#fff',
         padding: 15,
         borderRadius: 8,
         width: '90%',
         shadowColor: '#000',
         shadowOpacity: 0.2,
         shadowOffset: { width: 0, height: 2 },
         shadowRadius: 4,
         elevation: 5,
         gap: 12,
       },
   listStudentContainer: {
            flex: 1,
            padding: 5,
            maxHeight: 570,
   },
  statsButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginVertical: 10,
    marginLeft: 16,
    alignItems: 'center',
    marginBottom: 20,
    fontWeight: 700,
  },
  statsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalStatisticOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalStatisticContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  modalStatisticTitle: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#2c3e50',
  },
  modalStatisticBody: {
    marginBottom: 20,
  },
  statItem: {
    fontSize: 16,
    marginVertical: 4,
    color: '#34495e',
  },
  bold: {
    fontWeight: '700',
  },
  closeModalButton: {
    backgroundColor: '#3498db',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeModalText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

});