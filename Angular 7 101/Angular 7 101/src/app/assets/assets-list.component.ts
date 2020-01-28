import { Component, OnInit } from "@angular/core";
import { AssetService } from "@/services/asset.service";
import { Asset } from "../models/asset";

 @Component({
    selector: 'pm-assets',
    templateUrl: './assets-list.component.html'
})
 
 export class AssetsListComponent implements OnInit {
     assets: Asset[] = [];
    constructor(private assetService: AssetService) {
    }

    ngOnInit(): void {
        this.assetService.getAssets().subscribe({
            next: assets => this.assets = assets
        });
    }
 }