import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService, AuthResponseData } from './auth.service';


@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent{
    isLoginMode=false;
    isLoading=false;
    error=null;

   

    constructor(private authservice:AuthService,private router:Router){}

    onSwitchMode(){
        this.isLoginMode=!this.isLoginMode;
    }

    onSubmit(Form:NgForm){
        if(!Form.valid){
            return;
        }
        let authObs: Observable<AuthResponseData>;

        const email=Form.value.email;
        const password=Form.value.password;

        if(this.isLoginMode){
            this.isLoading=true;
            authObs= this.authservice.login(email,password);
        }else{
            this.isLoading=true;
            authObs=this.authservice.singUp(email,password);
        }

    authObs.subscribe(resData=>{
        console.log(resData);
        this.isLoading=false;
        this.router.navigate(['/recipes']);
    },

    errorMessage=>{
        this.error=errorMessage;
        this.isLoading=false;
    }
    );
    Form.reset();
    }
    onHandelError(){
        this.error=null;
    }
}