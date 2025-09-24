import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: 'center', // Căn giữa toàn bộ component
  },
  imageSection: {
    alignItems: 'center', // Căn giữa theo chiều dọc
    width: '100%',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 15, // Khoảng cách dưới ảnh
  },
  avatar: {
    width: 100, // Tăng kích thước ảnh
    height: 100,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  placeholderContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#dee2e6',
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: '#6c757d',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 8,
  },
  placeholderIcon: {
    fontSize: 32,
    color: '#6c757d',
    marginBottom: 5,
  },
  uploadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadingText: {
    color: 'white',
    marginTop: 5,
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row', // Các nút nằm ngang
    justifyContent: 'center',
    marginTop: 10,
    gap: 12, // Khoảng cách giữa các nút
    width: '100%',
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 120,
    borderWidth: 1,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  dangerButton: {
    backgroundColor: 'transparent',
    borderColor: '#dc3545',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  dangerButtonText: {
    color: '#dc3545',
    fontWeight: '600',
    fontSize: 14,
  },
  // Thêm styles cho icon ảnh
  imageIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
    tintColor: '#6c757d',
  },
});