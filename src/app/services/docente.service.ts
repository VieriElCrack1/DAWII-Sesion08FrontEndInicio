import { Injectable } from '@angular/core';
import { AppApi } from '../app.api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = AppApi.API + "/docente";

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  constructor(private http : HttpClient) { }

  listaDocenteNombreDniUbigeo(nombre : string, dni : string, idUbigeo : number, estado : number) : Observable<any> {
    let parametro = new HttpParams().set("nombre", nombre).set("dni", dni).set("idUbigeo", idUbigeo).set("estado", estado);
    return this.http.get<any>(url + "/listaDocenteConParametros", {params: parametro});
  }
}
