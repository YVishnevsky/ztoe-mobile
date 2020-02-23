import { Component, OnInit, Input } from "@angular/core";

@Component({
	selector: "accounting-point",
	moduleId: module.id,
	templateUrl: "./accounting-point.component.html",
	styleUrls: ['./accounting-point.component.css']
})
export class AccountingPointComponent implements OnInit {

	@Input()
	accountingPoint: AccountingPoint;

	constructor() {
		
	}

	ngOnInit(): void {
		
	}
}