import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from 'src/models/user.model';
import { usersService } from 'src/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit { 
  @ViewChild('addUserButton') addUserButton: any; 
  
  std: user = {
    id: 0,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    image: '',
    _id: ''
  };
  Pid:string | undefined;
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private fb: FormBuilder,
    private userSer: usersService  ) {
      this.UsersForm = fb.group({});

    }
    
    submitted:any;
    UsersForm: FormGroup;
    ngOnInit(): void {
      this.route.paramMap.subscribe((param) => {
        this.Pid = (param.get('id'))?.toString();
        this.getById(this.Pid);
        this.UsersForm = this.fb.group({
          firstname:['',Validators.required],
        lastname: ['',Validators.required],
        username:['',Validators.required],
        image:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
      });
    });
  }
 
  getById(id: any) {
    this.userSer.getuserbyId(id).subscribe((data) => {
      this.std = data;
      this.setForm(this.std);
    });
  }
 
  update() {
    if (this.UsersForm.invalid) {
      this.submitted=false;
      return;
      
    }else{
      this.submitted=true;
    let User: user = {
      first_name: this.FirstName.value,
      last_name: this.LastName.value,
      username: this.UserName.value,
      image: this.Image.value,
      email: this.Email.value,
      _id: ''
    };
    this.userSer.Updateusers(this.Pid,User)
    .subscribe({
      next:(data) => {
        this.router.navigate(["/home"]);
      },
      error:(err) => {
        Swal.fire(err,"error");
      }
    })
  }
  }
  setForm(std: user) {
    this.FirstName.setValue(std.first_name);
    this.LastName.setValue(std.last_name);
    this.UserName.setValue(std.username);
    this.Image.setValue(std.image);
    this.Email.setValue(std.email);
  }
  public get FirstName(): FormControl {
    return this.UsersForm.get('firstname') as FormControl;
  }
  public get LastName(): FormControl {
    return this.UsersForm.get('lastname') as FormControl;
  }
  public get Email(): FormControl {
    return this.UsersForm.get('email') as FormControl;
  }
  public get UserName(): FormControl {
    return this.UsersForm.get('username') as FormControl;
  }
  public get Image(): FormControl {
    return this.UsersForm.get('image') as FormControl;
  }
 
}
