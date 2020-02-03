import { Component, OnInit, Input } from "@angular/core";
import { AssetService } from "@/services/asset.service";
import { Asset } from "../models/asset";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

 @Component({
    selector: 'pm-assets-table',
    templateUrl: './assets-table.component.html'
})
 
 export class AssetsTableComponent {
     @Input() assets: Asset[];
 }