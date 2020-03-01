import { Component, OnInit } from "@angular/core";
import { DataStorageService } from "../core/data-storage.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { GetZoneNames } from "../shared/utils";

@Component({
	selector: "MeterReading",
	moduleId: module.id,
	templateUrl: "./new-meter-reading.component.html",
	styleUrls: ['./new-meter-reading.component.css']
})
export class NewMeterReadingComponent implements OnInit {

	newMeterReadings: Array<number> = [, , ,];
	date: Date;
	accountingPoint: AccountingPoint;
	zoneNames: Array<string>

	constructor(private storageService: DataStorageService, private route: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params: ParamMap) => {
			this.date = new Date(params.get('date'));
			this.accountingPoint = this.storageService.getAccountingPoint(params.get('id'));
			this.zoneNames = GetZoneNames(this.accountingPoint.zoneCount)
			console.log(this.date);
		});
	}
}