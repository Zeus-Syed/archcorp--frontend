import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
public BaseUrl = 'http://localhost:3000';
  constructor(public http: HttpClient ) { }

  public signupFunction(data):Observable<any> {
    const params = new HttpParams()
   .set('firstName',data.firstName)
    .set('lastName',data.lastName)
    .set('phoneNo',data.phoneNo)
    .set('email',data.email)
    .set('password',data.password)
    .set('typeUser', data.typeUser)
    return this.http.post(`${this.BaseUrl}/user/signup`,data);
  }

  public loginFunc(data):Observable<any> {
    const params = new HttpParams()
    .set('email', data.email)
    .set('password',data.password)
    return this.http.post(`${this.BaseUrl}/user/login`, data);
  }

  public createUser(data):Observable<any> {
    const params = new HttpParams()
    .set('firstName', data.firstName)
    .set('lastName', data.lastName)
    .set('phoneNo',data.phoneNo)
    .set('email',data.email)
    .set('password',data.password)
    .set('typeUser', data.typeUser)
    return this.http.post(`${this.BaseUrl}/user/createman`,data);
  }

  public setUserInfoInLocalStorage = (data) =>{
    localStorage.setItem('type', JSON.stringify(data));
  }
  public getUserInfoFromLocalStorage =() =>{
    return JSON.parse(localStorage.getItem('type'));
  }

  public createFlightList(data):Observable<any> {
const params = new HttpParams()
.set('countryName', data.countryName)
.set('flightCount', data.flightCount)
return this.http.post(`${this.BaseUrl}/flight/createflight`, data);
  }

  public getAllLists():Observable<any> {
    return this.http.get(`${this.BaseUrl}/flight/getall`);
  }

  public deleteFlightList(countryId):Observable<any> {
    let data = {};
    return this.http.post(`${this.BaseUrl}/flight/delete/${countryId}`, data);
  }
}
