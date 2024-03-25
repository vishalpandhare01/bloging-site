import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  elementShow = true
  userLoggedIn(){
    if(localStorage.getItem('token')){
      this.elementShow = false
    }  
  }

  ngOnInit(): void {
    console.log(this.elementShow)
    this.userLoggedIn()
  }

  logOut() {
    console.log("logout")
    localStorage.removeItem('token');
    location.reload()
  }
}
