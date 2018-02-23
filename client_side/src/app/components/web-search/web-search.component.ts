import { Component, OnInit ,ElementRef,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {getAPIService} from '../../giphy-web.service';
import {GiphySqlService} from '../../giphy-sql.service';
@Component({
  selector: 'app-web-search',
  templateUrl: './web-search.component.html',
  styleUrls: ['./web-search.component.css']
})
export class WebSearchComponent implements OnInit {
  isLogin:boolean=false;
  isSql:boolean = false;
  isSql_s:string;
  data=[];
  sql_data=[];
  username:string;
  login(form:NgForm){
    this.username=form.controls['loginName'].value;
    if(!this.username){
      alert("enter your name plz!");
      return;
    }
    window.localStorage.setItem("user",this.username);
    this.isLogin=true;
  }
  logout(){
    window.localStorage.clear();
    this.username=null;
    this.isLogin=false;
  }
  change(eve:any):void{
    this.isSql =!this.isSql;
    console.log(this.isSql);
    

  }
  getKey(form:NgForm):void{
    console.log('getapiC_click');
    console.log(form.value.keyword);
    console.log(form.controls['isSql'].value);
    // this.isSql = form.controls['isSql'].value;
    // this.username = form.controls['username'].value;
    if(this.username){
      if(this.isSql){//is sql
      
      
        this.isSql_s="true";
        this.data=[this.isSql_s,form.value.keyword,this.username];
        // this.sql_data=[ form.value.keyword,this.username];
        this.apiService.searchEvent.next(this.data);
        // this.apiService.getImage_sql(this.sql_data);
      }else{
        this.isSql_s="false";
        this.data=[this.isSql_s,form.value.keyword,this.username];
        this.apiService.searchEvent.next(this.data);
        // this.apiService.getImage(form.value.keyword);
      }
    }else{
      alert("login first!!!");
      
    }
   
    
  }
 
  constructor(private apiService:getAPIService,private sqlService:GiphySqlService) { }

  ngOnInit() {
    this.username = window.localStorage.getItem("user");
    if(this.username){
      this.isLogin=true;
    }
    

  }

}


