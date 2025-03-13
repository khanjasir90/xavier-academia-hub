
import { User, Class, Note, AttendanceRecord } from './types';

// Mock Users
export const getMockUsers = (): User[] => [
  {
    id: 'admin1',
    username: 'admin',
    password: 'admin123', // In a real app, passwords would be hashed
    name: 'Admin User',
    email: 'admin@xavier.edu',
    role: 'admin',
    imageUrl: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
  },
  {
    id: 'teacher1',
    username: 'teacher',
    password: 'teacher123',
    name: 'Dr. Jane Smith',
    email: 'jane.smith@xavier.edu',
    role: 'teacher',
    imageUrl: 'https://ui-avatars.com/api/?name=Jane+Smith&background=0D8ABC&color=fff',
    department: 'Computer Science',
    classIds: ['cs101', 'cs201', 'math101'],
  },
  {
    id: 'teacher2',
    username: 'teacher2',
    password: 'teacher123',
    name: 'Prof. Michael Johnson',
    email: 'michael.johnson@xavier.edu',
    role: 'teacher',
    department: 'Mathematics',
    classIds: ['math101', 'math201'],
  },
  {
    id: 'student1',
    username: 'student',
    password: 'student123',
    name: 'Alex Wong',
    email: 'alex.wong@xavier.edu',
    role: 'student',
    imageUrl: 'https://ui-avatars.com/api/?name=Alex+Wong&background=0D8ABC&color=fff',
    studentId: 'XC2023001',
    classIds: ['cs101', 'math101', 'eng101'],
    attendanceRecords: [
      { classId: 'cs101', date: '2023-09-01', status: 'present' },
      { classId: 'cs101', date: '2023-09-03', status: 'present' },
      { classId: 'cs101', date: '2023-09-05', status: 'absent' },
      { classId: 'math101', date: '2023-09-02', status: 'present' },
      { classId: 'math101', date: '2023-09-04', status: 'present' },
    ],
  },
  {
    id: 'student2',
    username: 'student2',
    password: 'student123',
    name: 'Emily Chen',
    email: 'emily.chen@xavier.edu',
    role: 'student',
    studentId: 'XC2023002',
    classIds: ['cs101', 'cs201', 'eng101'],
    attendanceRecords: [
      { classId: 'cs101', date: '2023-09-01', status: 'present' },
      { classId: 'cs101', date: '2023-09-03', status: 'absent' },
      { classId: 'cs101', date: '2023-09-05', status: 'present' },
      { classId: 'cs201', date: '2023-09-02', status: 'present' },
      { classId: 'cs201', date: '2023-09-04', status: 'present' },
    ],
  },
];

