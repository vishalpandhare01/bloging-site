import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {authGuard} from "./core/guard/auth.guard"
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'blog-site-app';
  elementShow = false



}
