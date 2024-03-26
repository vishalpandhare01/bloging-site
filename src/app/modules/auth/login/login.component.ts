import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  ReactiveFormsModule,
  FormsModule,
  Validator,
  FormBuilder,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  formBuilder = new FormBuilder();
  loginUser: any;
  userExist = false

  ngOnInit(): void {
    this.loginUser = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  setLoginUser() {
    let token = JSON.stringify(this.loginUser.value);
    localStorage.setItem('token', token);
    alert('login successfully');
    location.replace("/blogs")
  }

  onSubmit() {
    if (this.loginUser.valid) {
      let data = localStorage.getItem('users') as string;
      if(!data){
        alert("No user found")
        return
      }
      let allUsers = JSON.parse(data).filter((el: any) => el != null);
      console.log(this.loginUser.value);
      allUsers.forEach((el: any) => {
        if (
          el.email === this.loginUser.value.email &&
          el.password === this.loginUser.value.password
        ) {
          console.log(allUsers)
          console.log( this.loginUser.value.Id ,el.id)
          this.loginUser.value.Id = el.id
          this.userExist = true
        }
      });
      if(this.userExist){
        this.setLoginUser()
      }else{
        alert("user Dose Not exist")
      }
    }
    console.log(this.loginUser);
  }
}
