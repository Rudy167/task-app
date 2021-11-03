import { Component, OnInit , Inject } from '@angular/core';
import { Validators, AbstractControl, FormBuilder, FormGroup, FormControl , Validator , FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

import { CheckRequiredField } from '../_shared/helpers/form.helper';
import { AuthService } from '../_auth/services/auth.service';
import { RegisterService } from './register.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  processing: Boolean = false;
  error: Boolean = false;

  checkField  = CheckRequiredField;
  errorMessage: any;
  isRegisterSuccess: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private registerService : RegisterService
  ) { }

  ngOnInit() {
    if (this.authService.hasToken()) {
      this.handleLoginSuccess();
    } else {
      this.initForm();
    }
  }

  // checkRequiredClass(frmControl: string) {
  //   const t  = this.loginForm.get()
  //   return {
  //     'required' : false
  //   };
  // }

  onSubmitButtonClicked() {
    this.error  = false;
    this.processing  = false;
    if (this.registerForm.valid) {
      this.register();
    }
  }

  private register() {
    this.processing  = true;
    this.registerService.register(this.registerForm.value).then(
      data => {
        if (data.status==201) {
         
          this.handleLoginSuccess();
        } else {
          this.handleLoginError(data);
        }
      },
      err => {
        console.log('---- ERROR ---- ');
        console.log(err);
        this.handleLoginError(err);
      });
  }

  private handleLoginSuccess() {
    this.processing = false;
    this.error  = false;
    this.isRegisterSuccess=true;
    
    
    
    
    setTimeout(()=>this.router.navigateByUrl('dashboard'),5000);
    // location.reload();

  }

  private handleLoginError(data) {
    this.processing = false;
    this.error  = true;
    if(data.error.message){
      this.errorMessage=data.error.message;
    }
    else{
      this.errorMessage="Please check your email/password and try again.";
    }
  }

  private initForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [ Validators.required]),
      email: new FormControl('', [ Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  
  signIn(){
    this.router.navigate(['/login']);
  }

}
