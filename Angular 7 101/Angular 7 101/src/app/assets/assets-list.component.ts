import { Component, OnInit } from "@angular/core";
import { AssetService } from "@/services/asset.service";
import { Asset } from "../models/asset";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { filter } from "rxjs/operators";

 @Component({
    selector: 'pm-assets',
    templateUrl: './assets-list.component.html'
})
 
 export class AssetsListComponent implements OnInit {
     assets: Asset[] = [];
     filteredAssets: Asset[] = [];
     closeResult: string;
     assetToCreate: Asset = new Asset();

     _filter: string;
     get filter(): string {
       return this._filter;
     }
     set filter(value:string) {
       this._filter = value;
       this.filteredAssets = this.filter ? this.performFilter(this.filter) : this.assets;
     }

    constructor(private assetService: AssetService, private modalService: NgbModal) {
    }

    open(content: any) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    }
  

    onSubmit() {
      console.log(this.assetToCreate);
      this.assetService.createAsset(this.assetToCreate).subscribe({
        next: () => this.getAssets()
      });
      this.modalService.dismissAll();
    }

    ngOnInit(): void {
      this.getAssets();
    }

    performFilter(filterBy: string): Asset[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.assets.filter((asset: Asset) =>
        asset.assetType.toLocaleLowerCase().indexOf(filterBy) !== -1 
        || asset.description.toLocaleLowerCase().indexOf(filterBy) !== -1
        || asset.assignedTo.toLocaleLowerCase().indexOf(filterBy) !== -1
        || asset.assetTagId.toString().toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    getAssets() : void {
      this.assetService.getAssets().subscribe({
        next: assets => { 
          this.assets = assets;
          this.filteredAssets = this.assets;
        }
    });
    
    }
 }