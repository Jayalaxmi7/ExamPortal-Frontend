import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as e from 'cors';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css'],
})
export class UpdateQuestionComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _quiz: QuizService,
    private _router: Router
  ) {}
    public Editor = ClassicEditor
  quesid = 0;
  question;
  quizzes;
  qTitle;

  ngOnInit(): void {
    this.quesid = this._route.snapshot.params['quesId'];

    this._question.getQuestionsOfQuiz(this.quesid).subscribe(
      (data: any) => {
        this.question = data;
        console.log(this.question);
      },
      (error) => {
        console.log(error);
      }
    );
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
      },
      (error) => {
        alert('Error while loading quizzes');
      }
    );
  }

  //Update form-submit
  public updateForm() {
    this._question.updateQuestion(this.question).subscribe(
      (data) => {
        Swal.fire('Success', 'Question Updated', 'success').then((e) => {
          this._router.navigate(['/admin/questions']);
        });
      },
      (error) => {
        Swal.fire('Error', 'Error while updating questions', 'error');
        console.log(error);
      }
    );
  }
}
