import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationPageRoutingModule } from './notification-routing.module';

import { NotificationPage } from './notification.page';
//import { MenuComponent } from "../../common/menu/menu.component";
import { HeaderComponent } from "../../common/header/header.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationPageRoutingModule
  ],
  declarations: [NotificationPage],
})
export class NotificationPageModule {}
