import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// used to create fake backend
import { mockBackendProvider } from './helpers/mock-backend';
import { AppComponent } from './app.component';
import { AssetService } from './services/asset.service';
import { LoggingService } from './services/logging-service';

import { AssetsListComponent } from './assets/assets-list.component';
import { AssetDetailComponent } from './assets/assets-detail.component';
import { AssetsTableComponent } from './assets/assets-table.component';
import { AssignedAssetsComponent } from './assets/assigned-assets.component';


@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, 
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot([
      { path: 'assets', component: AssetsListComponent },
      { path: 'assets/:id', component: AssetDetailComponent },
      { path: 'employee/:name', component: AssignedAssetsComponent }
    ]) 
  ],
  declarations: [ 
    AppComponent, 
    AssetsListComponent, 
    AssetsTableComponent,
    AssetDetailComponent,
    AssignedAssetsComponent
  ],
  entryComponents: [ AssetsListComponent ],
  bootstrap: [ AppComponent ],
  providers: [ 
    AssetService, 
    LoggingService,
    mockBackendProvider 
  ]
})
export class AppModule { }
