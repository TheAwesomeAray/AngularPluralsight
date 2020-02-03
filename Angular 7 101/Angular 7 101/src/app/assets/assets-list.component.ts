import { Component, OnInit, Input } from "@angular/core";
import { AssetService } from "@/services/asset.service";
import { Asset } from "../models/asset";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'pm-assets-list',
  templateUrl: './assets-list.component.html'
})

export class AssetsListComponent {
  assets: Asset[] = [];
  filteredAssets: Asset[] = [];
  assetToCreate: Asset = new Asset();
  _filter: string;

  get filter(): string {
    return this._filter;
  }
  
  set filter(value: string) {
    this._filter = value;
    this.filteredAssets = this.filter ? this.performFilter(this.filter) : this.assets;
  }

  constructor(private assetService: AssetService, private modalService: NgbModal) {
    this.getAssets();
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit() {
    console.log(this.assetToCreate);
    this.assetService.createAsset(this.assetToCreate).subscribe({
      next: () => this.getAssets()
    });

    this.modalService.dismissAll();
  }

  getAssets(): void {
    this.assetService.getAssets().subscribe({
      next: assets => {
        this.assets = assets;
        this.filteredAssets = this.assets;
      }
    });
  }

  performFilter(filterBy: string): Asset[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.assets.filter((asset: Asset) =>
      asset.assetType.toLocaleLowerCase().indexOf(filterBy) !== -1
      || asset.description.toLocaleLowerCase().indexOf(filterBy) !== -1
      || asset.assignedTo.toLocaleLowerCase().indexOf(filterBy) !== -1
      || asset.assetTagId.toString().toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
}