import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../common/header/header.component";

import { CommonService } from "../../service/common.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {


  constructor(
    public header:HeaderComponent,
    public commonService:CommonService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  openmenu() {
    //this.menu.enable('custom');
    //this.menu.open('custom');
    this.header.openmenu();
  }

  go_back(){
    this.router.navigate(['dashboard']);
  }

}