// Mock Classes
const mockClasses: Class[] = [
  {
    id: 'cs101',
    name: 'Introduction to Computer Science',
    subjectCode: 'CS101',
    description: 'Fundamentals of computer science, including algorithms, programming concepts, and computational thinking.',
    teacherId: 'teacher1',
    teacherName: 'Dr. Jane Smith',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    schedule: [
      { day: 'Monday', startTime: '10:00 AM', endTime: '11:30 AM', room: 'CS Building 101' },
      { day: 'Wednesday', startTime: '10:00 AM', endTime: '11:30 AM', room: 'CS Building 101' },
    ],
    studentIds: ['student1', 'student2'],
    notes: [
      { id: 'note1', title: 'Introduction to Algorithms', content: 'Algorithms are step-by-step procedures for calculations...', date: '2023-09-01', attachments: [] },
      { id: 'note2', title: 'Control Structures', content: 'Control structures are the blocks that analyze variables...', date: '2023-09-03', attachments: [] },
    ],
  },
  {
    id: 'cs201',
    name: 'Data Structures and Algorithms',
    subjectCode: 'CS201',
    description: 'Study of data structures, algorithms, and their applications in solving computational problems.',
    teacherId: 'teacher1',
    teacherName: 'Dr. Jane Smith',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    schedule: [
      { day: 'Tuesday', startTime: '2:00 PM', endTime: '3:30 PM', room: 'CS Building 202' },
      { day: 'Thursday', startTime: '2:00 PM', endTime: '3:30 PM', room: 'CS Building 202' },
    ],
    studentIds: ['student2'],
    notes: [
      { id: 'note3', title: 'Arrays and Linked Lists', content: 'Arrays and linked lists are fundamental data structures...', date: '2023-09-02', attachments: [] },
    ],
  },
  {
    id: 'math101',
    name: 'Calculus I',
    subjectCode: 'MATH101',
    description: 'Introduction to differential and integral calculus, with applications.',
    teacherId: 'teacher2',
    teacherName: 'Prof. Michael Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
    schedule: [
      { day: 'Monday', startTime: '1:00 PM', endTime: '2:30 PM', room: 'Math Building 101' },
      { day: 'Friday', startTime: '1:00 PM', endTime: '2:30 PM', room: 'Math Building 101' },
    ],
    studentIds: ['student1'],
    notes: [
      { id: 'note4', title: 'Limits and Continuity', content: 'A limit is the value that a function approaches...', date: '2023-09-04', attachments: [] },
    ],
  },
  {
    id: 'eng101',
    name: 'English Composition',
    subjectCode: 'ENG101',
    description: 'Fundamentals of academic writing, critical reading, and rhetorical analysis.',
    teacherId: 'teacher2',
    teacherName: 'Prof. Sarah Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8',
    schedule: [
      { day: 'Wednesday', startTime: '3:00 PM', endTime: '4:30 PM', room: 'Arts Building 101' },
      { day: 'Friday', startTime: '3:00 PM', endTime: '4:30 PM', room: 'Arts Building 101' },
    ],
    studentIds: ['student1', 'student2'],
    notes: [
      { id: 'note5', title: 'Essay Structure', content: 'A well-structured essay includes an introduction, body paragraphs...', date: '2023-09-05', attachments: [] },
    ],
  },
  {
    id: 'math201',
    name: 'Calculus II',
    subjectCode: 'MATH201',
    description: 'Advanced topics in calculus, including integration techniques, series, and applications.',
    teacherId: 'teacher2',
    teacherName: 'Prof. Michael Johnson',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904',
    schedule: [
      { day: 'Tuesday', startTime: '10:00 AM', endTime: '11:30 AM', room: 'Math Building 201' },
      { day: 'Thursday', startTime: '10:00 AM', endTime: '11:30 AM', room: 'Math Building 201' },
    ],
    studentIds: [],
    notes: [],
  },
];

// Get all classes
export const getAllClasses = (): Class[] => {
  return mockClasses;
};

// Get classes for a specific user
export const getClassesForUser = (userId: string): Class[] => {
  const users = getMockUsers();
  const user = users.find(u => u.id === userId);
  
  if (!user) return [];
  
  if (user.role === 'admin') {
    return mockClasses;
  }
  
  if (user.role === 'teacher') {
    return mockClasses.filter(c => c.teacherId === userId);
  }
  
  if (user.role === 'student') {
    return mockClasses.filter(c => c.studentIds.includes(userId));
  }
  
  return [];
};

// Get a specific class by ID
export const getClassById = (classId: string): Class | undefined => {
  return mockClasses.find(c => c.id === classId);
};

// Get notes for a specific class
export const getNotesForClass = (classId: string): Note[] => {
  const classData = mockClasses.find(c => c.id === classId);
  return classData?.notes || [];
};

// Get attendance records for a student
export const getAttendanceForStudent = (studentId: string): AttendanceRecord[] => {
  const users = getMockUsers();
  const student = users.find(u => u.id === studentId && u.role === 'student');
  return student?.attendanceRecords || [];
};

// Calculate attendance percentage for a student in a specific class
export const calculateAttendancePercentage = (studentId: string, classId: string): number => {
  const records = getAttendanceForStudent(studentId).filter(r => r.classId === classId);
  
  if (records.length === 0) return 0;
  
  const presentCount = records.filter(r => r.status === 'present').length;
  return Math.round((presentCount / records.length) * 100);
};
