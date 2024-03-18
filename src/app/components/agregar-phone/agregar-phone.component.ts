
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Phone } from '../../models/phone';
import { PhoneService } from '../../services/phone.service';
import Swal from 'sweetalert2';

//Esto es para la imagen (para el evento)
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
} 

@Component({
  selector: 'app-agregar-phone',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-phone.component.html',
  styleUrl: './agregar-phone.component.css',
  
})
export class AgregarPhoneComponent implements OnInit{
  phoneForm: FormGroup;
  titulo = 'Agregar';
  id: string | null;
  imagePaths: File [] = [];
  imagenPrincipal!: File;
  photosSelected: (string | ArrayBuffer | null)[] = [];
  photoSelect!: (string | ArrayBuffer | null) ; //Archivo para mostrar la imagen subida
  mostrarSelect: boolean = true;
  imagenPrincipalUrl: string | null = null;

  constructor (private fb: FormBuilder, private router: Router, private _phoneService: PhoneService, private aRouter: ActivatedRoute) {
    this.phoneForm = this.fb.group({
      modelo: ['', Validators.required],
      estado: ['', Validators.required],
      bateria: ['', Validators.required],
      capacidad: ['', Validators.required],
      observaciones: ['', Validators.required],
      valor: ['', Validators.required],
      visible: ['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void{
    this.esEditar();
  }

  agregarPhone() {
    // Extraer valores directamente del formulario
    const modelo = this.phoneForm.get('modelo')?.value;
    const estado = this.phoneForm.get('estado')?.value;
    const bateria = this.phoneForm.get('bateria')?.value;
    const capacidad = this.phoneForm.get('capacidad')?.value;
    const observaciones = this.phoneForm.get('observaciones')?.value;
    const valor = this.phoneForm.get('valor')?.value;
    const visible = this.phoneForm.get('visible')?.value;
  
    if (this.id !== null) {
      // Si hay un ID, estamos editando un teléfono existente.
      // Asumiendo que tienes un método similar `editarPhone` que maneja la edición
      this._phoneService.editarPhone(this.id, modelo, estado, bateria, capacidad, observaciones, valor, visible, this.imagenPrincipal, this.imagePaths).subscribe(data => {
        Swal.fire({
          title: "iPhone editado correctamente",
          icon: "success",
        });
        this.router.navigate(['/phone']);
      }, error => {
        console.error(error);
        this.phoneForm.reset();
      });
    } else {
      // Crear un nuevo teléfono
      this._phoneService.guardarPhone(modelo, estado, bateria, capacidad, observaciones, valor, visible, this.imagenPrincipal, this.imagePaths).subscribe(data => {
        Swal.fire({
          title: "iPhone agregado correctamente",
          icon: "success",
        });
        this.router.navigate(['/phone']);
      }, error => {
        console.error(error);
        this.phoneForm.reset();
      });
    }
  }
  

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar';
      this.mostrarSelect = false;
      this._phoneService.obtenerPhone(this.id).subscribe(data => {
        this.phoneForm.setValue({
          modelo: data.modelo,
          estado: data.estado,
          bateria: data.bateria,
          capacidad: data.capacidad,
          observaciones: data.observaciones,
          valor: data.valor,
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
