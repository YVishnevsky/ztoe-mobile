import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { DataStorageService } from "~/core/data-storage.service";
import { ItemEventData } from "tns-core-modules/ui/list-view/list-view";
import { SwipeGestureEventData } from "@nativescript/core/ui/gestures/gestures";
import { ListViewEventData } from "nativescript-ui-listview";
import { layout } from "tns-core-modules/utils/utils";
import { View } from "tns-core-modules/ui/core/view";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { RadListViewComponent } from "nativescript-ui-listview/angular/listview-directives";
import { isAndroid, isIOS } from "tns-core-modules/platform";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

    private accountingPoints: ObservableArray<AccountingPoint>;
    private leftThresholdPassed = false;
    private rightThresholdPassed = false;
    private isIOS: boolean = isIOS;

    constructor(private storageService: DataStorageService, private routerExtensions: RouterExtensions) {

    }

    @ViewChild("accountingPointListView", { read: RadListViewComponent, static: false }) myListViewComponent: RadListViewComponent;

    ngOnInit(): void {
        this.accountingPoints = new ObservableArray(this.storageService.getAccountingPoints());
        if (this.accountingPoints.length == 0) {
            this.routerExtensions.navigate(["/registration"], { clearHistory: true });
        }
    }

    itemTap(itemEventData: ItemEventData) {
        console.log(this.accountingPoints.getItem(itemEventData.index).address);
        //this.routerExtensions.navigate(["/accounting-point-datail", this.accountingPoints[itemEventData.index].id]);

    }

    public onSwipeCellStarted(args: ListViewEventData) {
        console.log("start");
        const swipeLimits = args.data.swipeLimits;
        const swipeView = args['object'];
        const leftItem = swipeView.getViewById<View>('mark-view');
        const rightItem = swipeView.getViewById<View>('delete-view');
        swipeLimits.left = leftItem.getMeasuredWidth();
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
    }

    public onLeftSwipeClick(args: ListViewEventData) {
        console.log("Left swipe click");
        this.myListViewComponent.listView.notifySwipeToExecuteFinished();
    }

    public onRightSwipeClick(args) {
        console.log("Right swipe click");
        this.accountingPoints.splice(this.accountingPoints.indexOf(args.object.bindingContext), 1);
    }
}
