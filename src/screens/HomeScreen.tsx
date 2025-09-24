import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/homeStyles.ts';

const HomeScreen = () => {
  const navigation = useNavigation(); // Trả về một đối tượng navigation chứa các phương thức

  // Khai báo state cho popup
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

 // Khai báo state cho việc xử lý lọc sinh viên
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // Dữ liệu mẫu
  const students = [
    { id: 1, name: 'Nguyễn Văn A', mssv: 'SV001', gpa: 3.8, class: 'CNTT01', imageUrl: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_incoming&w=740&q=80' },
    { id: 2, name: 'Trần Thị B', mssv: 'SV002', gpa: 3.5, class: 'CNTT02', imageUrl: null },
    { id: 3, name: 'Lê Văn C', mssv: 'SV003', gpa: 3.2, class: 'CNTT01', imageUrl: null },
  ];

  // Hàm mở popup thông tin chi tiết sinh viên
  const openStudentDetail = (student) => {
     setSelectedStudent(student);
     setModalVisible(true);
  };

  // Hàm đóng popup thông tin chi tiết sinh viên
  const closeStudentDetail = () => {
     setModalVisible(false);
     setSelectedStudent(null);
  };

    // Hàm xử lý lọc
    const handleFilter = (type: string) => {
      setFilterType(type);
      setShowFilterMenu(false);
      console.log(`Đã chọn lọc theo: ${type}`);
    };

    // Hàm xóa lọc
    const clearFilter = () => {
      setFilterType(null);
      setShowFilterMenu(false);
      console.log('Đã xóa lọc');
    };

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm sinh viên */}
      <View style={styles.searchContainer}>
            <Image source={require('../../assets/icons/search.png')} style={{ width: 20, height: 20, marginRight: 8 }} />
            <TextInput style={styles.searchStudent} placeholder="Nhập mã số sinh viên" />
      </View>

      {/* Danh sách sinh viên */}
      <ScrollView style={styles.listContainer}>
      {/* Header + nút lọc */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>DANH SÁCH SINH VIÊN</Text>
        <TouchableOpacity
          onPress={() => setShowFilterMenu(prev => !prev)}
          style={styles.filterButton}
        >
          <Text style={styles.filterButtonText}>
            {showFilterMenu ? 'Đóng △' : 'Lọc ▽'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Menu lọc */}
        {showFilterMenu && (
          <View style={styles.filterMenuOverlay}>
            <View style={styles.filterMenu}>
              <TouchableOpacity style={styles.filterOption} onPress={() => handleFilter('name')}>
                <Text style={styles.filterOptionText}>Theo tên A-Z</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.filterOption} onPress={() => handleFilter('gpa')}>
                <Text style={styles.filterOptionText}>Theo GPA cao nhất</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.clearFilterButton} onPress={clearFilter}>
                <Text style={styles.clearFilterText}>Xóa lọc</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Load danh sách sinh viên */}
        {students.map((student) => ( // Tạo 1 component card cho mỗi student trong array students
            // Tạo key cho mỗi item student trong list bằng ID duy nhất
          <TouchableOpacity key={student.id} style={styles.studentCard}
          onPress={(() => openStudentDetail(student))}
          onLongPress={() => {
              Alert.alert(
                `${student.name}`,
                'Bạn muốn làm gì?',
                [
                  { text: 'Hủy', style: 'cancel' },
                  { text: 'Cập Nhật', onPress: () => navigation.navigate('EditStudentScreen', { student: student }) },
                  { text: 'Xóa', onPress: () => deleteStudent(student.id), style: 'destructive' },
                ]
              );
          }}>
            {/* Bên trái card là ảnh sinh viên */}
              <View style={styles.avatarContainer}>
                {/* Nếu student có imageUrl thì hiển thị ảnh, còn không thì hiển thị placeholder */}
                 {student.imageUrl ? (
                    <Image source={{ uri: student.imageUrl }} style={styles.avatar} />
                 ) : ( <View style={styles.avatarPlaceholder}>
                      <Text style={styles.avatarText}>
                        {student.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                  )}
              </View>

            {/* Bên phải card là thông tin sinh viên */}
            <View style={styles.infoContainer}>
                 <View style={styles.cardHeader}>
                   <Text style={styles.studentName}>{student.name}</Text>
                   <Text style={styles.studentId}>{student.mssv}</Text>
                 </View>

                 <View style={styles.cardBody}>
                   <View style={styles.infoRow}>
                     <Text style={styles.label}>Lớp:</Text>
                     <Text style={styles.value}>{student.class}</Text>
                   </View>

                   <View style={styles.infoRow}>
                     <Text style={styles.label}>GPA:</Text>
                     <Text style={[styles.value, styles.gpa]}>{student.gpa}</Text>
                   </View>
                 </View>

                 <View style={styles.cardFooter}>
                   <Text style={styles.moreInfo}>Chạm để xem chi tiết →</Text>
                 </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Popup chi tiết sinh viên */}
      <Modal animationType="slide"
         transparent={true}
         visible={modalVisible}
         onRequestClose={closeStudentDetail}>
           <View style={styles.modalOverlay}>
             <View style={styles.modalContent}>
               {selectedStudent && (
                  <>
                      {/* Header popup */}
                      <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Thông tin chi tiết</Text>
                        <TouchableOpacity onPress={closeStudentDetail}>
                          <Text style={styles.closeButton}>×</Text>
                        </TouchableOpacity>
                      </View>

                      {/* Nội dung popup */}
                      <View style={styles.modalBody}>
                        <View style={styles.studentInfo}>
                          {selectedStudent.imageUrl ? (
                            <Image
                              source={{ uri: selectedStudent.imageUrl }}
                              style={styles.modalAvatar}
                            />
                          ) : (
                            <View style={styles.modalAvatarPlaceholder}>
                              <Text style={styles.modalAvatarText}>
                                {selectedStudent.name.charAt(0).toUpperCase()}
                              </Text>
                            </View>
                          )}

                          <Text style={styles.modalName}>{selectedStudent.name}</Text>
                          <Text style={styles.modalId}>{selectedStudent.mssv}</Text>
                        </View>

                        <View style={styles.detailInfo}>
                          <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Lớp:</Text>
                            <Text style={styles.detailValue}>{selectedStudent.class}</Text>
                          </View>

                          <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>GPA:</Text>
                            <Text style={[styles.detailValue, styles.gpaHighlight]}>
                              {selectedStudent.gpa}
                            </Text>
                          </View>

                          <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Email:</Text>
                            <Text style={styles.detailValue}>{selectedStudent.email || 'Chưa có'}</Text>
                          </View>

                          <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>SĐT:</Text>
                            <Text style={styles.detailValue}>{selectedStudent.phone || 'Chưa có'}</Text>
                          </View>
                        </View>
                      </View>

                      {/* Footer popup */}
                      <View style={styles.modalFooter}>
                        <TouchableOpacity
                          style={styles.closeModalButton}
                          onPress={closeStudentDetail}
                        >
                          <Text style={styles.closeModalText}>Đóng</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </View>
              </View>
            </Modal>

      {/* Nút thêm sinh viên */}
      <TouchableOpacity style={styles.addStudent} onPress={() => navigation.navigate('AddStudentScreen')}>
        <Text style={styles.addStudentText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;