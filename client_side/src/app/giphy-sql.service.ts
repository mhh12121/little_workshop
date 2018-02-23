import {Injectable,EventEmitter} from '@angular/core';
import {HttpClient,HttpParams,HttpRequest} from '@angular/common/http';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class GiphySqlService {
  //ng build --prod --aot --deploy-url /applicationanme
  searchEvent = new EventEmitter<string[]>();
  constructor(private http: HttpClient){}
  //ng serve --proxy-config proxy.config.js
  saveGiphy(l,username):Promise<any>{
    var t = {
      "id":l.id,
      "title":l.title,
      "type":l.type,
      "url":l.images.downsized.url,
      "rating":l.rating,
      "user":username
    }
    return (this.http.post('/giphy_server/giphylist',t)
        .take(1)
      .toPromise())
  }

  // getAllGiphy():Promise<any>{
  //   return (this.http.get('/giphy_server/giphylist')
  //   .take(1)
  //   .toPromise());
  // }
 
}


