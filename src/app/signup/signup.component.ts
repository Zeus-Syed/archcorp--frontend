import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams, HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/user.service';
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public newFirstname: String;
  public newLastname: String;
  public newEmail: String;
  public newPassword: String;
  public newPhoneNo: String;
  constructor(public router: Router, public userService: UserService, 
    public toastr: ToastrManager) { }

  ngOnInit() {
  }

  public goToSignin: any = () =>{
   this.router.navigate(['/']);
  }

  public signUp: any = () =>{
    if(!this.newFirstname){
      this.toastr.warningToastr("Enter FirstName properly!!!");
    }
    else if(!this.newLastname){
      this.toastr.warningToastr("Enter LastName properly!!!");
    } 
    else if(!this.newEmail){
      this.toastr.warningToastr("Enter Email properly!!!");
    } 
    else if(!this.newPassword){
      this.toastr.warningToastr("Enter Password properly!!!");
    } 
    else if(!this.newPhoneNo){
      this.toastr.warningToastr("Enter PhoneNo properly!!!");
    } 
    else{
           let data = {
             firstName: this.newFirstname,
             lastName: this.newLastname,
             email: this.newEmail,
             password: this.newPassword,
             phoneNo: this.newPhoneNo,
             typeUser: 'Admin'
           }
           this.userService.signupFunction(data).subscribe(
             (apiResponse) =>{
               console.log(apiResponse);
                             if(apiResponse.status == 200){
                               this.toastr.successToastr("Signup Success!!!");

                               setTimeout(()=>{
                                 this.goToSignin();
                               },2000);
                             }
                             else{
                               this.toastr.warningToastr(apiResponse.message);
                             }
             },
             (err) =>{
                this.toastr.errorToastr("Signup NOt success");
             }
           )
  }
  }

}
