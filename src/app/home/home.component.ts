import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { DataStorageService } from "../core/data-storage.service";
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
    private mainView: View;
    private rightItem: View;

    constructor(private storageService: DataStorageService, private routerExtensions: RouterExtensions) {

    }

    @ViewChild("accountingPointListView", { read: RadListViewComponent, static: false }) myListViewComponent: RadListViewComponent;

    ngOnInit(): void {
        this.accountingPoints = new ObservableArray(this.storageService.getAccountingPoints());
        if (this.accountingPoints.length == 0) {
            this.routerExtensions.navigate(["/registration"], { clearHistory: true });
        }
    }

    goToRegistrationPage(){
        this.routerExtensions.navigate(["/registration"], { clearHistory: this.accountingPoints.length == 0 });
    }

    itemTap(itemEventData: ItemEventData) {
        this.routerExtensions.navigate(["/accounting-point-datail", this.accountingPoints.getItem(itemEventData.index).id]);
    }

    public onSwipeCellStarted(args: ListViewEventData) {
        const swipeLimits = args.data.swipeLimits;
        const swipeView = args['object'];
        const mainView: View = args['mainView'];
        const rightItem = swipeView.getViewById<View>('delete-view');
        swipeLimits.left = swipeLimits.top = swipeLimits.bottom = 0;
        swipeLimits.right = mainView.getMeasuredWidth() * 0.25;
        swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;
    }

    public onDeleteTap(args: { object: { bindingContext: AccountingPoint; }; }) {
        this.storageService.removeAccountingPoint(args.object.bindingContext.id);
        this.accountingPoints.splice(this.accountingPoints.indexOf(args.object.bindingContext), 1);
    }

    public onCellSwiping(args: ListViewEventData) {
        const swipeView = args['swipeView'];
        this.mainView = args['mainView'];
        this.rightItem = swipeView.getViewById('delete-view');

        if (args.data.x < 0) {
            const rightDimensions = View.measureChild(
                <View>this.rightItem.parent,
                this.rightItem,
                layout.makeMeasureSpec(Math.abs(args.data.x), layout.EXACTLY),
                layout.makeMeasureSpec(this.mainView.getMeasuredHeight(), layout.EXACTLY));

            View.layoutChild(<View>this.rightItem.parent, this.rightItem, this.mainView.getMeasuredWidth() - rightDimensions.measuredWidth, 0, this.mainView.getMeasuredWidth(), rightDimensions.measuredHeight);
        }
    }
}
