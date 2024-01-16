import { Component } from '@angular/core';
import {Tarea} from '../tarea'
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
    data: {} as Tarea
   }];
   idTareaSelec: string = "";

  constructor(private firestoreService: FirestoreService, private router: Router) {
    this.obtenerListaTareas();
  }

  clicBotonInsertar() {
    //this.firestoreService.insertar("tareas", this.tareaEditando);
    this.firestoreService.insertar("tareas", this.tareaEditando).then(() => {
      console.log('Tarea creada correctamente!');
      this.tareaEditando= {} as Tarea;
    }, (error) => {
      console.error(error);
    });
  }

  obtenerListaTareas(){
    this.firestoreService.consultar("tareas").subscribe((resultadoConsultaTareas) => {
      this.arrayColeccionTareas = [];
      resultadoConsultaTareas.forEach((datosTarea: any) => {
        this.arrayColeccionTareas.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
    });
  }
  
  selecTarea(idTarea:string, tareaSelec:Tarea) {
    this.idTareaSelec = idTarea;
    this.tareaEditando = tareaSelec;
    this.router.navigate(['detalle', this.idTareaSelec]);
  }

  clicBotonBorrar() {
    this.firestoreService.borrar("tareas", this.idTareaSelec).then(() => {
      this.obtenerListaTareas();
      this.tareaEditando = {} as Tarea;
    })
  }

}
