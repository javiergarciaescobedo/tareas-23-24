import { Component } from '@angular/core';
import { Tarea } from '../tarea'
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tareaEditando = {} as Tarea;
  arrayColeccionTareas: any = [{
    id: "",
    tarea: {} as Tarea
  }];
  idTareaSelec: string = "";

  constructor(private firestoreService: FirestoreService, private router: Router) {
    this.obtenerListaTareas();
  }

  obtenerListaTareas() {
    // Hacer una consulta cada vez que se detectan nuevos datos en la BD
    this.firestoreService.consultar("tareas").subscribe((datosRecibidos) => {
      // Limpiar el array para que no se dupliquen los datos anteriores
      this.arrayColeccionTareas = [];
      // Recorrer todos los datos recibidos de la BD
      datosRecibidos.forEach((datosTarea) => {
        // Cada elemento de la BD se almacena en el array que se muestra en pantalla
        this.arrayColeccionTareas.push({
          id: datosTarea.payload.doc.id,
          tarea: datosTarea.payload.doc.data()
        })
      });
    });
  }

  selecTarea(idTarea:string, tareaSelec:Tarea) {
    this.tareaEditando = tareaSelec;
    this.idTareaSelec = idTarea;
    this.router.navigate(['detalle', this.idTareaSelec]);
  }

  clicBotonInsertar() {
    this.router.navigate(['detalle', 'nuevo']);
  } 
}
