import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private _http: HttpClient) {}
  public quizzes() {
    return this._http.get(`${baseUrl}/quiz/`);
  }

  //Add quiz
  public addQuiz(quiz) {
    return this._http.post(`${baseUrl}/quiz/`, quiz);
  }

  //Delete quiz
  public deleteQuiz(qId) {
    return this._http.delete(`${baseUrl}/quiz/${qId}`);
  }

  //Get the single quiz
  public getQuiz(qId) {
    return this._http.get(`${baseUrl}/quiz/${qId}`);
  }

  //Update quiz
  public updateQuiz(quiz) {
    return this._http.put(`${baseUrl}/quiz/`, quiz);
  }

  //Get quizzes of Category
  public getQuizzesOfCategory(cid) {
    return this._http.get(`${baseUrl}/quiz/category/${cid}`);
  }

  //Get Active quizzes
  public getActiveQuizzes() {
    return this._http.get(`${baseUrl}/quiz/active`);
  }

  //Get active quizzes of category
  public getActiveQuizzesOfCategory(cid) {
    return this._http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }
}
