import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Macbook } from '../../models/macbook';
import { MacbookService } from '../../services/macbook.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agregar-macbook',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-macbook.component.html',
  styleUrl: './agregar-macbook.component.css'
})
export class AgregarMacbookComponent {
  macbookForm: FormGroup;
  titulo = 'Agregar';
  id: string | null;
  imagePaths: File [] = [];
  imagenPrincipal!: File;
  photosSelected: (string | ArrayBuffer | null)[] = [];
  photoSelect!: (string | ArrayBuffer | null) ; //Archivo para mostrar la imagen subida
  mostrarSelect: boolean = true;
  imagenPrincipalUrl: string | null = null;

  constructor (private fb: FormBuilder, private router: Router, private _macbookService: MacbookService, private aRouter: ActivatedRoute) {
    this.macbookForm = this.fb.group({
      modelo: ['', Validators.required],
      caracteristicas: ['', Validators.required],
      memoria: [''],
      almacenamiento: ['', Validators.required],
      precio: ['', Validators.required],
      visible: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void{
    this.esEditar();
  }

  agregarMacbook() {
    // Extraer valores directamente del formulario
    const modelo = this.macbookForm.get('modelo')?.value;
    const caracteristicas = this.macbookForm.get('caracteristicas')?.value;
    const memoria = this.macbookForm.get('memoria')?.value;
    const almacenamiento = this.macbookForm.get('almacenamiento')?.value;
    const precio = this.macbookForm.get('precio')?.value;
    const visible = this.macbookForm.get('visible')?.value;
  
    if (this.id !== null) {
      this._macbookService.editarMacbook(this.id, modelo, caracteristicas, memoria, almacenamiento, precio, visible, this.imagenPrincipal, this.imagePaths).subscribe(data => {
        Swal.fire({
          title: "Editado correctamente!",
          icon: "success",
        });
        this.router.navigate(['/macbook']);
      }, error => {
        console.error(error);
        this.macbookForm.reset();
      });
    } else {
      
      this._macbookService.guardarMacbook(modelo, caracteristicas, memoria, almacenamiento, precio, visible, this.imagenPrincipal, this.imagePaths).subscribe(data => {
        Swal.fire({
          title: "Agregado correctamente",
          icon: "success",
        });
        this.router.navigate(['/macbook']);
      }, error => {
        console.error(error);
        this.macbookForm.reset();
      });
    }
  }
  

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar';
      this.mostrarSelect = false;
      this._macbookService.obtenerMacbook(this.id).subscribe(data => {
        this.macbookForm.setValue({
          modelo: data.modelo,
          caracteristicas: data.caracteristicas,
          memoria: data.memoria,
          almacenamiento: data.almacenamiento,
          precio: data.precio,
          visible: data.visible,
        });
        this.photosSelected = data.imagePaths.map((path: string) => `https://backtecnophones-production.up.railway.app/${path}`);
        if(data.imagenPrincipal) {
          this.photoSelect = `https://backtecnophones-production.up.railway.app/${data.imagenPrincipal}`;
          this.imagenPrincipalUrl = data.imagenPrincipal;
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
  
  // Método existente para imágenes secundarias, sin cambios
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
    }
  }
}
