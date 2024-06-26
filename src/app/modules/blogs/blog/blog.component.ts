import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BlogService } from '../../../services/blog/blog.service';
import { blog } from '../../../core/models/interfaces';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})

export class BlogComponent implements OnInit {
  token = localStorage.getItem('token') as string
  loginUser = JSON.parse(this.token)
  data = localStorage.getItem('blog') as string;
  blog = JSON.parse(this.data);
  formBuilder = new FormBuilder();
  isBlogCreated = false;
  newBlog!: blog;
  createBlog!: FormGroup;
  showDeleteButton = false

  constructor(private updateBlog:BlogService){

  }

  ngOnInit(): void {
    this.createBlog = this.formBuilder.group({
      title: [
        `${this.blog.blog.title}`,
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(50),
        ],
      ],
      description: [
        `${this.blog.blog.description}`,
        [
          Validators.required,
          Validators.minLength(300),
          Validators.maxLength(500),
        ],
      ],
    });
  }

  setSubmitData() {
    let id = this.blog.id;
    this.updateBlog.updateBlog(id ,this.createBlog ,this.blog)
    location.reload();
  }

  onSubmit() {
    if (this.createBlog.valid) {
      this.setSubmitData();
      console.log('Form is valid. Data submitted.');
    } else {
      alert("you have not Edited Blog")
      console.log('Form is invalid. Cannot submit data.');
    }
  }

  getFormErrors(fieldName: string) {
    const field = this.createBlog.get(fieldName);
    return field ? field.errors : null;
  }
}
