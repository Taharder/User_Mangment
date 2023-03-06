import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { user } from 'src/models/user.model';
import { usersService } from 'src/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit { 
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('adduserButton') adduserButton: any;
  title = 'usersCRUD';

  usersForm: FormGroup;

  users: user[];
  usersToDisplay: user[];


  constructor(
    private fb: FormBuilder,
    private userService: usersService
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

    


  }
  

  ngAfterViewInit(): void {
    //this.buttontemp.nativeElement.click();
  }

  





}
