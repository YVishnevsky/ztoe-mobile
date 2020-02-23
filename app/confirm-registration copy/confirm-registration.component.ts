import { Component, OnInit } from '@angular/core';
import { NewRegistrationService } from '~/core/new-registration.service';
import { DataStorageService } from '~/core/data-storage.service';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.css']
})
export class ConfirmRegistrationComponent implements OnInit {

  newAccountingPoint: AccountingPoint;

  constructor(private regService: NewRegistrationService, private storageService: DataStorageService) { }

  ngOnInit(): void {
    this.newAccountingPoint = this.regService.getData();
  }

  save() {
    this.storageService.saveAccountingPoint(this.newAccountingPoint);
  }
}
