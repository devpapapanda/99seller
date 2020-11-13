import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

import { AuthService } from "./service/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  appPages;
  user_data;
  user_image_icon;
  user_name;
  user_phone;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public authservice: AuthService,
    private storage: Storage,
  ) {
    this.initializeApp();
    this.getMenu();

    this.storage.get('user_data').then((response) => {
      //console.log(response);
      this.user_data=response;
      if(this.user_data['image_icon']==null || this.user_data['image_icon']==undefined){
        this.user_image_icon='https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y';

      }
      this.user_name=this.user_data.name;
      this.user_phone=this.user_data.phone;
      //console.log(this.user_data['image_icon']);
      //this.user_data['image_icon']='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80';
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#00F0F8FF');
      this.splashScreen.hide();
    });
  }

  getMenu() {
    this.appPages = [
      {
        title: 'Home',
        url: '/dashboard',
        icon: 'home-outline',
        chileMenu: []
      },
      {
        title: 'My Account',
        url: '/myaccount',
        icon: 'settings-outline',
        chileMenu: []
      },
      {
        title: 'My Notifications',
        url: '/notification',
        icon: 'notifications-outline',
        chileMenu: []
      },
     
      
    ];

  }


  open_notification(){
    //alert(1);
    this.router.navigate(['/notification']);
    
  }

  log(){
    console.log(1);
  }

  open_profile_page(){
    this.router.navigate(['/profile']);
  }

}
