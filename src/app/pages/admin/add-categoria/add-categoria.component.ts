import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent implements OnInit {

  categoria ={
    titulo : '',
    descripcion : ''
  }
  constructor(private categoriaService:CategoriaService,private snack:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
  }
  formSubmit(){
    if(this.categoria.titulo.trim() == '' || this.categoria.titulo.trim() == null){
      this.snack.open("El título es requerido!",'',{
        duration: 3000,
        verticalPosition : "top"
      })
      return;
    }
    this.categoriaService.agregarCategoria(this.categoria).subscribe(
      (dato:any) =>{
        this.categoria.titulo = '';
        this.categoria.descripcion = '';
        Swal.fire("Categoría Agregada","La categoría ha sido agregada con éxito",'success');
        this.router.navigate(['/admin/categorias/'])
      },(error) =>{
        console.error(error);
        Swal.fire("Error","Error al guardar la categoría","error");
      }
    )
  }
}
