import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class usersService {
  baseUrl = 'https://peticiones.online/api/users';

  constructor(private http: HttpClient) {}

  getusers() {
    return this.http.get<any>(this.baseUrl);
  }
  getuserbyId(id:any){
    return this.http.get<any>(this.baseUrl+ '/' + id)
  }

  postusers(user: user) {
    return this.http.post<user>(this.baseUrl, user);
  }
  Updateusers(id: any, user:user) {
    return this.http.put(this.baseUrl + '/' + id,user);
  }

  deleteusers(id: any) {
    console.log(id);
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
