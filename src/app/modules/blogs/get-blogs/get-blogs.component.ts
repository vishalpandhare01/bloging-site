import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { DefaultBlogs } from '../../../core/constant/defaultblog';
import { BlogService } from '../../../services/blog/blog.service';
import { blog } from '../../../core/models/interfaces';

@Component({
  selector: 'app-get-blogs',
  templateUrl: './get-blogs.component.html',
  styleUrl: './get-blogs.component.scss',
  standalone: true,
  imports: [CommonModule],
})
export class GetBlogsComponent implements OnChanges {
  // const randomId = Math.floor(Math.random() * 900000000000) + 100000000000;
  token = localStorage.getItem('token') as string;
  loginUser = !this.token ? null : JSON.parse(this.token);
  blogs: any[] = [];
  tempBlog = DefaultBlogs;

  constructor(private blogsData: BlogService) {
    this.blogs = this.blogsData.blogServices();
  }
  
  ngOnChanges(): void {
   
  }

  deleteBlog(id: number) {
    this.blogsData.deleteBlog(id);
    location.reload();
  }

  getBlog(id: number) {
    let b = this.blogs.filter((el: blog) => el.id === id)[0];
    b = JSON.stringify(b);
    localStorage.setItem('blog', b);
    location.replace('get-blog');
  }
}
