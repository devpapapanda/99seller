import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
//import { User } from './user.model'; // optional

import { Platform } from '@ionic/angular';
import { Storage  } from '@ionic/storage';
//import { HTTP } from '@ionic-native/http/ngx';




import{ CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = new BehaviorSubject(false);

  user$: Observable<any>;
  user;
  bar_loader=false;
  is_authenticated=false;
  user_data_from_authentication;
  user_data_from_database;

  constructor(
    
    private router: Router,
    public platform: Platform,
    public storage: Storage,
    public http: HttpClient, 
    public commonservice: CommonService,
) { 
  //console.log(this.afAuth.authState);
  
  //this.get_auth_user_data();
  this.platform.ready().then(() => {
    this.ifLoggedIn();
  });
  //console.log('this.authState.value:',this.authState.value);
}

async authenticate(data){
  this.commonservice.presentLoading();
  let result;
  await this.commonservice.http_Api_Call('user_login',data).toPromise().then(      
    res => {          
      if(res.success==1){
        //console.log(res.data);
        this.storage.set('user_data',res.data);
        this.authState.next(true);
        this.router.navigate(['dashboard']);
      }else{
        
        //this.is_authenticated=false;
        this.storage.set('user_data','');   
            
      }
      this.commonservice.presentToast(res.message,1500);
      this.commonservice.cancel_loading();
    },
    error => {
      console.log("error::::" + error);
      this.storage.set('user_data','');
      //this.bar_loader=false;
      this.commonservice.cancel_loading();
      this.commonservice.presentToast(error,1000);
    });
    //console.log('reslt',result);
    return result;
}

async check_authentication(){
  //console.log('this.authState.value:',this.authState.value);
  return this.authState.value;
}

ifLoggedIn() {
  
  this.storage.get('user_data').then((response) => {
    if (response) {
      //console.log(response);
      this.authState.next(true);
      this.router.navigate(['/dashboard']);

    }else{
      this.router.navigate(['/login']);
    }
  });
}

async signOut() {
  console.log("logged out");
  this.authState.next(false);
  this.storage.set('user_data','');
  this.commonservice.presentToast("Logged out!",1000);
  this.router.navigate(['/login']);
}


loggedIn(){
  this.router.navigate(['/tabs/profile/adoption']);
}


}
