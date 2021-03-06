import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(public userService: UserService) { }
  userArray = [];
  showDeletedMessage: boolean;
  searchText: string = "";

  ngOnInit() {
    this.userService.getusers().subscribe(
      list => {
        this.userArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

  onDelete($key) {
    if (confirm('Are you sure to delete this record ?')) {
      this.userService.deleteuser($key);
      this.showDeletedMessage = true;
      setTimeout(() => this.showDeletedMessage = false, 3000);
    }
  }


  filterCondition(user) {
    return user.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }

}
