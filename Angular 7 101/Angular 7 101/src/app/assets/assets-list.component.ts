import { Component, OnInit } from "@angular/core";
import { AssetService } from "@/services/asset.service";
import { Asset } from "../models/asset";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

 @Component({
    selector: 'pm-assets',
    templateUrl: './assets-list.component.html'
})
 
 export class AssetsListComponent implements OnInit {
     assets: Asset[] = [];
     closeResult: string;
     assetToCreate: Asset = new Asset();

    constructor(private assetService: AssetService, private modalService: NgbModal) {
    }

    open(content) {
        console.log(content);
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }
    
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
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

    getAssets() : void {
      this.assetService.getAssets().subscribe({
        next: assets => this.assets = assets
    });
    }
 }