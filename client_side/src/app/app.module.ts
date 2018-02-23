import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule,Routes} from '@angular/router';
import { AppComponent } from './app.component';

import { GiphyWebComponent } from './components/giphy-web/giphy-web.component';
import { WebSearchComponent } from './components/web-search/web-search.component';

import {GiphySqlService} from './giphy-sql.service';
import {getAPIService} from './giphy-web.service'

const ROUTE:Routes=[//actually not use this...just for testing
  
  // { path:"",component: GiphyWebComponent },
  { path:"",component:WebSearchComponent},
  { path:"**",redirectTo:"/",pathMatch:'full'},

]
@NgModule({
  declarations: [
    AppComponent,
    GiphyWebComponent,
    WebSearchComponent,

  ],
  imports: [
    BrowserModule,
  
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTE)
  ],
  providers: [getAPIService,GiphySqlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
