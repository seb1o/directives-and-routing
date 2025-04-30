import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentService } from '../../services/student/student.service';
import { Student } from '../../model/student';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [ CommonModule, FormsModule, RouterLink],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
    route = inject(ActivatedRoute);
    studentServ = inject(StudentService); // Correctly injected service
    student?: Student;
    router = inject(Router);
  newMark: any;

    constructor() {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.studentServ.getStudent(id).subscribe({
          next: (data) => (this.student = data),
          error: (err) => console.error(err),
        });
      }
    }

    showDialogue() {
      const dialog = document.getElementById("dialog") as HTMLDialogElement;
      dialog.showModal();
    }

    closeDialogue() {
      const dialog = document.getElementById("dialog") as HTMLDialogElement;
      dialog.close();
    }

    addMarksToStudent(marks: number[], newMark: number){
      if (this.student) {
        const newMarks = [...marks, newMark]
        this.studentServ.updateMarks(this.student.id, newMarks).subscribe({
          next: (modifiedStudent: Student) =>{
            this.student = modifiedStudent;
            alert("Marks addes sucessfully!");
          }
        });
        
      }else{
        alert('Nostudent selected. Please try again')
      }
      
    }

    
}

