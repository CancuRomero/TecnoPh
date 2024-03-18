import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('inicio', 'inicio');
    } else {
      console.error('localStorage is not available. Data will not be saved.');
    }
  }
  
 
  

}


