import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarea } from '../tarea'
import { FirestoreService } from '../firestore.service';

import { LoadingController, ToastController } from '@ionic/angular';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  id: string = "";

  document: any = {
    id: "",
    data: {} as Tarea
  };

  accionInsertar: boolean = false;

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.clicBotonBorrar();
      },
    },
  ];

  constructor(private activatedRoute: ActivatedRoute, 
    private firestoreService: FirestoreService, 
    private router: Router,private loadingController: LoadingController,
    private toastController: ToastController,
    private imagePicker: ImagePicker) { }

  ngOnInit() {
    // Se almacena en una variable el id que se ha recibido desde la página anterior
    let idRecibido = this.activatedRoute.snapshot.paramMap.get('id');
    if(idRecibido!= null) {
      this.id = idRecibido;
    } else {
      this.id = "";
    }
    if(this.id == "nuevo") {
      this.accionInsertar = true;
    } else {
      // Se hace la consulta a la base de datos para obtener los datos asociados a esa id
      this.firestoreService.consultarPorId("tareas", this.id).subscribe((resultado:any) => {
        // Preguntar si se hay encontrado un document con ese ID
        if(resultado.payload.data() != null) {
          this.document.id = resultado.payload.id
          this.document.data = resultado.payload.data();
          // Como ejemplo, mostrar el título de la tarea en consola
          console.log(this.document.data.titulo);
        } else {
          // No se ha encontrado un document con ese ID. Vaciar los datos que hubiera
          this.document.data = {} as Tarea;
        } 
      });
    }
  } 

  clicBotonBorrar() {
    this.firestoreService.borrar("tareas", this.id).then(() => {
      console.log('Tarea borrada correctamente!');
      this.document.data= {} as Tarea;
      this.id = "";
    }, (error) => {
      console.error(error);
    });
    this.router.navigate(['home']);
  }

  clicBotonModificar() {
    this.firestoreService.modificar("tareas", this.id, this.document.data).then(() => {
      console.log('Tarea modificada correctamente!');
    }, (error) => {
      console.error(error);
    });
    this.router.navigate(['home']);
  }

  clicBotonInsertar() {
    //this.firestoreService.insertar("tareas", this.tareaEditando);
    this.firestoreService.insertar("tareas", this.document.data).then(() => {
      console.log('Tarea creada correctamente!');
      this.document.data= {} as Tarea;
    }, (error) => {
      console.error(error);
    });
    this.router.navigate(['home']);
  }
}
