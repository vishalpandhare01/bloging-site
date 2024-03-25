import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-blogs',
  templateUrl: './get-blogs.component.html',
  styleUrl: './get-blogs.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class GetBlogsComponent implements OnInit {
  // const randomId = Math.floor(Math.random() * 900000000000) + 100000000000;
  token = localStorage.getItem('token') as string;
  loginUser = !this.token ? null : JSON.parse(this.token);
  data = localStorage.getItem('blogs') as string;
  blogs = JSON.parse(this.data).filter((el: any) => el !== null);

  ngOnInit(): void {
    console.log(this.loginUser)
    console.log("loginUser",this.loginUser)
  }

  deleteBlog(id: any) {
    let index = this.blogs.findIndex((e: any) => e.id === id);
    console.log(index);
    this.blogs.splice(index, 1);
    const blogData = JSON.stringify(this.blogs);
    localStorage.setItem('blogs', blogData);
  }

  getBlog(id: any) {
    let b = this.blogs.filter((el: any) => el.id === id)[0];
    b = JSON.stringify(b);
    localStorage.setItem('blog', b);
    location.replace('get-blog');
  }
}
