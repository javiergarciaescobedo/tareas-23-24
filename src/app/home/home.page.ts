import { Component } from '@angular/core';
import {Tarea} from '../tarea'
import { FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tareaEditando = {} as Tarea;

  constructor(private firestoreService: FirestoreService) {}

  clicBotonInsertar() {
    //this.firestoreService.insertar("tareas", this.tareaEditando);
    this.firestoreService.insertar("tareas", this.tareaEditando).then(() => {
      console.log('Tarea creada correctamente!');
      this.tareaEditando= {} as Tarea;
    }, (error) => {
      console.error(error);
    });
  }

}
