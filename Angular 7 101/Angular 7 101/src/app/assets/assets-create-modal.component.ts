import { Component } from "@angular/core";
import { Asset } from "@/models/asset";

@Component({
    selector: 'pm-assets-modal',
    templateUrl: './assets-create-modal.component.html'
})

export class AssetCreateModal {
  asset: Asset;
} 