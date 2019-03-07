import { Component } from '@angular/core';
import { KuiView } from '../kui-view';
import { ActivatedRoute, Router } from '@angular/router';
import { KnoraConstants, SearchParamsService, SearchService } from '@knora/core';
export class SearchResultsComponent extends KuiView {
    constructor(_route, _searchService, _searchParamsService, _router) {
        super(_route, _searchService, _searchParamsService, _router);
        this._route = _route;
        this._searchService = _searchService;
        this._searchParamsService = _searchParamsService;
        this._router = _router;
        this.KnoraConstants = KnoraConstants;
        this.offset = 0;
        this.maxOffset = 0;
        this.result = [];
        this.rerender = false;
        this.isLoading = true;
        this.errorMessage = undefined;
        this.pagingLimit = 25;
    }
}
SearchResultsComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-search-results',
                template: `<div *ngIf="!rerender">
    <div *ngIf="numberOfAllResults !== 0 && result; else noResult">
        <h4>Number of results: {{numberOfAllResults}}</h4>
        <mat-tab-group>
            <mat-tab label="List">
                <kui-list-view [result]="result" [ontologyInfo]="ontologyInfo" [isLoading]="isLoading"></kui-list-view>
            </mat-tab>
            <mat-tab label="Grid">
                <kui-grid-view [result]="result" [ontologyInfo]="ontologyInfo" [isLoading]="isLoading"></kui-grid-view>
            </mat-tab>
            <mat-tab label="Table">
                <kui-table-view [result]="result" [ontologyInfo]="ontologyInfo" [isLoading]="isLoading"></kui-table-view>
            </mat-tab>
            <mat-tab label="Gravsearch">
                <kui-graph-view></kui-graph-view>
            </mat-tab>
        </mat-tab-group>

        <div class="load-panel" *ngIf="result.length > 0">
            <button mat-flat-button color="primary" class="link center" (click)="loadMore(offset)" *ngIf="offset < maxOffset">Load more
                <mat-icon>keyboard_arrow_down</mat-icon>
            </button>
        </div>

    </div>

    <!-- In case of 0 result -->
    <ng-template #noResult>
        <p>
            <strong>No result</strong>
        </p>
    </ng-template>

</div>

<!-- Error message -->
<div *ngIf="errorMessage">
    <p>There is an error: {{errorMessage}}</p>
</div>`,
                styles: [`.load-panel{width:100%}.load-panel .center{display:block;line-height:24px;margin:12px auto}`]
            },] },
];
/** @nocollapse */
SearchResultsComponent.ctorParameters = () => [
    { type: ActivatedRoute },
    { type: SearchService },
    { type: SearchParamsService },
    { type: Router }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi92aWV3L3NlYXJjaC1yZXN1bHRzL3NlYXJjaC1yZXN1bHRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxFQUFFLGNBQWMsRUFBVSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVqRSxPQUFPLEVBSUwsY0FBYyxFQUtkLG1CQUFtQixFQUNuQixhQUFhLEVBQ2QsTUFBTSxhQUFhLENBQUM7QUE2Q3JCLE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxPQUFPO0lBaUJqRCxZQUNZLE1BQXNCLEVBQ3RCLGNBQTZCLEVBQzdCLG9CQUF5QyxFQUN6QyxPQUFlO1FBRXpCLEtBQUssQ0FBQyxNQUFNLEVBQUUsY0FBYyxFQUFFLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBTG5ELFdBQU0sR0FBTixNQUFNLENBQWdCO1FBQ3RCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBcUI7UUFDekMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQW5CM0IsbUJBQWMsR0FBRyxjQUFjLENBQUM7UUFDaEMsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBRXRCLFdBQU0sR0FBbUIsRUFBRSxDQUFDO1FBRzVCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFHMUIsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixpQkFBWSxHQUFRLFNBQVMsQ0FBQztRQUU5QixnQkFBVyxHQUFXLEVBQUUsQ0FBQztJQVN6QixDQUFDOzs7WUFuRUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQ0w7Z0JBQ0wsTUFBTSxFQUFFLENBQUMsNkZBQTZGLENBQUM7YUFDeEc7Ozs7WUF6RFEsY0FBYztZQVlyQixhQUFhO1lBRGIsbUJBQW1CO1lBWFksTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBLdWlWaWV3IH0gZnJvbSAnLi4va3VpLXZpZXcnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtcywgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgQXBpU2VydmljZUVycm9yLFxuICBFeHRlbmRlZFNlYXJjaFBhcmFtcyxcbiAgR3JhdnNlYXJjaEdlbmVyYXRpb25TZXJ2aWNlLFxuICBLbm9yYUNvbnN0YW50cyxcbiAgT250b2xvZ3lDYWNoZVNlcnZpY2UsXG4gIE9udG9sb2d5SW5mb3JtYXRpb24sXG4gIFJlYWRSZXNvdXJjZSxcbiAgUmVhZFJlc291cmNlc1NlcXVlbmNlLFxuICBTZWFyY2hQYXJhbXNTZXJ2aWNlLFxuICBTZWFyY2hTZXJ2aWNlXG59IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3VpLXNlYXJjaC1yZXN1bHRzJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiIXJlcmVuZGVyXCI+XG4gICAgPGRpdiAqbmdJZj1cIm51bWJlck9mQWxsUmVzdWx0cyAhPT0gMCAmJiByZXN1bHQ7IGVsc2Ugbm9SZXN1bHRcIj5cbiAgICAgICAgPGg0Pk51bWJlciBvZiByZXN1bHRzOiB7e251bWJlck9mQWxsUmVzdWx0c319PC9oND5cbiAgICAgICAgPG1hdC10YWItZ3JvdXA+XG4gICAgICAgICAgICA8bWF0LXRhYiBsYWJlbD1cIkxpc3RcIj5cbiAgICAgICAgICAgICAgICA8a3VpLWxpc3QtdmlldyBbcmVzdWx0XT1cInJlc3VsdFwiIFtvbnRvbG9neUluZm9dPVwib250b2xvZ3lJbmZvXCIgW2lzTG9hZGluZ109XCJpc0xvYWRpbmdcIj48L2t1aS1saXN0LXZpZXc+XG4gICAgICAgICAgICA8L21hdC10YWI+XG4gICAgICAgICAgICA8bWF0LXRhYiBsYWJlbD1cIkdyaWRcIj5cbiAgICAgICAgICAgICAgICA8a3VpLWdyaWQtdmlldyBbcmVzdWx0XT1cInJlc3VsdFwiIFtvbnRvbG9neUluZm9dPVwib250b2xvZ3lJbmZvXCIgW2lzTG9hZGluZ109XCJpc0xvYWRpbmdcIj48L2t1aS1ncmlkLXZpZXc+XG4gICAgICAgICAgICA8L21hdC10YWI+XG4gICAgICAgICAgICA8bWF0LXRhYiBsYWJlbD1cIlRhYmxlXCI+XG4gICAgICAgICAgICAgICAgPGt1aS10YWJsZS12aWV3IFtyZXN1bHRdPVwicmVzdWx0XCIgW29udG9sb2d5SW5mb109XCJvbnRvbG9neUluZm9cIiBbaXNMb2FkaW5nXT1cImlzTG9hZGluZ1wiPjwva3VpLXRhYmxlLXZpZXc+XG4gICAgICAgICAgICA8L21hdC10YWI+XG4gICAgICAgICAgICA8bWF0LXRhYiBsYWJlbD1cIkdyYXZzZWFyY2hcIj5cbiAgICAgICAgICAgICAgICA8a3VpLWdyYXBoLXZpZXc+PC9rdWktZ3JhcGgtdmlldz5cbiAgICAgICAgICAgIDwvbWF0LXRhYj5cbiAgICAgICAgPC9tYXQtdGFiLWdyb3VwPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJsb2FkLXBhbmVsXCIgKm5nSWY9XCJyZXN1bHQubGVuZ3RoID4gMFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtZmxhdC1idXR0b24gY29sb3I9XCJwcmltYXJ5XCIgY2xhc3M9XCJsaW5rIGNlbnRlclwiIChjbGljayk9XCJsb2FkTW9yZShvZmZzZXQpXCIgKm5nSWY9XCJvZmZzZXQgPCBtYXhPZmZzZXRcIj5Mb2FkIG1vcmVcbiAgICAgICAgICAgICAgICA8bWF0LWljb24+a2V5Ym9hcmRfYXJyb3dfZG93bjwvbWF0LWljb24+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gSW4gY2FzZSBvZiAwIHJlc3VsdCAtLT5cbiAgICA8bmctdGVtcGxhdGUgI25vUmVzdWx0PlxuICAgICAgICA8cD5cbiAgICAgICAgICAgIDxzdHJvbmc+Tm8gcmVzdWx0PC9zdHJvbmc+XG4gICAgICAgIDwvcD5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG48L2Rpdj5cblxuPCEtLSBFcnJvciBtZXNzYWdlIC0tPlxuPGRpdiAqbmdJZj1cImVycm9yTWVzc2FnZVwiPlxuICAgIDxwPlRoZXJlIGlzIGFuIGVycm9yOiB7e2Vycm9yTWVzc2FnZX19PC9wPlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYC5sb2FkLXBhbmVse3dpZHRoOjEwMCV9LmxvYWQtcGFuZWwgLmNlbnRlcntkaXNwbGF5OmJsb2NrO2xpbmUtaGVpZ2h0OjI0cHg7bWFyZ2luOjEycHggYXV0b31gXVxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hSZXN1bHRzQ29tcG9uZW50IGV4dGVuZHMgS3VpVmlldyB7XG5cbiAgS25vcmFDb25zdGFudHMgPSBLbm9yYUNvbnN0YW50cztcbiAgb2Zmc2V0OiBudW1iZXIgPSAwO1xuICBtYXhPZmZzZXQ6IG51bWJlciA9IDA7XG4gIGdyYXZzZWFyY2hHZW5lcmF0b3I6IEV4dGVuZGVkU2VhcmNoUGFyYW1zO1xuICByZXN1bHQ6IFJlYWRSZXNvdXJjZVtdID0gW107XG4gIG9udG9sb2d5SW5mbzogT250b2xvZ3lJbmZvcm1hdGlvbjtcbiAgbnVtYmVyT2ZBbGxSZXN1bHRzOiBudW1iZXI7XG4gIHJlcmVuZGVyOiBib29sZWFuID0gZmFsc2U7XG4gIHNlYXJjaFF1ZXJ5OiBzdHJpbmc7XG4gIHNlYXJjaE1vZGU6IHN0cmluZztcbiAgaXNMb2FkaW5nID0gdHJ1ZTtcbiAgZXJyb3JNZXNzYWdlOiBhbnkgPSB1bmRlZmluZWQ7XG4gIG5hdmlnYXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcGFnaW5nTGltaXQ6IG51bWJlciA9IDI1O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBfcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByb3RlY3RlZCBfc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgX3NlYXJjaFBhcmFtc1NlcnZpY2U6IFNlYXJjaFBhcmFtc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIF9yb3V0ZXI6IFJvdXRlclxuICApIHtcbiAgICBzdXBlcihfcm91dGUsIF9zZWFyY2hTZXJ2aWNlLCBfc2VhcmNoUGFyYW1zU2VydmljZSwgX3JvdXRlcik7XG4gIH1cbn1cbiJdfQ==