import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiTemplateService {

//   public httpOptions = {
//     headers: new HttpHeaders({
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     })
// };

  constructor(private http: HttpClient) { }

  public getData<T>(requestUrl: string): Observable<T>{
    console.log(`get call`,requestUrl);
    return this.http.get<T>(requestUrl,{
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    });
  }

  public postData<T>(requestUrl:string, data: any){
    console.log(`post call`,requestUrl);
    return this.http.post<T>(requestUrl,data,{ responseType: 'text' as 'json' });
  }

  public putData<T>(requestUrl:string, data?: any){
    console.log(`put call`,requestUrl);
    return this.http.put<T>(requestUrl,data,{ responseType: 'text' as 'json' });
  }

  public deleteData(requestUrl: string){
    console.log(`delete call`,requestUrl);
    return this.http.delete(requestUrl);
  }
}
