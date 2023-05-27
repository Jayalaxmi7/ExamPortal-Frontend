import { Component } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent {
  constructor(private _quiz: QuizService) {}
  quizzes = [];
  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!', 'Error in loading data', 'error');
      }
    );
  }

  //Delete quiz
  deleteQuiz(qId) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure want to Delete ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //Delete
        this._quiz.deleteQuiz(qId).subscribe(
          (data) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.qId != qId);
            Swal.fire('Success', 'Quiz Deleted', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error while deleting Quiz', 'error');
          }
        );
      }
    });
  }
}
