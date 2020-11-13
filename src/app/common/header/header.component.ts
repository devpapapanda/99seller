import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { SearchPage } from '../../user/search/search.page';
import { NotificationPage } from "../../user/notification/notification.page";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private menu: MenuController,
    public modalController: ModalController,
    private router: Router,
    

  ) { }

  ngOnInit() {
    
  }

  async searchmodal() {
    const modal = await this.modalController.create({
      component: SearchPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  notification() {
    this.router.navigate(['/notification']);
  }
  
  

  openmenu() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

}
