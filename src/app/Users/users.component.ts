import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { user } from 'src/models/user.model';
import { usersService } from 'src/services/users.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class usersComponent implements OnInit, AfterViewInit { 
  @ViewChild('adduserButton') adduserButton: any;
  title = 'usersCRUD';

  usersForm: FormGroup;

  users: user[];
  usersToDisplay: user[];


  constructor(
    private fb: FormBuilder,
    private _user: usersService
  ) {
    this.usersForm = fb.group({});
    this.users = [];
    this.usersToDisplay = this.users;
  }

  ngOnInit(): void {
    this.usersForm = this.fb.group({
      firstname: this.fb.control(''),
      lastname: this.fb.control(''),
      birthday: this.fb.control(''),
      gender: this.fb.control(''),
      company: this.fb.control(''),
      jobExperience: this.fb.control(''),
      salary: this.fb.control(''),
    });

    

    this._user.getusers().subscribe((res) => {
      console.log(res.results);
      for (let std of res.results) {
        this.users.unshift(std);
      }
      this.usersToDisplay = this.users;
    });
  }
  searchusers(event: any) {
    let filteredusers: user[] = [];

    if (event === '') {
      this.usersToDisplay = this.users;
    } else {
      filteredusers = this.users.filter((val, index) => {
        let targetKey = val.first_name.toLowerCase() + '' + val.last_name.toLowerCase();
        let searchKey = event.toLowerCase();
        return targetKey.includes(searchKey);
      });
      this.usersToDisplay = filteredusers;
    }
  }
  ngAfterViewInit(): void {
    //this.buttontemp.nativeElement.click();
  }
  simpleAlert(){
    Swal.fire('Hello world!');
  }
  alertWithSuccess(){
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
  }
  
  confirmBox(){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

}
