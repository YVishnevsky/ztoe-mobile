import { Component, OnInit, Input } from "@angular/core";

@Component({
	selector: "accounting-point-detail",
	moduleId: module.id,
	templateUrl: "./accounting-point-detail.component.html",
	styleUrls: ['./accounting-point-detail.component.css']
})
export class AccountingPointDetailComponent implements OnInit {

	@Input()
	accountingPoint: AccountingPoint;

	constructor() {
		console.log("AccountingPointDetail constructor");
	}

	ngOnInit(): void {
		console.log("AccountingPointDetail init");
	}
}