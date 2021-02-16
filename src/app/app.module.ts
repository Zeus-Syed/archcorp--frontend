import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { UserService } from './user.service';
import { ToastrModule } from 'ng6-toastr-notifications';
import { ArchcorpComponent } from './archcorp/archcorp.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    LoginComponent,
    SignupComponent,
    ArchcorpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent},
      { path: 'signup', component: SignupComponent},
      { path: 'landing', component: InputComponent},
      { path: 'archcorp', component: ArchcorpComponent}
    ])
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
