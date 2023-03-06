import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from 'src/models/user.model';
import { usersService } from 'src/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit { 
  
  user: user = {
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
    private _userSerice : usersService  ) {

    }
    
    ngOnInit(): void {
      this.route.paramMap.subscribe((param) => {
        this.Pid = (param.get('id'))?.toString();
        this.getById(this.Pid);

    });
  }
 
  getById(id: any) {
    this._userSerice.getuserbyId(id).subscribe((data) => {
      this.user = data;
    });
  }
 
  deleteStudentClicked(id:any) {
    console.log(id);
    this.confirmBox(id);

  }

  editStudentClicked(id:any){
    this.router.navigate(["/updateuser/"+id]);
  }
  detailStudentClicked(id:any){
    this.router.navigate(["/user/"+id]);
  }
  
  confirmBox(id:any){
    // this.studentsService.getStudentbyId(id).subscribe((res:Student)=>{
    //   this.user=res;
    // })
    Swal.fire({
      title: 'Are you sure want to Remove '+   this.user.username+'?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

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
