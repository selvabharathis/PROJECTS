import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiTemplateService {

  constructor(private http: HttpClient) { }

  public getData<T>(requestUrl: string): Observable<T>{
    console.log(`get call`,requestUrl);
    return this.http.get<T>(requestUrl);
  }

  public postData<T>(requestUrl:string, data: any){
    console.log(`post call`,requestUrl);
    return this.http.post<T>(requestUrl,data);
  }

  public putData(requestUrl:string, data?: any){
    console.log(`put call`,requestUrl);
    return this.http.put(requestUrl,data);
  }

  public deleteData(requestUrl: string){
    console.log(`delete call`,requestUrl);
    return this.http.delete(requestUrl);
  }
}
