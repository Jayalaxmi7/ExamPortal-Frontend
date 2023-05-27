import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.css'],
})
export class ViewQuizQuestionComponent implements OnInit {
  qId;
  qTitle;
  questions = [];
  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //Delete question
  deleteQuestion(qid) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure ?',
    }).then((result) => {
      if (result.isConfirmed) {
        //Confirm
        this._question.deleteQuestion(qid).subscribe(
          (data) => {
            this._snack.open('Question Deleted ! ', '', {
              duration: 3000,
            });
            this.questions = this.questions.filter((q) => q.quesId != qid);
          },
          (error) => {
            this._snack.open('Error in Deleting Question', '', {
              duration: 3000,
            });
          }
        );
      }
    });
  }
}
