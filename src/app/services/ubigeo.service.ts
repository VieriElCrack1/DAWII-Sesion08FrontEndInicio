import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppApi } from '../app.api';
import { Ubigeo } from '../models/ubigeo';

const url = AppApi.API + "/util";

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  constructor(private http : HttpClient) { }

  listaDepartamentos() : Observable<string[]> {
    return this.http.get<string[]>(url + "/listaDepartamentos");
  }

  listaProvincias(paramDep : any) : Observable<string[]> {
    return this.http.get<string[]>(url + "/listaProvincias/" + paramDep);
  }

  listaDistritos(paramDep : any, paramProv : any) : Observable<Ubigeo[]> {
    return this.http.get<Ubigeo[]>(url + "/listaDistritos/" + paramDep + "/" + paramProv);
  }
}
