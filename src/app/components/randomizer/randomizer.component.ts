import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student/student.service';
import { Student } from '../../model/student';

@Component({
  selector: 'app-randomizer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './randomizer.component.html',
  styleUrl: './randomizer.component.scss'
})
export class RandomizerComponent {
  private studentService = inject(StudentService);
  students: Student[] = [];
  groups: Student[][] = [];
  groupSize: number = 2;
  availableSizes = [2, 3, 4];

  constructor() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.randomize();
      },
      error: (err) => console.error(err)
    });
  }

  randomize() {
    // Shuffle students array
    const shuffled = [...this.students].sort(() => Math.random() - 0.5);
    
    // Calculate number of groups needed
    const totalStudents = shuffled.length;
    const numGroups = Math.ceil(totalStudents / this.groupSize);
    
    // Initialize empty groups
    this.groups = Array(numGroups).fill(null).map(() => []);
    
    // Distribute students to groups
    let studentIndex = 0;
    for (let i = 0; i < numGroups; i++) {
      for (let j = 0; j < this.groupSize && studentIndex < totalStudents; j++) {
        this.groups[i].push(shuffled[studentIndex]);
        studentIndex++;
      }
    }
  }

  onGroupSizeChange() {
    this.randomize();
  }
}
