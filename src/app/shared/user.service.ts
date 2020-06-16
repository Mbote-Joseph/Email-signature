import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firebase: AngularFireDatabase) { }
  userList: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    company: new FormControl(''),
    position: new FormControl(''),
    department: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    website: new FormControl(''),
    skype: new FormControl(''),
    email: new FormControl('', Validators.email),
    password: new FormControl(''),
    address: new FormControl(''),
    
  });


  getusers() {
    this.userList = this.firebase.list('users');
    return this.userList.snapshotChanges();
  }


  insertuser(user) {
    this.userList.push({
      fullName: user.fullName,
        company: user.company,
        position: user.position,
        department: user.department,
        phone: user.phone,
        mobile: user.mobile,
        website: user.website,
        skype: user.skype,
        email: user.email,
        password: user.password,
        address: user.address,
        
    });
  }

  populateForm(user) {
    this.form.setValue(user);
  }

  updateuser(user) {
    this.userList.update(user.$key,
      {
        fullName: user.fullName,
        company: user.company,
        position: user.position,
        department: user.department,
        phone: user.phone,
        mobile: user.mobile,
        website: user.website,
        skype: user.skype,
        email: user.email,
        password: user.password,
        address: user.address,
       
      });
  }

  deleteuser($key: string) {
    this.userList.remove($key);
  }
}