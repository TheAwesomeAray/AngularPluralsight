import { Component } from "@angular/core";
import { Asset } from "@/models/asset";
import { AssetService } from "@/services/asset.service";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'pm-assets-detail',
    templateUrl: './assets-detail.component.html'
})

export class AssetDetailComponent {
    asset: Asset;

    constructor(assetService: AssetService, route: ActivatedRoute) {
        let id = Number(route.snapshot.paramMap.get('id'));
        assetService.getAssets().subscribe({
            next: assets => this.asset = assets.find(x => x.assetTagId === id)
        })
    } 
}