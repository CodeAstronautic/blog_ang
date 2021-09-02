import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../../frontend/service/user.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  apiUrl = environment.apiUrl;

  profileForm: FormGroup;
  myName = null;
  myBio = null;
  myAvatar = null;
  myEmail = null;
  myCategories = [];

  //edit variables
  editNameField = false;
  editBioField = false;
  editPasswordField = false;

  userImage!: File;

  constructor(private _fb: FormBuilder, private userService: UserService, public auth: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.generateProfileForm();
    this.auth.userProfile.asObservable().subscribe((data: any) => {
      console.log('user profile data')
      console.log(data);
      if (data.name) {
        this.profileForm.controls.name.patchValue(data.name);
        this.myName = data.name;
      }
      if (data.bio) {
        this.profileForm.controls.bio.patchValue(data.bio);
        this.myBio = data.bio;
      }
      if (data.email) {
        this.myEmail = data.email;
      }
      if (data.avatar) {
        this.myAvatar = this.apiUrl + 'images/auth/' + data.avatar;
      }
      if (data.selected_category && data.selected_category.length > 0) {
        this.myCategories = data.selected_category;
      }
    })
  }
  async onAvatarChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.userImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.myAvatar = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);

      const featuredImage = new FormData();
      featuredImage.append("avatar", file);

      (await this.http.post(`${this.apiUrl}api/user`, featuredImage)).subscribe((data: any) => {
        console.log(data)
        if (data) {
          location.reload();
        }
      })
    }
  }


  generateProfileForm() {
    this.profileForm = this._fb.group({
      name: [],
      password: [],
      bio: []
    })
  }

  async updateBio() {
    if (this.profileForm.controls.bio.value != this.myBio) {
      (await this.userService.updateUserProfile({ bio: this.profileForm.controls.bio.value })).subscribe((response) => {
        console.log(response);
        this.auth.setUserData();
      })
    }
    this.editBioField = false;
  }
  async updateName() {
    if (this.profileForm.controls.name.value != this.myName && this.profileForm.controls.name.value) {
      (await this.userService.updateUserProfile({ name: this.profileForm.controls.name.value })).subscribe((response) => {
        console.log(response);
        this.auth.setUserData();
      })
    }
    this.editNameField = false;
  }
  async updatePassword() {
    (await this.userService.updateUserProfile({ password: this.profileForm.controls.password.value })).subscribe((response) => {
      console.log(response);
      this.auth.setUserData();
    })
    this.editPasswordField = false;
  }

  // editButtons
  editName() {
    this.editNameField = true;
  }
  editPassword() {
    this.editPasswordField = true;
  }
  editBio() {
    this.editBioField = true;
  }

  cancelName() {
    this.editNameField = false;
  }
  cancelPassword() {
    this.editPasswordField = false;
  }
  cancelBio() {
    this.editBioField = false;
  }

}
