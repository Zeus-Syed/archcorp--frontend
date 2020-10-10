import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { Cookie } from 'ng2-cookies';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
public newFirstName: any;
public newLastName: any;
public newEmail: any;
public newPassword: any;
public newPhoneNo: any;
public buttonCheck: boolean;
public countryName: string;
public flightCount: Number;
public flightLists: any;
public authToken: any;
  constructor(public userService: UserService, public toastr: ToastrManager,
    public router: Router) { }

  ngOnInit() {
    this.authToken = Cookie.get('authToken');
    this.buttonStatus();
    this.getAllLists();
  }
public deleteList = (data) =>{
  this.userService.deleteFlightList(data, this.authToken).subscribe(
(apiResponse) => {
    if(apiResponse.status == 200){
      this.toastr.successToastr('Deleted Successfully!!');
   this.getAllLists();
    }
    else{
      this.toastr.errorToastr(apiResponse.message);
    }
},
(err) => {
 this.toastr.errorToastr("some error in deleting!");
}
  )
}
  public getAllLists = () => {
this.userService.getAllLists().subscribe(
  (apiResponse)=>{
       if(apiResponse.status == 200){
           this.flightLists = apiResponse['data'];
           console.log(this.flightLists);
       }
       else{
        //this.toastr.warningToastr(apiResponse.message);
       }
  },
  (err)=>{
    this.toastr.warningToastr("Some issue in fetching lists");
  }
)
  }

  public createFlightList:any = () => {
    if(!this.countryName){
      this.toastr.warningToastr("Please enter Country Name!");
    }
    else if(!this.flightCount){
      this.toastr.warningToastr("Please enter flights count!");
    }
    else{
      let data = {
        countryName: this.countryName,
        flightCount: this.flightCount
      }
      $('.modal').removeClass('in');
      $('.modal').attr("aria-hidden", "true");
      $('.modal').css("display", "none");
      $('.modal-backdrop').remove();
      $('body').removeClass('modal-open');
      this.userService.createFlightList(data).subscribe(
        (apiResponse)=>{
          console.log(apiResponse);
          if(apiResponse.status == 200){
            this.toastr.successToastr("Flight list created Successfully!!");
            this.getAllLists();            
          }
          else{
            this.toastr.warningToastr(apiResponse.message);
          }
        },
        (err)=>{

        }
      )
    }
  }

  public buttonStatus:any = () =>{
     if( this.userService.getUserInfoFromLocalStorage() == 'Admin'){
      this.buttonCheck = false;
     }
     else{
       this.buttonCheck = true;
     }
     console.log(this.buttonCheck);
      
  }

  public logout:any = () => {
    this.router.navigate(['/']);
  }

  public createUser = () => {
    if(!this.newFirstName){
      this.toastr.warningToastr("Enter FirstName properly!!!");
    }
    else if(!this.newLastName){
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
             firstName: this.newFirstName,
             lastName: this.newLastName,
             email: this.newEmail,
             password: this.newPassword,
             phoneNo: this.newPhoneNo,
             typeUser: 'Manager'
           }
           $('.modal').removeClass('in');
  $('.modal').attr("aria-hidden", "true");
  $('.modal').css("display", "none");
  $('.modal-backdrop').remove();
  $('body').removeClass('modal-open');
           this.userService.createUser(data).subscribe(
             (apiResponse) =>{
               console.log(apiResponse);
                             if(apiResponse.status == 200){
                               this.toastr.successToastr("User created Successfully!!");

                               
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
