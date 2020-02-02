import { Component } from "@angular/core";
import { Asset } from "@/models/asset";
import { AssetService } from "@/services/asset.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'pm-assets-detail',
    templateUrl: './assets-detail.component.html'
})

export class AssetDetailComponent {
    asset: Asset;
    isEditMode: boolean = false;
    labelStyle: string = 'col-md-2 font-weight-bold text-right';
    constructor(private assetService: AssetService, route: ActivatedRoute) {
        let id = Number(route.snapshot.paramMap.get('id'));
        assetService.getAssets().subscribe({
            next: assets => this.asset = assets.find(x => x.assetTagId === id)
        })
    }

    editMode(isEditMode: boolean) {
        this.isEditMode = isEditMode;
    }

    saveAsset() {
        this.assetService.createAsset(this.asset);
        this.isEditMode = false;
    }

    retireAsset() {
        this.asset.retired = true;
        this.asset.dateRetired = new Date();
        this.assetService.createAsset(this.asset);
    }
}