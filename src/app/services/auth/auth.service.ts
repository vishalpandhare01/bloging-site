import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { user } from '../../core/models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userRegister = true;

  constructor() {}
  registerUserService(registerUser:FormGroup) {
    let localData = localStorage.getItem('users') as string;
    let previousUser: user[] = JSON.parse(localData);
    let Data;
    let newUsers;
    if (previousUser) {
      Data = {
        id: previousUser.length++,
        ...registerUser.value,
      };
      newUsers = [...previousUser, Data];
    } else {
      Data = {
        id: 0,
        ...registerUser.value,
      };
      newUsers = [Data];
    }
    console.log(registerUser.value);
    localStorage.setItem('users', JSON.stringify(newUsers));
    console.log(registerUser);
    console.log(registerUser.valid);
    alert('You are Register successfully');
    registerUser.reset();
  }

loginUser(loginUser:user){
  let token = JSON.stringify(loginUser);
    localStorage.setItem('token', token);
    alert('login successfully');
    location.replace("/blogs")
}

}
