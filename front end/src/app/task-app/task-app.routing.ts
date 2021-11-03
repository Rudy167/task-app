import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from './_auth/guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { RegisterComponent } from './register/register.component';




const routes: Routes = [

    { path: 'dashboard', component: ItemsComponent , canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'edit', loadChildren: ()=>import('./items/items.module').then(m=>m.ItemsModule) },
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '',  redirectTo: '/dashboard', pathMatch: 'full' }, // catch all route


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class routingModule{};
