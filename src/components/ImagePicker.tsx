import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator, PermissionsAndroid } from 'react-native';
import { launchImageLibrary, launchCamera, Asset } from 'react-native-image-picker';
import { styles } from '../styles/imagePickerStyles';

// Interface trong TypeScript dùng để mô tả các thuộc tính (props) mà component sẽ nhận vào
interface ImagePickerProps {
  onImageSelected: (imageUri: string) => void; // Hàm callback nhận vào một chuỗi (đường dẫn ảnh) khi người dùng chọn ảnh
  currentImage?: string; // Dùng để hiển thị ảnh đã chọn trước đó
  placeholderText?: string;  // Văn bản hiển thị khi chưa có ảnh nào được chọn
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  onImageSelected,
  currentImage,
  placeholderText = "Chọn ảnh"
}) => {

  const [uploading, setUploading] = useState(false);

// Hàm yêu cầu quyền tải ảnh lên trên Android
  const requestAndroidPermission = async () => {
    if (Platform.OS !== 'android') return true;

    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ];

      const granted = await PermissionsAndroid.requestMultiple(permissions);

      return (
        granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

// Hiển thị một hộp thoại để người dùng chọn nguồn ảnh
  const handleImagePick = async () => {
    // Kiểm tra và yêu cầu quyền trước khi mở
    const hasPermission = await requestAndroidPermission();

    if (!hasPermission) {
      Alert.alert(
        'Quyền bị từ chối',
        'Ứng dụng cần quyền truy cập camera và thư viện ảnh để hoạt động.',
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      "Chọn ảnh đại diện",
      "Bạn muốn chọn ảnh từ đâu?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Thư viện ảnh",
          onPress: pickFromGallery
        }
      ]
    );
  };

  // Hàm bất đồng bộ để thực hiện thao tác chọn ảnh từ thư viện
const pickFromGallery = async () => {
  try {

    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: false,
      selectionLimit: 1,
    });

    // Xử lý các trường hợp lỗi
    if (result.didCancel) {
      return; // Người dùng hủy, không làm gì cả
    }

    if (result.errorCode) {
      Alert.alert('Lỗi', `Không thể mở thư viện: ${result.errorMessage}`);
      return;
    }

    if (result.assets && result.assets[0]) {
      handleImageSelected(result.assets[0]);
    }
  } catch (error) {
    console.error('Lỗi chọn ảnh:', error);
    Alert.alert('Lỗi', 'Không thể mở thư viện ảnh');
  }
};


  // Hàm xử lý ảnh được chọn
  const handleImageSelected = (asset: Asset) => { // Nhận vào một ảnh (asset) mà người dùng đã chọn từ thư viện
    if (asset.uri) {
      setUploading(true);

      // Giả lập quá trình upload ảnh bằng setTimeout trong 1 giây
      setTimeout(() => {
        onImageSelected(asset.uri!);
        setUploading(false);
      }, 1000);
    }
  };

  const removeImage = () => {
    Alert.alert(
      "Xóa ảnh",
      "Bạn có chắc muốn xóa ảnh đại diện?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Xóa",
          onPress: () => onImageSelected('') // Nếu người dùng chọn "Xóa", thì truyền chuỗi rỗng để xóa ảnh hiện tại
        }
      ]
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.imageSection}>
        {/* Hiển thị ảnh hiện tại */}
        {currentImage ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: currentImage }} style={styles.avatar} />
            {uploading && (
              <View style={styles.uploadingOverlay}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={styles.uploadingText}>Đang tải lên...</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>Chưa có ảnh</Text>
          </View>
        )}

        {/* Nút hành động */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleImagePick}
            disabled={uploading}
          >
            <Text style={styles.buttonText}>
              {currentImage ? 'Đổi ảnh' : 'Chọn ảnh'}
            </Text>
          </TouchableOpacity>

          {currentImage && !uploading && (
            <TouchableOpacity
              style={[styles.button, styles.dangerButton]}
              onPress={removeImage}
            >
              <Text style={styles.dangerButtonText}>Xóa</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default ImagePicker;