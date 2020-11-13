import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from "../../../environments/environment";
import { CommonService } from "../../service/common.service";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public commonservice: CommonService,
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      

      //username: [false, Validators.requiredTrue],
      name:['', Validators.required],
      email:['', Validators.required],
     
      phone:['', Validators.required],
      address:['', Validators.required],
      //food: '',
    // social_media: ''
    });
    //this.form.valueChanges.subscribe(console.log);
  }

  login(){
    this.router.navigate(['/login']);
  }

  submitHandler(){
    //console.log("submit");

      this.commonservice.presentLoading();
      //console.log(loginForm.value);
      this.form.value['secret_key']=environment.secret_key;
      this.form.value['token_key']=environment.token_key;
      
      
      this.commonservice.http_Api_Call('user_registration',this.form.value).toPromise().then(      
        async res => {          
          console.log('data api: ', res);
          //this.bar_loader=false;
          this.commonservice.cancel_loading();
          if(res.success==1){
            
            this.router.navigate(['login']);
          }else{
            
            //this.is_authenticated=false;
              
                
          }
          this.commonservice.presentToast(res.message,2000);
        },
        error => {
          console.log("error::::" + error);
          
          //this.bar_loader=false;
          this.commonservice.cancel_loading();
          this.commonservice.presentToast(error,1500);
        });
    

  }

}
