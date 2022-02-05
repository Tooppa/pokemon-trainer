import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CataloguePageComponent } from './catalogue-page/catalogue-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginGuard } from './services/guards/login.guard';
import { TrainerPageComponent } from './trainer-page/trainer-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: 'trainer',
    component: TrainerPageComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'catalogue',
    component: CataloguePageComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
