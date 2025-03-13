
import { User, UserRole, Class, Attendance, AttendanceSummary, AttendanceRecord } from "./types";

// Users data
const users: User[] = [
  {
    id: "1",
    username: "admin",
    password: "admin123",
    name: "Admin User",
    email: "admin@xavier.edu",
    role: "admin",
    imageUrl: "https://ui-avatars.com/api/?name=Admin+User&background=0061A8&color=fff",
  },
  {
    id: "2",
    username: "teacher",
    password: "teacher123",
    name: "Jennifer Smith",
    email: "j.smith@xavier.edu",
    role: "teacher",
    imageUrl: "https://ui-avatars.com/api/?name=Jennifer+Smith&background=0061A8&color=fff",
    department: "Computer Science",
  },
  {
    id: "3",
    username: "student",
    password: "student123",
    name: "Michael Johnson",
    email: "m.johnson@xavier.edu",
    role: "student",
    imageUrl: "https://ui-avatars.com/api/?name=Michael+Johnson&background=0061A8&color=fff",
    studentId: "ST12345",
    classIds: ["class1", "class2", "class3"],
    attendanceRecords: [
      { classId: "class1", date: "2023-05-01", status: "present" },
      { classId: "class1", date: "2023-05-02", status: "present" },
      { classId: "class1", date: "2023-05-03", status: "absent" },
      { classId: "class2", date: "2023-05-01", status: "present" },
      { classId: "class2", date: "2023-05-02", status: "absent" },
    ]
  },
  {
    id: "4",
    username: "student2",
    password: "student123",
    name: "Sarah Brown",
    email: "s.brown@xavier.edu",
    role: "student",
    imageUrl: "https://ui-avatars.com/api/?name=Sarah+Brown&background=0061A8&color=fff",
    studentId: "ST12346",
    classIds: ["class1", "class3"],
    attendanceRecords: [
      { classId: "class1", date: "2023-05-01", status: "present" },
      { classId: "class1", date: "2023-05-02", status: "absent" },
      { classId: "class1", date: "2023-05-03", status: "present" },
      { classId: "class3", date: "2023-05-01", status: "present" },
      { classId: "class3", date: "2023-05-02", status: "present" },
    ]
  },
  {
    id: "5",
    username: "teacher2",
    password: "teacher123",
    name: "David Wilson",
    email: "d.wilson@xavier.edu",
    role: "teacher",
    imageUrl: "https://ui-avatars.com/api/?name=David+Wilson&background=0061A8&color=fff",
    department: "Mathematics",
  }
];

// Classes data
const classes: Class[] = [
  {
    id: "class1",
    name: "Introduction to Computer Science",
    description: "Basic concepts of computer science and programming",
    teacherId: "2",
    teacherName: "Jennifer Smith",
    subjectCode: "CS101",
    schedule: [
      { day: "Monday", startTime: "09:00", endTime: "10:30", room: "CS Lab 1" },
      { day: "Wednesday", startTime: "09:00", endTime: "10:30", room: "CS Lab 1" },
    ],
    studentIds: ["3", "4"],
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
    notes: [
      {
        id: "note1", 
        classId: "class1",
        title: "Introduction to Programming",
        content: "Basic concepts of programming and algorithms",
        createdAt: "2023-05-01T10:00:00Z",
        updatedAt: "2023-05-01T10:00:00Z",
      },
      {
        id: "note2",
        classId: "class1",
        title: "Variables and Data Types",
        content: "Understanding variables, constants, and primitive data types",
        createdAt: "2023-05-08T10:00:00Z",
        updatedAt: "2023-05-08T10:00:00Z",
      }
    ]
  },
  {
    id: "class2",
    name: "Web Development Fundamentals",
    description: "Introduction to HTML, CSS, and JavaScript",
    teacherId: "2",
    teacherName: "Jennifer Smith",
    subjectCode: "CS201",
    schedule: [
      { day: "Tuesday", startTime: "11:00", endTime: "12:30", room: "CS Lab 2" },
      { day: "Thursday", startTime: "11:00", endTime: "12:30", room: "CS Lab 2" },
    ],
    studentIds: ["3"],
    imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166",
    notes: [
      {
        id: "note3",
        classId: "class2",
        title: "HTML Basics",
        content: "Introduction to HTML structure and elements",
        createdAt: "2023-05-02T11:00:00Z",
        updatedAt: "2023-05-02T11:00:00Z",
      }
    ]
  },
  {
    id: "class3",
    name: "Calculus I",
    description: "Introduction to differential calculus",
    teacherId: "5",
    teacherName: "David Wilson",
    subjectCode: "MATH101",
    schedule: [
      { day: "Monday", startTime: "13:00", endTime: "14:30", room: "Math Hall 1" },
      { day: "Wednesday", startTime: "13:00", endTime: "14:30", room: "Math Hall 1" },
    ],
    studentIds: ["3", "4"],
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
    notes: [
      {
        id: "note4",
        classId: "class3",
        title: "Limits and Continuity",
        content: "Understanding the concept of limits and continuity",
        createdAt: "2023-05-01T13:00:00Z",
        updatedAt: "2023-05-01T13:00:00Z",
      }
    ]
  },
  {
    id: "class4",
    name: "Data Structures",
    description: "Advanced data structures and algorithms",
    teacherId: "2",
    teacherName: "Jennifer Smith",
    subjectCode: "CS301",
    schedule: [
      { day: "Tuesday", startTime: "14:00", endTime: "15:30", room: "CS Lab 3" },
      { day: "Thursday", startTime: "14:00", endTime: "15:30", room: "CS Lab 1" },
    ],
    studentIds: [],
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    notes: [
      {
        id: "note5",
        classId: "class4",
        title: "Arrays and Linked Lists",
        content: "Understanding basic data structures: arrays and linked lists",
        createdAt: "2023-05-03T14:00:00Z",
        updatedAt: "2023-05-03T14:00:00Z",
      }
    ]
  },
  {
    id: "class5",
    name: "Probability and Statistics",
    description: "Introduction to probability theory and statistics",
    teacherId: "5",
    teacherName: "David Wilson",
    subjectCode: "MATH201",
    schedule: [
      { day: "Monday", startTime: "15:00", endTime: "16:30", room: "Math Hall 2" },
      { day: "Friday", startTime: "13:00", endTime: "14:30", room: "Math Hall 3" },
    ],
    studentIds: [],
    imageUrl: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d",
    notes: []
  }
];

// Mock login function
export const mockLogin = (username: string, password: string): User | null => {
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    // Remove password before storing in localStorage
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    return userWithoutPassword as User;
  }
  
  return null;
};

// Generate attendance summary
export const generateAttendanceSummary = (classId: string): AttendanceSummary[] => {
  const classItem = classes.find(c => c.id === classId);
  if (!classItem) return [];
  
  return classItem.studentIds.map(studentId => {
    const student = users.find(u => u.id === studentId);
    if (!student || !student.attendanceRecords) return {
      studentId,
      studentName: 'Unknown Student',
      totalClasses: 0,
      presentClasses: 0,
      percentage: 0
    };
    
    const records = student.attendanceRecords.filter(rec => rec.classId === classId);
    const totalClasses = records.length;
    const presentClasses = records.filter(rec => rec.status === 'present').length;
    
    return {
      studentId,
      studentName: student.name,
      totalClasses,
      presentClasses,
      percentage: totalClasses > 0 ? Math.round((presentClasses / totalClasses) * 100) : 0
    };
  });
};

export { users, classes };
