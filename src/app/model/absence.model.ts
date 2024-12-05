import { Student } from "./student.model";

export interface Absence {
    id: number;
    date: string;
    reason: string;
    studentId: number;
    matiere: string;
  }
  