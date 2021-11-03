import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routingModule } from './task-app.routing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { APP_BASE_HREF, CommonModule } from '@angular/common';

import { AppComponent } from './task-app.component';
import { UiModule } from './_shared/ui/ui.module';
import { FakeBackendInterceptor } from './_shared/fakebackend';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_auth/guards/auth.guard';
import { TokenIntercept } from './_auth/tokenintercept';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

import { ItemsModule } from './items/items.module';

import { ItemsService } from './items/_services/items.service';
import { AuthService } from './_auth/services/auth.service';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LogoutComponent,
    RegisterComponent,
    ErrorComponent,
  ],
  imports: [
  
    UiModule,
    HttpClientModule,
    RouterModule,
    routingModule,
    ReactiveFormsModule,
    FormsModule,
    ItemsModule,
    CommonModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/'},
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercept,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FakeBackendInterceptor,
      multi: true
    },
    AuthService,
    ItemsService,
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class TaskAppModule { }
