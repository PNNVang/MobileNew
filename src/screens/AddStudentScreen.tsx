import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { styles } from '../styles/addStudentStyles';
import axios from 'axios';

const AddStudentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [studentInfo, setStudentInfo] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    class: '',
    gpa: '',
    imageUrl: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setStudentInfo({
      ...studentInfo,
      [field]: value,
    });
  };

  // Mở thư viện ảnh
  const handleChoosePhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      setStudentInfo({
        ...studentInfo,
        imageUrl: result.assets[0].uri || '',
      });
    }
  };

  // Validate email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate GPA
  const validateGPA = (gpa: string) => {
    if (!gpa) return true;
    const gpaValue = parseFloat(gpa);
    return !isNaN(gpaValue) && gpaValue >= 0 && gpaValue <= 4;
  };

  const handleSubmit = async () => {
    if (!studentInfo.id.trim() || !studentInfo.name.trim() || !studentInfo.email.trim()) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin bắt buộc (*)');
      return;
    }

    if (!validateEmail(studentInfo.email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ');
      return;
    }

    if (!validateGPA(studentInfo.gpa)) {
      Alert.alert('Lỗi', 'GPA phải là số từ 0 đến 4');
      return;
    }

    if (studentInfo.id.trim().length < 3) {
      Alert.alert('Lỗi', 'Mã số sinh viên phải có ít nhất 3 ký tự');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("http://10.0.2.2:8080/api/students", {
        name: studentInfo.name,
        className: studentInfo.class,
        email: studentInfo.email,
        phone: studentInfo.phone,
        gpa: studentInfo.gpa ? parseFloat(studentInfo.gpa) : null,
        avatar: studentInfo.imageUrl,
        mssv: studentInfo.id,
      });

      console.log("API trả về:", response.data);

      Alert.alert("Thành công", "Đã thêm sinh viên thành công", [
        {
          text: "OK",
          onPress: () => {
            // Reload HomeScreen giống cơ chế xóa
            if (route.params?.onAdd) {
              route.params.onAdd();
            }

            // Reset form
            setStudentInfo({
              id: "",
              name: "",
              email: "",
              phone: "",
              class: "",
              gpa: "",
              imageUrl: "",
            });

            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Không thể thêm sinh viên");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Chọn ảnh đại diện */}
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          {studentInfo.imageUrl ? (
            <Image
              source={{ uri: studentInfo.imageUrl }}
              style={{ width: 120, height: 120, borderRadius: 60 }}
            />
          ) : (
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                borderWidth: 1,
                borderColor: '#ccc',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>Chọn ảnh đại diện</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Form nhập thông tin */}
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

      {/* Nút hành động */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Đang xử lý...' : 'Thêm sinh viên'}
          </Text>
        </TouchableOpacity>

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

export default AddStudentScreen;
