import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user.model';
import { environment } from '../../environments/environment';

export interface AuthResponseData{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}

@Injectable({providedIn:'root'})

export class AuthService{
    [x: string]: any;
    tokenExpirationTimer:any;
    user=new BehaviorSubject<User>(null);

    constructor(private http:HttpClient, private router:Router){}

    singUp(email:string,password:string){
        return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,
        {
            email:email,
            password:password,
            returnSecureToken:true
        }
        )
        .pipe(catchError( this.handleError),tap(resData=>{
            this.handleAuthentication(resData.email, resData.localId, resData.idToken,+resData.expiresIn);
           
        })
        );
    }

    login(email:string,password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
        {
            email:email,
            password:password,
            returnSecureToken:true
        }
        ).pipe(catchError( this.handleError),tap(resData=>{
            this.handleAuthentication(resData.email, resData.localId, resData.idToken,+resData.expiresIn);
           
        }
           
        ));

    }

    logout(){
        this.user.next(null);
        this.router.navigate(['auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer=null;
    }

    autoLogout(expirationDuration:number){
        this.tokenExpirationTimer= setTimeout(() => {
            this.logout();
            
        }, expirationDuration);
    }

    autoLogin(){
        const userData:{
             email:string,
             id:string, 
             _token:string, 
             _tokenExpirationDate:Date
        }=JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadUser=new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate));

        if(loadUser.token){
            this.user.next(loadUser);
            const expirationDuration= new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }

    }

    private handleAuthentication(email:string, userId:string, token:string, expiresIn:number){
        const expirationDate=new Date(new Date().getTime()+ expiresIn*1000);
        const user=new User(email,userId,token,expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn*1000);
        localStorage.setItem('userData',JSON.stringify(user));
    }

    private handleError(errorRes:HttpErrorResponse){
        let errorMessage='An unknown erroe ooccured!';
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMessage);
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_EXISTS':
                    errorMessage='This email already exixts!';
                    break;
            }
            switch(errorRes.error.error.message){
                case 'INVALID_PASSWORD':
                    errorMessage='Invalid email or password!';
                    break;
            }
            switch(errorRes.error.error.message){
                case 'EMAIL_NOT_FOUND':
                    errorMessage='User not found!';
                    break;
            }
            return throwError(errorMessage);

    }
}