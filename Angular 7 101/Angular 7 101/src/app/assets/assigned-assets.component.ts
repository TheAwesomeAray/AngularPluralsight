import { Component, OnInit, Input } from "@angular/core";
import { AssetService } from "@/services/asset.service";
import { Asset } from "../models/asset";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'pm-assigned-assets',
    templateUrl: './assigned-assets.component.html'
})

export class AssignedAssetsComponent {
    filteredAssets: Asset[] = [];
    assignedTo: string;

    constructor(assetService: AssetService, route: ActivatedRoute) {
        this.assignedTo = route.snapshot.paramMap.get('name').toLocaleLowerCase();
        assetService.getAssets().subscribe({
            next: assets => {
                console.log(assets.filter((asset: Asset) => asset.assignedTo.toLocaleLowerCase().indexOf(this.assignedTo) !== -1));
                this.filteredAssets = assets;
                this.filteredAssets = assets.filter((asset: Asset) => asset.assignedTo.toLocaleLowerCase().indexOf(this.assignedTo) !== -1)
            }
        });
    }
}