import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Console } from 'console';
import { json } from 'express';
import { user } from 'src/models/user.model';
import { usersService } from 'src/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit { 
  @ViewChild('addStudentButton') addStudentButton: any;
  title = 'usersCRUD';
  submitted:any;

  usersForm: FormGroup;

  users: user[];


  constructor(
    private fb: FormBuilder,
    private _userSerice: usersService,
  ) {
    this.usersForm = fb.group({});
    this.users = [];
  }

  ngOnInit(): void {
    this.usersForm = this.fb.group({
      firstname:['',Validators.required],
      lastname: ['',Validators.required],
      username:['',Validators.required],
      image:['',Validators.required],
      email:['',Validators.required,Validators.email],
    });

  }

  addUser() {

    if (this.usersForm.invalid) {
      this.submitted=false;
      return;
      
    }else{
      this.submitted=true;
    let user: user = {
      first_name: this.FirstName.value,
      last_name: this.LastName.value,
      username: this.UserName.value,
      image: this.Image.value,
      email: this.Email.value,
      _id: ''
    };
    this._userSerice.postusers(user).subscribe((res) => {
      console.log(res);
      this.users.unshift(res);
      this.clearForm();
      Swal.fire("Created Successfully","Response :{id:"+ res.id +"username:"+res.username+"}" ,'success');

    });
  }
  }



  setForm(user: user) {
    this.FirstName.setValue(user.first_name);
    this.LastName.setValue(user.last_name);
    this.UserName.setValue(user.username);
    this.Image.setValue(user.image);
    this.Email.setValue(user.email);
  }



  clearForm() {
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.Email.setValue('');
    this.UserName.setValue('');
    this.Image.setValue('');
  }

  public get FirstName(): FormControl {
    return this.usersForm.get('firstname') as FormControl;
  }
  public get LastName(): FormControl {
    return this.usersForm.get('lastname') as FormControl;
  }
  public get Email(): FormControl {
    return this.usersForm.get('email') as FormControl;
  }
  public get UserName(): FormControl {
    return this.usersForm.get('username') as FormControl;
  }
  public get Image(): FormControl {
    return this.usersForm.get('image') as FormControl;
  }
 
}