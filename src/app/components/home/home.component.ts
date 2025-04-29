import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../services/student/student.service';
import { Student } from '../../model/student';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private studentService = inject(StudentService);
  students: Student[] = [];
  sortBy: 'name' | 'age' = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.sortStudents();
      },
      error: (err) => console.error(err)
    });
  }

  sortStudents() {
    this.students.sort((a, b) => {
      if (this.sortBy === 'name') {
        const nameA = `${a.name} ${a.surname}`.toLowerCase();
        const nameB = `${b.name} ${b.surname}`.toLowerCase();
        return this.sortDirection === 'asc' 
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      } else {
        // Sort by age (using dob)
        const ageA = new Date(a.dob).getTime();
        const ageB = new Date(b.dob).getTime();
        return this.sortDirection === 'asc'
          ? ageA - ageB
          : ageB - ageA;
      }
    });
  }

  onSortChange() {
    this.sortStudents();
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortStudents();
  }
}
