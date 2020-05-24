import {Component, OnInit} from '@angular/core';
import { DataStorageService } from '../shared/data-storag.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html'

})
export class HeaderComponent implements OnInit{

    isAuthenticated = false;
    private userSub: Subscription;

    constructor(private dataservice:DataStorageService,private authservice:AuthService){}

    ngOnInit(): void {
        this.userSub = this.authservice.user.subscribe(user => {
          this.isAuthenticated = !!user;
          console.log(!user);
          console.log(!!user);
        });

    }

    onSaveData(){
        this.dataservice.storeRecipes();
    }
    onFecthData(){
        this.dataservice.fetchdata().subscribe();
    }
    
    onLogout(){
        this.authservice.logout();
    }

}