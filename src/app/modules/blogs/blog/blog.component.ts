import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
  newBlog: any;
  createBlog: any;
  showDeleteButton = false

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
    let b = localStorage.getItem('blogs') as string;
    let data = JSON.parse(b).filter((el: any) => el !== null);
    data.forEach((el: any, i: number) => {
      if (el.id === id) {
        data[i] = {
          id: id,
          user: this.blog.user,
          blog: this.createBlog.value,
        };
        let editedBlog = JSON.stringify(data[i]);
        localStorage.setItem('blog', editedBlog);
      }
    });
    let blogsArray = JSON.stringify(data);
    localStorage.setItem('blogs', blogsArray);
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
