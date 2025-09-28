import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Pressable, Image, Modal, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { styles } from '../styles/homeStyles.ts';

const HomeScreen = () => {
  const navigation = useNavigation();

  // State sinh viên
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // State popup thông tin chi tiết sinh viên
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // State sắp xếp
  const [filterType, setFilterType] = useState<string | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  // State thống kê
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState<any>(null);

  // State tìm kiếm sinh viên
  const [searchQuery, setSearchQuery] = useState("");

  // gọi API lấy danh sách sinh viên
  const fetchStudents = () => {
    // ⚠️ nếu chạy trên emulator Android dùng 10.0.2.2 thay cho localhost
    axios.get('http://10.0.2.2:8080/api/students')
      .then(res => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

   useFocusEffect(
      useCallback(() => {
        fetchStudents();
      }, [])
    );

  // popup chi tiết
  const openStudentDetail = (student: any) => {
    setSelectedStudent(student);
    setModalVisible(true);
  };

  const closeStudentDetail = () => {
    setModalVisible(false);
    setSelectedStudent(null);
  };

  // Xử lý nút sắp xếp
  const handleFilter = (type: string) => {
    if (type === "gpa") {
      sortStudentsByGPA();
      setFilterType("gpa");
    } else if (type === "name") {
      setFilterType("name");
    }
    setShowFilterMenu(false);
  };

  const clearFilter = () => {
    setFilterType(null);
    fetchStudents();
    setShowFilterMenu(false);
  };

  const getFilteredStudents = () => {
    if (!Array.isArray(students)) return [];
    if (!filterType) return students;
    // Sắp xếp sinh viên theo tên
    if (filterType === "name") {
      return [...students].sort((a, b) => {
        const lastNameA = a.name.trim().split(" ").slice(-1)[0];
        const lastNameB = b.name.trim().split(" ").slice(-1)[0];
        return lastNameA.localeCompare(lastNameB);
      });
    }
    return students;
  };

  // Hàm tìm kiếm theo MSSV hoặc Tên
    const handleSearch = (query: string) => {
      if (!query.trim()) {
        // load lại danh sách
        setLoading(true);
        fetch("http://10.0.2.2:8080/api/students")
          .then((res) => res.json())
          .then((data) => setStudents(data))
          .catch((err) => console.error("Lỗi load danh sách:", err))
          .finally(() => setLoading(false));
        return;
      }

      if (/^\d+$/.test(query.trim())) {
        // Tìm MSSV
        setLoading(true);
        fetch(`http://10.0.2.2:8080/api/students/mssv/${query}`)
          .then((res) => (res.status === 404 ? null : res.json()))
          .then((data) => setStudents(data ? [data] : []))
          .catch((err) => console.error("Lỗi tìm theo MSSV:", err))
          .finally(() => setLoading(false));
      } else {
        // Tìm tên
        setLoading(true);
        fetch(`http://10.0.2.2:8080/api/students/search?name=${query}`)
          .then((res) => res.json())
          .then((data) => setStudents(data))
          .catch((err) => console.error("Lỗi tìm theo tên:", err))
          .finally(() => setLoading(false));
      }
    };

      // Gọi API thống kê
      const fetchClassification = async () => {
        try {
          const res = await axios.get('http://10.0.2.2:8080/api/students/stats/classification');
          setStats(res.data);
        } catch (err) {
          console.error(err);
          Alert.alert("Lỗi", "Không thể tải dữ liệu xếp loại");
        }
      };

      // Gọi API sắp xếp sinh viên theo GPA
      const sortStudentsByGPA = async () => {
        try {
          const res = await axios.get("http://10.0.2.2:8080/api/students/sort-by-gpa");
          setStudents(res.data);
        } catch (err) {
          console.error("API error:", err);
          Alert.alert("Lỗi", "Không thể tải danh sách Top GPA");
        }
      };


  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
            <Image
              source={require("../../assets/icons/search.png")}
              style={{ width: 20, height: 20, marginRight: 8 }}/>
              <TextInput
                style={styles.searchStudent}
                placeholder="Nhập MSSV hoặc tên sinh viên"
                value={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  handleSearch(text); // gọi luôn khi gõ
                }}
                returnKeyType="search"/>
          </View>

      <ScrollView style={styles.listContainer}>
        {/* Header + nút sắp xếp */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>DANH SÁCH SINH VIÊN</Text>
          <TouchableOpacity
            onPress={() => setShowFilterMenu(prev => !prev)}
            style={styles.filterButton}
          >
            <Text style={styles.filterButtonText}>
              {showFilterMenu ? 'Đóng △' : 'Sắp xếp ▽'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Menu sắp xếp */}
        {showFilterMenu && (
          <View style={styles.filterMenuOverlay}>
            <View style={styles.filterMenu}>
              <Pressable
                onPress={() => handleFilter('name')}
                style={({ pressed }) => [
                  styles.filterOption,
                  filterType === 'name' && { backgroundColor: '#dfe6e9' }, // màu khi đã chọn
                  pressed && { backgroundColor: '#b2bec3' }, // màu khi đang nhấn
                ]}
              >
                <Text style={styles.filterOptionText}>Sắp xếp theo tên A-Z</Text>
              </Pressable>

              <Pressable
                onPress={() => handleFilter('gpa')}
                style={({ pressed }) => [
                  styles.filterOption,
                  filterType === 'gpa' && { backgroundColor: '#dfe6e9' },
                  pressed && { backgroundColor: '#b2bec3' },
                ]}
              >
                <Text style={styles.filterOptionText}>Sắp xếp theo GPA</Text>
              </Pressable>
              <TouchableOpacity style={styles.clearFilterButton} onPress={clearFilter}>
                <Text style={styles.clearFilterText}>Xóa lọc</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Loading */}
        {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <ScrollView style={styles.listStudentContainer}>
        {/* Danh sách sinh viên */}
        {getFilteredStudents().map((student) => (
          <TouchableOpacity
            key={student.id}
            style={styles.studentCard}
            onPress={() => openStudentDetail(student)}
            onLongPress={() => {
              Alert.alert(
                `${student.name}`,
                'Bạn muốn làm gì?',
                [
                  { text: 'Hủy', style: 'cancel' },
                  { text: 'Cập Nhật', onPress: () => navigation.navigate('EditStudentScreen', { student }) },
                  {
                    text: 'Xóa',
                    onPress: () => {
                      axios.delete(`http://10.0.2.2:8080/api/students/${student.id}`)
                        .then(() => fetchStudents())
                        .catch(err => console.error(err));
                    },
                    style: 'destructive'
                  },
                ]
              );
            }}>
            <View style={styles.avatarContainer}>
              {student.avatar ? (
                <Image source={{ uri: student.avatar }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>
                    {student.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.cardHeader}>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.studentId}>{student.mssv}</Text>
              </View>
              <View style={styles.cardBody}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Lớp:</Text>
                  <Text style={styles.value}>{student.className}</Text>
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
      </ScrollView>

      {/* Popup thông tin chi tiết sinh viên */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeStudentDetail}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedStudent && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Thông tin chi tiết</Text>
                  <TouchableOpacity onPress={closeStudentDetail}>
                    <Text style={styles.closeButton}>×</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.modalBody}>
                  <View style={styles.studentInfo}>
                    {selectedStudent.avatar ? (
                      <Image source={{ uri: selectedStudent.avatar }} style={styles.modalAvatar} />
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
                      <Text style={styles.detailValue}>{selectedStudent.className}</Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>GPA:</Text>
                      <Text style={[styles.detailValue, styles.gpaHighlight]}>{selectedStudent.gpa}</Text>
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
                <View style={styles.modalFooter}>
                  <TouchableOpacity style={styles.closeModalButton} onPress={closeStudentDetail}>
                    <Text style={styles.closeModalText}>Đóng</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

 {/* Nút mở thống kê */}
 <TouchableOpacity
   style={styles.statsButton}
   onPress={() => {
     fetchClassification();
     setShowStats(true);
   }}
 >
   <Text style={styles.statsButtonText}>Xem thống kê</Text>
 </TouchableOpacity>

 {/* Modal thống kê */}
 <Modal visible={showStats} transparent animationType="fade">
   <View style={styles.modalStatisticOverlay}>
     <View style={styles.modalStatisticContent}>
       <Text style={styles.modalStatisticTitle}>Thống kê xếp loại</Text>

       {stats && (
         <View style={styles.modalStatisticBody}>
           <Text style={styles.statItem}>✨ Xuất sắc: <Text style={styles.bold}>{stats["Xuất sắc"]}</Text></Text>
           <Text style={styles.statItem}>🏅 Giỏi: <Text style={styles.bold}>{stats["Giỏi"]}</Text></Text>
           <Text style={styles.statItem}>👍 Khá: <Text style={styles.bold}>{stats["Khá"]}</Text></Text>
           <Text style={styles.statItem}>📉 Trung bình/Yếu: <Text style={styles.bold}>{stats["Trung bình/Yếu"]}</Text></Text>
         </View>
       )}

       <TouchableOpacity
         style={styles.closeModalButton}
         onPress={() => setShowStats(false)}
       >
         <Text style={styles.closeModalText}>Đóng</Text>
       </TouchableOpacity>
     </View>
   </View>
 </Modal>
      {/* nút thêm sinh viên */}
      <TouchableOpacity
        style={styles.addStudent}
        onPress={() => navigation.navigate('AddStudentScreen', { onAdd: fetchStudents })}
      >
        <Text style={styles.addStudentText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
