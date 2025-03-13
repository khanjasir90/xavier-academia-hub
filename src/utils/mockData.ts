
import { User, Class, Note, Attendance, AttendanceSummary } from './types';

// Mock Users
export const users: User[] = [
  {
    id: 'admin1',
    name: 'Admin User',
    email: 'admin@xaviers.edu',
    role: 'admin',
    imageUrl: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff'
  },
  {
    id: 'teacher1',
    name: 'Dr. Sarah Johnson',
    email: 'sjohnson@xaviers.edu',
    role: 'teacher',
    imageUrl: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=0D8ABC&color=fff'
  },
  {
    id: 'teacher2',
    name: 'Prof. Michael Chen',
    email: 'mchen@xaviers.edu',
    role: 'teacher',
    imageUrl: 'https://ui-avatars.com/api/?name=Michael+Chen&background=0D8ABC&color=fff'
  },
  {
    id: 'student1',
    name: 'Emily Rodriguez',
    email: 'erodriguez@xaviers.edu',
    role: 'student',
    imageUrl: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=0D8ABC&color=fff'
  },
  {
    id: 'student2',
    name: 'James Wilson',
    email: 'jwilson@xaviers.edu',
    role: 'student',
    imageUrl: 'https://ui-avatars.com/api/?name=James+Wilson&background=0D8ABC&color=fff'
  },
  {
    id: 'student3',
    name: 'Aisha Patel',
    email: 'apatel@xaviers.edu',
    role: 'student',
    imageUrl: 'https://ui-avatars.com/api/?name=Aisha+Patel&background=0D8ABC&color=fff'
  }
];

// Mock Classes
export const classes: Class[] = [
  {
    id: 'class1',
    name: 'Introduction to Computer Science',
    description: 'Fundamental concepts of computer science and programming',
    teacherId: 'teacher1',
    teacherName: 'Dr. Sarah Johnson',
    subjectCode: 'CS101',
    schedule: [
      { day: 'Monday', startTime: '10:00', endTime: '11:30' },
      { day: 'Wednesday', startTime: '10:00', endTime: '11:30' }
    ],
    studentIds: ['student1', 'student2', 'student3'],
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'
  },
  {
    id: 'class2',
    name: 'Data Structures and Algorithms',
    description: 'Advanced data structures and algorithm design',
    teacherId: 'teacher1',
    teacherName: 'Dr. Sarah Johnson',
    subjectCode: 'CS201',
    schedule: [
      { day: 'Tuesday', startTime: '13:00', endTime: '14:30' },
      { day: 'Thursday', startTime: '13:00', endTime: '14:30' }
    ],
    studentIds: ['student1', 'student3'],
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb'
  },
  {
    id: 'class3',
    name: 'Organic Chemistry',
    description: 'Study of structure, properties, and reactions of organic compounds',
    teacherId: 'teacher2',
    teacherName: 'Prof. Michael Chen',
    subjectCode: 'CHEM202',
    schedule: [
      { day: 'Monday', startTime: '14:00', endTime: '15:30' },
      { day: 'Friday', startTime: '14:00', endTime: '15:30' }
    ],
    studentIds: ['student2', 'student3'],
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d'
  }
];

// Mock Notes
export const notes: Note[] = [
  {
    id: 'note1',
    classId: 'class1',
    title: 'Introduction to Programming Concepts',
    content: 'This lecture covers the basic programming concepts including variables, data types, and control structures.',
    fileUrl: 'https://example.com/files/intro-programming.pdf',
    createdAt: '2023-09-05T10:30:00Z',
    updatedAt: '2023-09-05T10:30:00Z'
  },
  {
    id: 'note2',
    classId: 'class1',
    title: 'Functions and Methods',
    content: 'Learn about creating reusable code blocks using functions and methods.',
    fileUrl: 'https://example.com/files/functions.pdf',
    createdAt: '2023-09-12T10:30:00Z',
    updatedAt: '2023-09-12T10:30:00Z'
  },
  {
    id: 'note3',
    classId: 'class2',
    title: 'Array Data Structures',
    content: 'Understanding arrays and their operations with time complexity analysis.',
    fileUrl: 'https://example.com/files/arrays.pdf',
    createdAt: '2023-09-07T13:30:00Z',
    updatedAt: '2023-09-07T13:30:00Z'
  },
  {
    id: 'note4',
    classId: 'class3',
    title: 'Alkanes and Alkenes',
    content: 'Properties and reactions of alkanes and alkenes.',
    fileUrl: 'https://example.com/files/alkanes.pdf',
    createdAt: '2023-09-06T14:30:00Z',
    updatedAt: '2023-09-06T14:30:00Z'
  }
];

// Mock Attendance
export const attendance: Attendance[] = [
  {
    id: 'att1',
    classId: 'class1',
    date: '2023-09-04',
    studentId: 'student1',
    isPresent: true
  },
  {
    id: 'att2',
    classId: 'class1',
    date: '2023-09-04',
    studentId: 'student2',
    isPresent: true
  },
  {
    id: 'att3',
    classId: 'class1',
    date: '2023-09-04',
    studentId: 'student3',
    isPresent: false
  },
  {
    id: 'att4',
    classId: 'class1',
    date: '2023-09-06',
    studentId: 'student1',
    isPresent: true
  },
  {
    id: 'att5',
    classId: 'class1',
    date: '2023-09-06',
    studentId: 'student2',
    isPresent: true
  },
  {
    id: 'att6',
    classId: 'class1',
    date: '2023-09-06',
    studentId: 'student3',
    isPresent: true
  }
];

// Generate Attendance Summary
export const generateAttendanceSummary = (classId: string, studentId: string): AttendanceSummary => {
  const studentAttendance = attendance.filter(
    a => a.classId === classId && a.studentId === studentId
  );
  
  const totalClasses = studentAttendance.length;
  const presentClasses = studentAttendance.filter(a => a.isPresent).length;
  const percentage = totalClasses > 0 ? (presentClasses / totalClasses) * 100 : 0;
  
  const student = users.find(u => u.id === studentId);
  
  return {
    studentId,
    studentName: student?.name || 'Unknown Student',
    totalClasses,
    presentClasses,
    percentage
  };
};

// Mock Login Function
export const mockLogin = (email: string, password: string): User | null => {
  // In a real app, you would verify credentials against a database
  // For demo purposes, we're just checking if the email exists
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  return user || null;
};

// Get Classes for User
export const getClassesForUser = (userId: string): Class[] => {
  const user = users.find(u => u.id === userId);
  
  if (!user) return [];
  
  if (user.role === 'admin') {
    return classes; // Admin sees all classes
  } else if (user.role === 'teacher') {
    return classes.filter(c => c.teacherId === userId);
  } else {
    return classes.filter(c => c.studentIds.includes(userId));
  }
};

// Get Notes for Class
export const getNotesForClass = (classId: string): Note[] => {
  return notes.filter(n => n.classId === classId);
};
