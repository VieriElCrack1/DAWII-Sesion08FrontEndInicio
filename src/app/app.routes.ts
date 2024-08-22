import { Routes } from '@angular/router';
import { CrudDocenteComponent } from './components/crud-docente/crud-docente.component';

export const routes: Routes = [
    {path: "consultaDocente", component: CrudDocenteComponent},
    {path: "", component: CrudDocenteComponent, pathMatch: "full"}
];
