import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private _http: HttpClient) {}

  public getQuestionsOfQuiz(qid) {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }
  public getQuestionsOfQuizForTest(qid) {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //Add Question
  public addQuestion(question) {
    return this._http.post(`${baseUrl}/question/`, question);
  }
  //Delete Question
  public deleteQuestion(questionId) {
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }
  //Update Question
  public updateQuestion(question) {
    return this._http.put(`${baseUrl}/questions/`, question);
  }

  //Evaluate Quiz
  public evalQuiz(questions){
    return this._http.post(`${baseUrl}/question/eval-quiz`,questions)
  }
}
