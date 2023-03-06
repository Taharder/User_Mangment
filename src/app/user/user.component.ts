import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from 'src/models/user.model';
import {  usersService } from 'src/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-User',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent  implements OnInit {
  @Input() user: user;
  @Output() onRemoveUser = new EventEmitter<number>();
  @Output() onEditUser = new EventEmitter<number>();
//  user:any;
  constructor(private _userSerice: usersService,
    private route: ActivatedRoute,
    private router:Router,
    ) {
    this.user = {
      first_name: '',
      last_name: '',
      image: '',
      username: '',
      email: '',_id:""
        };
  }

  ngOnInit(): void {
    console.log(this.user);
  }

  deleteUserClicked(id:any) {
    console.log(id);
    this.confirmBox(id);

  }

  editUserClicked(id:any){
    this.router.navigate(["/updateuser/"+id]);
  }
  detailUserClicked(id:any){
    this.router.navigate(["/user/"+id]);
  }
  
  confirmBox(id:any){
    this._userSerice.getuserbyId(id).subscribe((res:user)=>{
      this.user=res;
    })
    Swal.fire({
      title: 'Are you sure want to Remove '+   this.user.username+'?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.onRemoveUser.emit(id);
        console.log(id);
        this._userSerice.deleteusers(Number(id)).subscribe((res:any) => {
          if(res.error == null)  {
            Swal.fire(
              'Response',
              res.error,
              'error'
            )
          }else{
            Swal.fire(
              this.user.username ,
              'is Deleted',
              'success'
            )
          }
         

        });
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
