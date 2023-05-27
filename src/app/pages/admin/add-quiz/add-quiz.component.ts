import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  constructor(
    private _cat: CategoryService,
    private _snack: MatSnackBar,
    private _quiz: QuizService
  ) {}
  color: ThemePalette = 'primary';
  categories = [];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: '',
    },
  };

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data: any) => {
        //Categories Load
        this.categories = data;
        // console.log(this.categories);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!', 'Error in loading data', 'error');
      }
    );
  }

  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snack.open('Title Required!', '', {
        duration: 2000,
      });
      return;
    }

    //Call Server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data) => {
        Swal.fire('Successful', 'New Quiz Added', 'success');
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: {
            cid: '',
          },
        };
      },
      (error) => {
        Swal.fire('Error!', 'Error while adding quiz', 'error');
        console.log(error);
      }
    );
  }
}
