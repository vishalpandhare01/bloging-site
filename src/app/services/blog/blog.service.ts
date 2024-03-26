import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class BlogService {
  data = localStorage.getItem('blogs') as string;
  token = localStorage.getItem('token') as string;
  user = JSON.parse(this.token);
  blogsData: any[] = [];
  isBlogCreated = false;
  newBlog: any;
  createBlog: any;
  blog: any;
  constructor() {}

  blogServices() {
    console.log(this.data);
    if (this.data) {
      this.blogsData = JSON.parse(this.data).filter((el: any) => el !== null);
      return (this.blogsData = [...this.blogsData]);
    }
    return this.blogsData;
  }

  ngOnInt(){
    this.blogServices()
  }

  setBlogServices(createBlogData:any) {
    this.createBlog = createBlogData
    let allBlog = JSON.parse(this.data);
    if (allBlog) {
      allBlog = allBlog.filter((el: any) => el !== null);
      const newBlog = {
        id: allBlog.length++,
        user: this.user,
        blog: this.createBlog.value,
      };
      allBlog.push(newBlog);
      console.log(allBlog);
      this.newBlog = newBlog;
      let b = JSON.stringify(allBlog);
      localStorage.setItem('blogs', b);
    } else {
      let firstBlog: any[] = [
        {
          id: 0,
          user: this.user,
          blog: this.createBlog.value,
        },
      ];
      this.newBlog = firstBlog;
      let b = JSON.stringify(firstBlog);
      localStorage.setItem('blogs', b);
    }
  }

  deleteBlog(id:number){
    const blogs = this.blogServices()
    let index = blogs.findIndex((e: any) => e.id === id);
    console.log(index);
    blogs.splice(index, 1);
    const blogData = JSON.stringify(blogs);
    localStorage.setItem('blogs', blogData);
  }

  updateBlog(id :number ,createBlog:any ,blog:any){
    let data = this.blogServices();
    data.forEach((el: any, i: number) => {
      if (el.id === id) {
        data[i] = {
          id: id,
          user: blog.user,
          blog: createBlog.value,
        };
        let editedBlog = JSON.stringify(data[i]);
        localStorage.setItem('blog', editedBlog);
      }
    });
    let blogsArray = JSON.stringify(data);
    localStorage.setItem('blogs', blogsArray);
  }

}
