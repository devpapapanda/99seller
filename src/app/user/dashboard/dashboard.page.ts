import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { environment } from '../../../environments/environment';

import { HeaderComponent } from "../../common/header/header.component";
import { CommonService } from "../../service/common.service";
//import { MenuComponent } from "../../common/menu/menu.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  property_list;

  constructor(
    private menu: MenuController,
    public commonservice:CommonService,
  ) { }

  ngOnInit() {
    var data={
      
      secret_key:environment.secret_key,
      token_key:environment.token_key
    }
    this.commonservice.http_Api_Call('property_list',data).toPromise().then(      
      res => {          
        //console.log(res.data);
        this.property_list=res.data;
        this.commonservice.presentToast(res.message,1500);
        //this.commonservice.cancel_loading();
      },
      error => {
        console.log("error::::" + error);
        
        //this.bar_loader=false;
        //this.commonservice.cancel_loading();
        this.commonservice.presentToast(error,1000);
      });
      
  }




}
