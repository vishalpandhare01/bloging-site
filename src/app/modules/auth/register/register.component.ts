import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class RegisterComponent implements OnInit {
  formBuilder = new FormBuilder();
  registerUser: any;
  userRegister = true

  ngOnInit(): void {
    this.registerUser = this.formBuilder.group({
      name: ['', [Validators.required, Validators.min(4)]],
      email: ['', [Validators.email]],
      password: [
        '',
        Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/),
      ],
    });
  }

  setFormData() {
    let localData = localStorage.getItem('users') as string;
    let previousUser: any = JSON.parse(localData);
    let Data;
    let newUsers;
    if (previousUser) {
      Data = {
        id: previousUser.length++,
        ...this.registerUser.value,
      };
      newUsers = [...previousUser, Data];
    } else {
      Data = {
        id: 0,
        ...this.registerUser.value,
      };
      newUsers = [Data];
    }
    console.log(this.registerUser.value);
    localStorage.setItem('users', JSON.stringify(newUsers));
    console.log(this.registerUser);
    console.log(this.registerUser.valid);
    alert('You are Register successfully');
    this.registerUser.reset();
    this.userRegister = false
  }


  onSubmit() {
    console.log('Form validity:', this.registerUser.valid);
    console.log('Form value:', this.registerUser.value);
    console.log('errors', this.registerUser.get('password'));
    if (this.registerUser.valid) {
      this.setFormData();
      console.log('Form is valid. Data submitted.');
    } else {
      console.log('Form is invalid. Cannot submit data.');
    }
  }

  getFormErrors(fieldName: string) {
    const field = this.registerUser.get(fieldName);
    return field ? field.errors : null;
  }
}
