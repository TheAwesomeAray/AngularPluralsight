import { Component, OnInit, Input } from "@angular/core";
import { AssetService } from "@/services/asset.service";
import { Asset } from "../models/asset";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoggingService } from "@/services/logging-service";
import { assetTypes } from './assetTypes';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'pm-assets-list',
  templateUrl: './assets-list.component.html'
})

export class AssetsListComponent implements OnInit {
  submitted: boolean = false;
  assets: Asset[] = [];
  assetTypes: string[] = [];
  filteredAssets: Asset[] = [];
  assetToCreate: Asset = new Asset();
  _filter: string;
  assetForm: FormGroup;

  ngOnInit(): void {
    this.assetForm = new FormGroup({
      'assetType': new FormControl(this.assetToCreate.assetType, Validators.required),
      'description': new FormControl(this.assetToCreate.description, Validators.required),
      'assignedTo': new FormControl(this.assetToCreate.assignedTo, Validators.required),
    });

    console.log(this.assetToCreate);
  }

  get f() { return this.assetForm.controls; }

  get filter(): string {
    return this._filter;
  }

  set filter(value: string) {
    this._filter = value;
    this.filteredAssets = this.filter ? this.performFilter(this.filter) : this.assets;
  }

  constructor(
    private assetService: AssetService,
    private modalService: NgbModal,
    private log: LoggingService) {
    this.getAssets();
    this.assetTypes = assetTypes;
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit() {
    this.submitted = true;

    if (this.assetForm.invalid) {
      return;
    }

    this.assetToCreate = new Asset(this.assetForm.value);

    this.log.log(this.assetToCreate)
    this.assetService.createAsset(this.assetToCreate).subscribe({
      next: () => this.getAssets()
    });

    this.assetForm.reset();
    this.submitted = false;

    this.modalService.dismissAll();
  }

  getAssets(): void {
    this.log.log('Retrieving assets from service');
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