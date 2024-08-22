import { Injectable } from '@angular/core';
import { AppApi } from '../app.api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docente } from '../models/docente';

const url = AppApi.API + "/crudDocente";

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  constructor(private http : HttpClient) { }

  listaDocenteNombre(nombre : string) : Observable<Docente[]> {
    return this.http.get<Docente[]>(url + "/listaDocentePorNombreLike/" + nombre);
  }

  insertaDocente(docente : Docente) : Observable<any> {
    return this.http.post<any>(url + "/registraDocente", docente);
  }

  actualizaDocente(docente : Docente) : Observable<any> {
    return this.http.put<any>(url + "/actualizaDocente", docente);
  }

  eliminaDocente(id : number) : Observable<any> {
    return this.http.delete<any>(url + "/eliminaDocente/" + id);
  }
}
