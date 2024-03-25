import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-blogs',
  templateUrl: './create-blogs.component.html',
  styleUrl: './create-blogs.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class CreateBlogsComponent implements OnInit {
  formBuilder = new FormBuilder();
  isBlogCreated=false
  newBlog:any
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

  setSubmitData() {
    let token = localStorage.getItem('token') as string;
    let user = JSON.parse(token);
    let data = localStorage.getItem('blogs') as string;
    let allBlog = JSON.parse(data);
    if (allBlog) {
      allBlog = allBlog.filter((el:any)=>el !== null)
      const newBlog = {
        id: allBlog.length++,
        user: user,
        blog: this.createBlog.value,
      };
      allBlog.push(newBlog)
      console.log(allBlog)
      this.newBlog = newBlog
      let b = JSON.stringify(allBlog)
      localStorage.setItem("blogs",b)
    }else{
      let firstBlog: any[] = [
        {
          id: 0,
          user: user,
          blog: this.createBlog.value
          ,
        }
      ]
      this.newBlog = firstBlog
      let b = JSON.stringify(firstBlog)
      localStorage.setItem("blogs",b)
    }
   this.isBlogCreated = true
   console.log("newblog",this.newBlog)
  }

  onSubmit() {
    console.log(this.createBlog);
    if (this.createBlog.valid) {
      this.setSubmitData()
      console.log('Form is valid. Data submitted.');
    } else {
      alert("Please write blog")
      console.log('Form is invalid. Cannot submit data.');
    }
  }

  getFormErrors(fieldName: string) {
    const field = this.createBlog.get(fieldName);
    return field ? field.errors : null;
  }
}
