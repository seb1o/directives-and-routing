import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../../model/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
 

  readonly BASE_URL = "https://68109dff27f2fdac2412155d.mockapi.io/"
  readonly STUDENTS_ENDPOINT = "students/"

  constructor(private http: HttpClient) {

  }

  getStudents(): Observable<Student[]>{
      return this.http.get<Student[]>(this.BASE_URL + this.STUDENTS_ENDPOINT)
  }

  getStudent(id: string): Observable<Student> {
      return this.http.get<Student>(this.BASE_URL + this.STUDENTS_ENDPOINT + id);
  }

  

  deleteStudent(student: Student, router: any): void {
    const url = this.BASE_URL + this.STUDENTS_ENDPOINT + student.id;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        // If the response status is 204, skip parsing JSON
        if (res.status === 204) {
          return null;
        }
        return res.json();
      })
      .then((response) => {
        router.navigate(['/']);
        console.log("Utente eliminato con successo:", response);
      })
      .catch((error) => {
        console.error("Errore durante l'eliminazione dell'utente:", error);
      });
  }

  updateMarks(id: string, marks: number[]): Observable<Student> {
    debugger;
    console.log("Updating marks for student with ID:", id, "New marks:", marks);
    return this.http.put<Student>(this.BASE_URL + this.STUDENTS_ENDPOINT + id, { marks });
  }
}
