import {Injectable,EventEmitter} from '@angular/core';
import {HttpClient,HttpParams,HttpRequest} from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/take';
@Injectable()
export class getAPIService{
    searchEvent = new EventEmitter<string[]>();
    constructor(private http:HttpClient){}

    getImage(img:string):Promise<any>{//options
        let keyw = img;
        let qs = new HttpParams()
        .set('api_key','kAsF0WmU1mKOGGxc4WVuonPVpNYA0A84')
        .set('q',keyw)
        .set('limit','5')
        .set('offset','0')
        .set('lang','en');

        return (
            this.http.get('https://api.giphy.com/v1/gifs/search',{params:qs})
            .take(1)
            .toPromise()
            .then((result)=> {
                
                return (result);
            })
        )
    }
    getImage_sql(keyword:string[]):Promise<any>{
        let key = keyword;
        let t ={
            title:key[0],
            user:key[1]
        }
        // let ps = new HttpParams()
        // .set("keyword",key);
        return (this.http.post('/giphy_server/giphylist/search',t)
        .take(1)
        .toPromise()
        .then(result =>{
          return result;
        })
      
        )
    }
}