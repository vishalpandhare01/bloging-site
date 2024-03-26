import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class RegisterComponent implements OnInit {
  formBuilder = new FormBuilder();
  registerUser!: FormGroup;
  userRegister = true;

  constructor(private authService: AuthService) {}

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
    this.authService.registerUserService(this.registerUser);
    this.userRegister = false;
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
