import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

import { HeaderComponent } from "../../common/header/header.component";
import { environment } from "../../../environments/environment";
import { CommonService } from "../../service/common.service";

import { Storage  } from '@ionic/storage';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

declare var cordova: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user_details;
  user_id;
  name;
  lastImage;
  currentDate;
  profile_img;
  

  constructor(
    public storage: Storage,
    public header:HeaderComponent,
    private router: Router,
    private platform: Platform,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private filePath: FilePath,
    private file: File,
    private transfer: FileTransfer,
    public commonservice: CommonService,

  ) {
    this.storage.get('user_data').then((response) => {
      this.user_details=response;
      this.name=this.user_details.name;
      this.user_id=this.user_details.user_id;
        //console.log(this.name);

        var data={
          secret_key:environment.secret_key,
          token_key:environment.token_key,
          user_id:this.user_details.user_id
        }
        this.commonservice.http_Api_Call('user_profile',data).toPromise().then(      
          res => {          
            //console.log(res.data);
            this.user_details=res.data;
            if(this.user_details.image_icon!=undefined || this.user_details.image_icon!=null){
              this.profile_img=this.user_details.image_icon;
            }else{
              this.profile_img='https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y';
            }
            
            this.commonservice.presentToast(res.message,1500);
            //this.commonservice.cancel_loading();
          },
          error => {
            console.log("error::::" + error);
            
            //this.bar_loader=false;
            //this.commonservice.cancel_loading();
            this.commonservice.presentToast(error,1000);
          });


    }); 
    //console.log(this.user_id);
  }

  ngOnInit() {
    //console.log(this.user_details.user_id);
    
  }

  openmenu() {
    //this.menu.enable('custom');
    //this.menu.open('custom');
    this.header.openmenu();
  }

  go_back(){
    this.router.navigate(['dashboard']);
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionsheet => {
      actionsheet.present();
    });
  }

  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
      quality: 60,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    });

  }

  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;

      this.uploadImage();
    }, error => {
      this.commonservice.presentToast('Error while storing file.',1000);
    });
  }


  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".png";
    return newFileName;
  }


  public uploadImage() {
    var targetPath = this.pathForImage(this.lastImage);
    var filename = this.lastImage;
    console.log('filename', filename)
    var today = new Date();
    this.currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var options = {
      fileKey: "profile_pic",
      fileName: filename,
      chunkedMode: false,
      params: { 'fileName': filename, 'upload_date': this.currentDate, 'user_id': this.user_id, 'type': "update_photo", },
    };

    const fileTransfer: FileTransferObject = this.transfer.create()
    //this.loadingService.present();
    fileTransfer.upload(targetPath, environment.apiEndpoint + 'usr.php/', options).then(data => {
      //this.loadingService.dismiss()
      this.commonservice.presentToast('Image succesful uploaded.', 1000);
      var userUpdateImg = JSON.parse(data.response);
      this.profile_img = userUpdateImg.result;

      this.storage.get('USER_INFO').then((val) => {
        let val1 = val;
        val1['photo'] = userUpdateImg.result;
        this.storage.set('USER_INFO', val1);
        //this.my_account_event.publish('update_profile_image', '1');
      });
    }, err => {
      //this.loadingService.dismiss()
      this.commonservice.presentToast('Error while uploading file.', 3000);
    });
  }


  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

}
