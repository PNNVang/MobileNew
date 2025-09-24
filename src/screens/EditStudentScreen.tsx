import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ScrollView, Platform, PermissionsAndroid} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ImagePicker from '../components/ImagePicker';
import { styles } from '../styles/editStudentStyles.ts';

const EditStudentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); // lấy thông tin về route hiện tại
  const { student } = route.params; // route.params chứa dữ liệu được truyền từ màn hình trước đó

  // State để lưu trữ thông tin sinh viên
  const [studentInfo, setStudentInfo] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    class: '',
    gpa: '',
    imageUrl: '',
  });

   // Load dữ liệu sinh viên từ route.params vào state studentInfo khi màn hình được mở
    useEffect(() => {
      if (student) {
        setStudentInfo({
          id: student.mssv || '',
          name: student.name || '',
          email: student.email || '',
          phone: student.phone || '',
          class: student.class || '',
          gpa: student.gpa ? student.gpa.toString() : '',
          imageUrl: student.imageUrl || '',
        });
      }
    }, [student]);


  // State để quản lý trạng thái gửi form
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Hàm xử lý thay đổi dữ liệu trong các trường nhập
  const handleInputChange = (field: string, value: string) => {
    setStudentInfo({
      ...studentInfo,
      [field]: value
    });
  };

  // Hàm xử lý khi ảnh được chọn
  const handleImageSelected = (imageUrl: string) => {
    setStudentInfo({
      ...studentInfo,
      imageUrl: imageUrl
    });
  };

  // Hàm validate email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Hàm validate GPA
  const validateGPA = (gpa: string) => {
    if (!gpa) return true; // GPA không bắt buộc
    const gpaValue = parseFloat(gpa);
    return !isNaN(gpaValue) && gpaValue >= 0 && gpaValue <= 4;
  };

  // Hàm xử lý khi submit form
  const handleSubmit = () => {
    // Kiểm tra các trường bắt buộc
    if (!studentInfo.id.trim() || !studentInfo.name.trim() || !studentInfo.email.trim()) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin bắt buộc (*)');
      return;
    }

    // Validate email
    if (!validateEmail(studentInfo.email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ');
      return;
    }

    // Validate GPA
    if (!validateGPA(studentInfo.gpa)) {
      Alert.alert('Lỗi', 'GPA phải là số từ 0 đến 4');
      return;
    }

    // Validate MSSV (ít nhất 8 ký tự)
    if (studentInfo.id.trim().length < 8) {
      Alert.alert('Lỗi', 'Mã số sinh viên phải có ít nhất 8 ký tự');
      return;
    }

    setIsSubmitting(true);

    //Xử lý API lưu thông tin sinh viên
    setTimeout(() => {
      console.log('Thông tin sinh viên:', {
        ...studentInfo,
        gpa: studentInfo.gpa ? parseFloat(studentInfo.gpa) : null
      });

      setIsSubmitting(false);
      Alert.alert(
        'Thành công',
        'Đã cập nhật thông tin sinh viên thành công',
       );
    }, 1500);
  };

  return (
      <View style={styles.container}>
        {/* Component chọn ảnh đại diện */}
        <ImagePicker
          onImageSelected={handleImageSelected}
          currentImage={studentInfo.imageUrl}
          placeholderText="Chọn ảnh đại diện"
        />

        {/* Form thông tin sinh viên */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mã số sinh viên *</Text>
            <TextInput
              style={styles.input}
              value={studentInfo.id}
              onChangeText={(text) => handleInputChange('id', text)}
              placeholder="Nhập mã số sinh viên"
              placeholderTextColor="#999"
              maxLength={20}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Họ và tên *</Text>
            <TextInput
              style={styles.input}
              value={studentInfo.name}
              onChangeText={(text) => handleInputChange('name', text)}
              placeholder="Nhập họ và tên"
              placeholderTextColor="#999"
              maxLength={50}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={studentInfo.email}
              onChangeText={(text) => handleInputChange('email', text)}
              placeholder="Nhập email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Số điện thoại</Text>
            <TextInput
              style={styles.input}
              value={studentInfo.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              placeholder="Nhập số điện thoại"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              maxLength={15}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Lớp</Text>
            <TextInput
              style={styles.input}
              value={studentInfo.class}
              onChangeText={(text) => handleInputChange('class', text)}
              placeholder="Nhập lớp"
              placeholderTextColor="#999"
              maxLength={20}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>GPA</Text>
            <TextInput
              style={styles.input}
              value={studentInfo.gpa}
              onChangeText={(text) => handleInputChange('gpa', text)}
              placeholder="Nhập GPA (0-4)"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
              maxLength={4}
            />
          </View>
        </View>

        <View style={styles.actionButtonsContainer}>
        {/* Nút cập nhật sinh viên */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            isSubmitting && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Đang xử lý...' : 'Cập nhật sinh viên'}
          </Text>
        </TouchableOpacity>

        {/* Nút hủy */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          disabled={isSubmitting}
        >
          <Text style={styles.cancelButtonText}>Hủy</Text>
        </TouchableOpacity>
        </View>
      </View>
  );
};

export default EditStudentScreen;