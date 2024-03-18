import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccesorioService } from '../../services/accesorio.service';
import Swal from 'sweetalert2';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
} 

@Component({
  selector: 'app-agregar-accesorio',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-accesorio.component.html',
  styleUrl: './agregar-accesorio.component.css'
})
export class AgregarAccesorioComponent implements OnInit{
  accesorioForm: FormGroup;
  id: string | null;
  imagePaths: File [] = [];
  imagenPrincipal!: File;
  titulo = 'Agregar';
  photoSelect!: (string | ArrayBuffer | null);
  photosSelected: (string | ArrayBuffer | null)[] = [];

  constructor (private fb: FormBuilder, private router: Router, private _accesorioService: AccesorioService, private aRouter: ActivatedRoute) {
    this.accesorioForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarAccesorio(){
    if (this.id !== null){
      console.log(this.imagenPrincipal);
      this._accesorioService.editarAccesorio(this.id, this.accesorioForm.get('nombre')?.value, this.accesorioForm.get('descripcion')?.value, this.accesorioForm.get('precio')?.value, this.imagenPrincipal, this.imagePaths)
        .subscribe(data => {
          Swal.fire({
            title: "Accesorio editado correctamente",
            icon: "success"
          });
        this.router.navigate(['/accesorio']);
      }, error => {
        console.log(error);
        this.accesorioForm.reset();
      })
    } else {
      this._accesorioService.guardarAccesorio(this.accesorioForm.get('nombre')?.value, this.accesorioForm.get('descripcion')?.value, this.accesorioForm.get('precio')?.value,this.imagenPrincipal,  this.imagePaths)
      .subscribe(data => {
        Swal.fire({
          title: "Accesorio agregado correctamente",
          icon: "success"
        });
      this.router.navigate(['/accesorio']);
      }, error => {
      console.log(error);
      this.accesorioForm.reset();
      })
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar';
      this._accesorioService.obtenerAccesorio(this.id).subscribe(data => {
        this.accesorioForm.setValue({
          nombre: data.nombre,
          descripcion: data.descripcion,
          precio: data.precio
        });
        // Asumiendo que `data.imagePaths` es un arreglo de rutas de imágenes
        this.photosSelected = data.imagePaths.map((path: string) => `https://backtecnophones-production.up.railway.app/${path}`);
        if(data.imagenPrincipal) {
          this.photoSelect = `https://backtecnophones-production.up.railway.app/${data.imagenPrincipal}`;
        }
      });
    }
  }
  

  onMainPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files && input.files[0]) {
      this.imagenPrincipal = input.files[0]; // Asigna la primera imagen seleccionada como imagenPrincipal
  
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoSelect = reader.result; // Actualiza la vista previa de la imagenPrincipal
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  
  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files) {
      this.imagePaths = Array.from(input.files);
      this.photosSelected = [];
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.photosSelected.push(reader.result);
        };
        reader.readAsDataURL(file);
      });
      console.log(this.imagePaths);
    }
  }
  
}
