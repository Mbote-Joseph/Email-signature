import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import {UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // selectedFile=null;

  constructor(public userService: UserService) { }
  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.userService.form.controls;

  ngOnInit() {
  }
  // onFileSelected(event){
  //   console.log(event);
  //   this.selectedFile= event.target.file[0];
  // }

  // onUpload(){
  //   const fd = new FormData();
  //   fd.append('image', this.selectedFile, this.selectedFile.name);
  // }

  onSubmit() {
    this.submitted = true;
    if (this.userService.form.valid) {
      if (this.userService.form.get('$key').value == null)
        this.userService.insertuser(this.userService.form.value);
      else
        this.userService.updateuser(this.userService.form.value);
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
      this.submitted = false;
      this.userService.form.reset();
      //this is to be done for proper reset operation
      this.userService.form.setValue({
        $key: null,
        fullName: '',
        company:'',
        position:'',
        department:'',
        phone:'',
        mobile: '',
        website:'',
        skype:'',
        email: '',
        password:'',
        address:'',
      });
    }
  }

}
