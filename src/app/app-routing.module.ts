import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { GetBlogsComponent } from './modules/blogs/get-blogs/get-blogs.component';
import { authGuard } from './core/guard/auth.guard';
import { CreateBlogsComponent } from './modules/blogs/create-blogs/create-blogs.component';
import { BlogComponent } from './modules/blogs/blog/blog.component';
import { MainComponent } from './modules/home/main/main.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' }, //default route
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: MainComponent },
  {
    path: 'blogs',
    component: GetBlogsComponent,
  },
  {
    path: 'create-blog',
    component: CreateBlogsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'get-blog',
    component: BlogComponent,
    // canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const RoutingComponent = [LoginComponent, RegisterComponent];
