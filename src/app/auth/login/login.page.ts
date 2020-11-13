import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from "../../service/common.service";
import { AuthGuard } from "../../service/auth.guard";
import { environment } from "../../../environments/environment";

import { Dialogs } from '@ionic-native/dialogs/ngx';

import { Storage } from '@ionic/storage';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: String;
  password: String;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-outline';


  constructor(
    private router: Router,
    public commonservice:CommonService,
    public authservice:AuthService,
    private storage: Storage,
    private dialogs: Dialogs,
    
  ) { }

  ngOnInit() {
    this.storage.get('user_data').then((val) => {
      console.log(val);
      //response_of_api = val;
      //this.is_authenticated=true;
      
    });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off-outline' ? 'eye-outline' : 'eye-off-outline';
  }


  Login(loginForm){
    
    if(loginForm.value.username!=undefined||loginForm.value.password!=undefined){
      //this.commonservice.presentLoading();
      //console.log(loginForm.value);
      var data={
        email:loginForm.value.username,
        password:loginForm.value.password,
        secret_key:environment.secret_key,
        token_key:environment.token_key
      }
      this.authservice.authenticate(data);
      // this.commonservice.http_Api_Call('user_login',data).toPromise().then(      
      //   async res => {          
      //     console.log('data api: ', res);
      //     //this.bar_loader=false;
      //     this.commonservice.cancel_loading();
      //     if(res.success==1){
      //       this.storage.set('user_data',res.data);
      //       this.router.navigate(['dashboard']);
      //     }else{
            
      //       //this.is_authenticated=false;
      //       this.storage.set('user_data','');   
                
      //     }
      //     this.commonservice.presentToast(res.message);
      //   },
      //   error => {
      //     console.log("error::::" + error);
      //     this.storage.set('user_data','');
      //     //this.bar_loader=false;
      //     this.commonservice.cancel_loading();
      //     this.commonservice.presentToast(error);
      //   });
    }else{
      this.commonservice.presentToast("Please provide the Credentials",1500);
    }
    
    
  }

  Signup(){
    this.router.navigate(['signup']);
  }

  

}
