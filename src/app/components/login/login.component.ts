import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private _userService: UserService,
              @Inject(PLATFORM_ID) private platformId: Object) {
      this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('token')){
      this.router.navigate(['/phone']);
    }
    this.userForm = this.formBuilder.group({
      username: '',
      password: '',
    });
  }

  submit(): void {
    const user: User = {
      username: this.userForm.get('username')?.value,
      password: this.userForm.get('password')?.value,
    };
    this._userService.login(user).subscribe(
      (data) => {
        Swal.fire({
          title: 'Has podido ingresar!',
          icon: 'success',
        });
        localStorage.setItem('token', data.token); //Guarda el token en el navegador web
        // el setTimeout es para que caduzca la seccion, se remueve el token despues de 10 min 
        setTimeout(() => {
          localStorage.removeItem('token');
          console.log('Token eliminado del localStorage.');
        }, 600000);
        this.router.navigate(['/phone']);
      },
      (error) => {
        console.log(error);
        this.userForm.reset();
      }
    );
  }
}
