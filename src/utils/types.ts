
export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  imageUrl?: string;
}

export interface Class {
  id: string;
  name: string;
  description: string;
  teacherId: string;
  teacherName: string;
  subjectCode: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  studentIds: string[];
  imageUrl?: string;
}

export interface Note {
  id: string;
  classId: string;
  title: string;
  content: string;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Attendance {
  id: string;
  classId: string;
  date: string;
  studentId: string;
  isPresent: boolean;
}

export interface AttendanceSummary {
  studentId: string;
  studentName: string;
  totalClasses: number;
  presentClasses: number;
  percentage: number;
}
