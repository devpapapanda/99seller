import { Injectable } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';

import { MenuController,ModalController,ToastController,LoadingController  } from '@ionic/angular';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Network } from '@ionic-native/network/ngx';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  loading;
  loading_present_flag;

  constructor(
    private menu: MenuController,
    private network: Network,
    private http: HttpClient,
    public toastController: ToastController,
    public loadingController: LoadingController,
  ) { 
    
  }

  openmenu() {
    //this.menu.enable('custom');
    this.menu.open('custom');
  }

  checkNetworkDisconnect() {
    if (!navigator.onLine) {
      // this.alertService.presentAlert("Please check your internet connection!!");
      // this.loadingService.dismiss();
      return true;
    } else {
      return false;
    }

  }


  http_Api_Call(endpoint,data: any): Observable<any>{
    if (!this.checkNetworkDisconnect())
      return this.http.post(environment.apiEndpoint + endpoint, data);
  }


  http_Api_Get_Call(endpoint): Observable<any>{
    if (!this.checkNetworkDisconnect())
      return this.http.get(environment.apiEndpoint + endpoint);
  }


  async presentToast(text,time) {
    const toast = await this.toastController.create({
      message: text,
      duration: time,
      cssClass:'toaster',
      //color:'light'
    });
    toast.present();
  }

  async presentLoading() {
     this.loading = await this.loadingController.create({
      //cssClass: 'my-custom-class',
      message: 'Please wait...',
      //duration: 2000
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  cancel_loading(){
    if (this.loading) {
      this.loading.dismiss();
    }
    
  }

}
