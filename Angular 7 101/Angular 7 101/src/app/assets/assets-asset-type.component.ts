import { Component, Input } from "@angular/core";

@Component({
    selector: 'pm-asset-type',
    templateUrl: './assets-asset-type.component.html'
})

export class AssetAssetType {
    assetTypes: string[] = [
        'Desktop',
        'Laptop',
        'Display',
        'Phone',
        'External Hard Drive',
        'Other'
    ];
    @Input() required: boolean;
    @Input() class: string;
    
    constructor() {
    }
}