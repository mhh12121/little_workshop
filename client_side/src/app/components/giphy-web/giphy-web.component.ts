import { Component, OnInit,Input,OnDestroy } from '@angular/core';
import{HttpClient,HttpParams} from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import {getAPIService} from '../../giphy-web.service';
import {GiphySqlService} from '../../giphy-sql.service'
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-giphy-web',
  templateUrl: './giphy-web.component.html',
  styleUrls: ['./giphy-web.component.css']
})
export class GiphyWebComponent implements OnInit {

  @Input()
  initialSeach="trump";//for test
  
  apiList=[];
  apiList_data=[];
  img={};//I DONT'T KNOW THIS
  sqlResult=[];
  sqlData=[];
  username:string;

  totalcount;
  private sub:Subscription;
  constructor(private http:HttpClient,private apiService:getAPIService,private giphySearch:GiphySqlService) { }
  saveImage(l):void{
    if(!this.username){
      alert("please login first");
      return;
    }
    this.giphySearch.saveGiphy(l,this.username)
    .then(result=>{
      if(result==null){
        alert("nothing!!");
      }else{
        alert("done!");
      }
      console.log('sql connect====>',result);
    })
    .catch(error =>{
      alert("maybe already in database!");
        console.log('error',error);
    })
   
  }

  ngOnInit() {
    
    this.sub = this.apiService.searchEvent.subscribe(
      (data)=>{
        this.username = data[2];//retrieve username from data
        if(data[0]=="false"){//check if its searching from web or db
          console.log('>>data apiservice:',data);
          this.apiService.getImage(data[1])
          .then((img)=>{
            this.sqlResult=null;
            this.img=img;
            this.apiList = Object.values( this.img);
            this.apiList_data = this.apiList[0];
            console.log('apiList_data ====>',this.apiList_data);
            this.totalcount = this.apiList[1].total_count;
            console.log("pagination====>",this.totalcount);
            
          })
        }else if(data[0]=="true"){
          this.sqlData=[data[1],this.username];//include keyword and username
          this.apiService.getImage_sql(this.sqlData)
          .then((sqlResult)=>{
            console.log("sqlresult---------->",sqlResult);
            // this.sqlresult = sqlresult;
            this.apiList_data=null;
            this.sqlResult = Object.values(sqlResult);
            console.log(this.sqlResult);   
          })
        } 
      },
      (error)=>{
        console.log('>>apiservice error',error);
      }
    );
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
