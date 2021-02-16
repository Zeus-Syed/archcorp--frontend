import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserService } from '../user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public newEmail:any = 'hello';
  public newPassword:any = 'gentleman';
  constructor(public router: Router, public toastr: ToastrManager,
    public userService: UserService) { }

  ngOnInit() {
  }

  public goToSignUp:any = () => {
this.router.navigate(['/signup']);
  }

  public login:any = () =>{
    if(!this.newEmail){
      this.toastr.warningToastr("Enter email Properly!!!!");
    }
    else if(!this.newPassword){
      this.toastr.warningToastr("Enter Password Properly!!!!");
    }
  
  else{
    let data = {
      email:this.newEmail,
      password:this.newPassword
    }
  
  this.userService.loginFunc(data).subscribe((apiResponse) =>{
  
          console.log(apiResponse);
          if(apiResponse.status === 200){
  
             Cookie.set('authToken',apiResponse.data.authToken);
             Cookie.set('UserName',apiResponse.data.userDetails.firstName+' '+apiResponse.data.userDetails.lastName);
             Cookie.set('UserId',apiResponse.data.userDetails.userId);
             this.userService.setUserInfoInLocalStorage(apiResponse.data.userDetails.userType);
            this.toastr.successToastr("Login Successful!!1");
  
            setTimeout(()=>{
            this.router.navigate(['/archcorp']);
            },2000);
          }
          else{
            this.toastr.errorToastr(apiResponse.message);
          }
  },
  (err)=>{
    this.toastr.errorToastr("some error occured!!");
  }
  
  );
  
  }
  }
}
