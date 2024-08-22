import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../../services/docente.service';
import { Docente } from '../../models/docente';
import { FormsModule } from '@angular/forms';
import { Ubigeo } from '../../models/ubigeo';
import { UbigeoService } from '../../services/ubigeo.service';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-docente',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crud-docente.component.html',
  styleUrl: './crud-docente.component.css'
})
export class CrudDocenteComponent implements OnInit{

  nombre : string = "";

  docentes : Docente[] = [];

  docente : Docente = {
    idDocente:0,
    nombre:"",
    dni:"",
    estado:1,
    ubigeo:{
      idUbigeo: 0,
      departamento:"-1",
      provincia:"-1",
      distrito:"-1",
    }
  };

  departamento : string[] = [];
  provincia : string[] = [];
  ubigeo : Ubigeo[] = [];

  submitted = false;

  constructor(private docenteService : DocenteService, private ubigeoService : UbigeoService) {}

  consultaDocente() {
    this.docenteService.listaDocenteNombre(this.nombre==""?"todos":this.nombre).subscribe(x => {
      this.docentes = x;
    });
  }

  cargaDistrito() {
    this.ubigeoService.listaDistritos(this.docente.ubigeo?.departamento, this.docente.ubigeo?.provincia)
    .subscribe(x => {
      this.ubigeo = x;
    });
    this.docente.ubigeo!!.idUbigeo = 0;
  }
  
  cargaProvincia() {
    this.ubigeoService.listaProvincias(this.docente.ubigeo?.departamento).subscribe(x => {
      this.provincia = x;
    });
    this.docente.ubigeo!!.provincia = "-1";
    this.docente.ubigeo!!.idUbigeo = 0;
  }


  abrirModal(): void {
    const modalElement = document.getElementById('idModalRegistrar');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  cambiaEstado(obj : Docente) {
    obj.estado = obj.estado == 1 ? 0 : 1;
    this.docenteService.actualizaDocente(obj).subscribe();
  }

  modalActualizar() {
    const modal = document.getElementById("idModalActualizar");
    if(modal) {
      const openModal = new bootstrap.Modal(modal);
      openModal.show();
    }
  }

  buscar(obj : Docente) {
    this.modalActualizar();
    this.docente = obj;

    this.ubigeoService.listaProvincias(this.docente.ubigeo?.departamento).subscribe(
      response =>  this.provincia = response
    );

    this.ubigeoService.listaDistritos(this.docente.ubigeo?.departamento, this.docente.ubigeo?.provincia).subscribe(
      response =>  this.ubigeo = response
     );
  }

  registrar() {
    this.docenteService.insertaDocente(this.docente).subscribe(
        x => {
          document.getElementById("btn_reg_cerrar")?.click();
          Swal.fire({
            title: "Mensaje",
            text: x.mensaje,
            icon: "success"
          });
          this.docente = {};
          this.docente.ubigeo!!.idUbigeo = 0;
          this.docente.ubigeo!!.provincia = "-1";
          this.docente.ubigeo!!.departamento = "-1";
        }
    );
  }

  actualizar() {
    this.docenteService.actualizaDocente(this.docente).subscribe(x => {
      document.getElementById("btn_act_cerrar")?.click();
      Swal.fire({
        title: "Mensaje",
        text: x.mensaje,
        icon: "info"
      });
      this.docente = {};
      this.docente.ubigeo!!.idUbigeo = 0;
      this.docente.ubigeo!!.provincia = "-1";
      this.docente.ubigeo!!.departamento = "-1";
    });
  }

  eliminar(obj :Docente){
    console.log(">>> elimina >> ");
    
    Swal.fire({
      title: 'Mensaje',
      text: "¿Desea eliminar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimine',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
            this.docenteService.eliminaDocente(obj.idDocente || 0).subscribe(
                  x =>{ 
                          Swal.fire('Mensaje', x.mensaje,'info'); 
                          this.docenteService.listaDocenteNombre(this.nombre==""?"todos":this.nombre).subscribe(
                              x => this.docentes = x
                          ); 
                      }
            );
      }
    })

    
}

  ngOnInit(): void {
    this.ubigeoService.listaDepartamentos().subscribe(x => {
      this.departamento = x;
    });
  }
}
