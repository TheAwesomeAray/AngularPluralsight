import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// used to create fake backend
import { mockBackendProvider } from './helpers/mock-backend';
import { AppComponent } from './app.component';
import { AssetService } from './services/asset.service';

import { AssetsListComponent } from './assets/assets-list.component';
import { AssetDetailComponent } from './assets/assets-detail.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule, 
    HttpClientModule,
    NgbModule,
    NgbModal, 
    RouterModule.forRoot([
      { path: 'assets', component: AssetsListComponent },
      { path: 'assets/:id', component: AssetDetailComponent }
    ]) 
  ],
  declarations: [ 
    AppComponent, 
    AssetsListComponent, 
    AssetDetailComponent 
  ],
  bootstrap: [ AppComponent ],
  providers: [ 
    AssetService, 
    mockBackendProvider 
  ]
})
export class AppModule { }
