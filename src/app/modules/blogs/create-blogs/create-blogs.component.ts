import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BlogService } from '../../../services/blog/blog.service';

@Component({
  selector: 'app-create-blogs',
  templateUrl: './create-blogs.component.html',
  styleUrl: './create-blogs.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class CreateBlogsComponent implements OnInit {
  formBuilder = new FormBuilder();
  isBlogCreated = false;
  newBlog: any;
  createBlog: any;

  ngOnInit(): void {
    this.createBlog = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(50),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(300),
          Validators.maxLength(500),
        ],
      ],
    });
  }

  constructor(private setBlogData: BlogService) {}

  onSubmit() {
    console.log(this.createBlog);
    if (this.createBlog.valid) {
      this.setBlogData.setBlogServices(this.createBlog);
      this.isBlogCreated = true;
      console.log('Form is valid. Data submitted.');
    } else {
      alert('Please write blog');
      console.log('Form is invalid. Cannot submit data.');
    }
  }

  getFormErrors(fieldName: string) {
    const field = this.createBlog.get(fieldName);
    return field ? field.errors : null;
  }
}
