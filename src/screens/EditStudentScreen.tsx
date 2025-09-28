import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Alert, TouchableOpacity} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from '../styles/editStudentStyles.ts';

const EditStudentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { student } = route.params;

  const [studentInfo, setStudentInfo] = useState({
    id: '',
    mssv: '',
    name: '',
    email: '',
    phone: '',
    className: '',
    gpa: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (student) {
      setStudentInfo({
        id: student.id || '',
        mssv: student.mssv || '',
        name: student.name || '',
        email: student.email || '',
        phone: student.phone || '',
        className: student.className || '',
        gpa: student.gpa ? student.gpa.toString() : '',
        imageUrl: student.avatar || '',
      });
    }
  }, [student]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setStudentInfo({
      ...studentInfo,
      [field]: value,
    });
  };

  // Mở thư viện xử lý chọn ảnh
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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateGPA = (gpa: string) => {
    if (!gpa) return true;
    const gpaValue = parseFloat(gpa);
    return !isNaN(gpaValue) && gpaValue >= 0 && gpaValue <= 4;
  };

  // Hàm xử lý việc gửi form
  const handleSubmit = () => {
    if (!studentInfo.name.trim() || !studentInfo.email.trim()) {
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

    if (studentInfo.mssv.trim().length < 8) {
      Alert.alert('Lỗi', 'Mã số sinh viên phải có ít nhất 8 ký tự');
      return;
    }

    setIsSubmitting(true);

    // Gọi API cập nhật thông tin sinh viên theo id
    fetch(`http://10.0.2.2:8080/api/students/${studentInfo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: studentInfo.id,
        mssv: studentInfo.mssv,
        name: studentInfo.name,
        email: studentInfo.email,
        phone: studentInfo.phone,
        className: studentInfo.className,
        gpa: studentInfo.gpa ? parseFloat(studentInfo.gpa) : null,
        avatar: studentInfo.imageUrl,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Lỗi cập nhật');
        return res.json();
      })
      .then(() => {
        Alert.alert('Thành công', 'Đã cập nhật thông tin sinh viên');
        navigation.goBack();
      })
      .catch((err) => {
        console.error('Lỗi khi cập nhật:', err);
        Alert.alert('Lỗi', 'Không thể cập nhật sinh viên');
      })
      .finally(() => setIsSubmitting(false));
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

      <KeyboardAwareScrollView
                  style={{ flex: 1, backgroundColor: '#fff' }}
                  contentContainerStyle={{ padding: 10 }}
                  enableOnAndroid={true}
                  extraScrollHeight={20}>
          {/* Form cập nhật thông tin sinh viên */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mã số sinh viên *</Text>
              <TextInput
                style={styles.input}
                value={studentInfo.mssv}
                onChangeText={(text) => handleInputChange('mssv', text)}
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
                value={studentInfo.className}
                onChangeText={(text) => handleInputChange('className', text)}
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
                {isSubmitting ? 'Đang xử lý...' : 'Cập nhật sinh viên'}
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
      </KeyboardAwareScrollView>
      </View>
  );
};

export default EditStudentScreen;
