import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  public loginStatusSubject = new Subject <boolean>();

  constructor(private http: HttpClient) {}

  //Current user : which is logged in
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  //Generate token
  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  //loginUser--set token in local storage(if you are offline then no problem)
  public loginUser(token){
    localStorage.setItem("token",token);
    return true;
  }
  //isLogin--User is login or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  //Logout-- remove token from local storage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //Get token
  public getToken() {
    return localStorage.getItem('token');
  }

  //Set User-detail
  public setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //Get User-detail
  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  //Get User-role
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
