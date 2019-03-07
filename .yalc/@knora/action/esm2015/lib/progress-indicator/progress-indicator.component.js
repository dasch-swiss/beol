import { Component, Input } from '@angular/core';
/**
 * The progress indicator can be used to show the status of loading something.
 * This can be the simple loader or in case of submitting data it can show the status (not ready, loading, done or error).
 *
 */
export class ProgressIndicatorComponent {
    /**
     * @ignore
     */
    constructor() {
        /**
         * @param {string} [color=primary]
         *
         * Parameter to customize the appearance of the loader.
         * Hexadecimal color value e.g. #00ff00 or similar color values 'red', 'green' etc.
         */
        this.color = 'primary';
    }
    ngOnInit() {
    }
}
ProgressIndicatorComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-progress-indicator',
                template: `<!-- this is the progress indicator for forms -->
<div class="kui-progress-indicator submit" *ngIf="status !== undefined; else isLoading">
    <!-- spinner while on load / on submit -->
    <div class="on-submit" *ngIf="status === 0">
        <div class="spinner" [style.border-top-color]="color" [style.border-left-color]="color"></div>
    </div>

    <div>
        <!-- bullet point before submit -->
        <mat-icon *ngIf="status === -1" class="before-submit">keyboard_arrow_right</mat-icon>
        <!-- icon 'check' when done -->
        <mat-icon *ngIf="status === 1" class="after-submit" [style.color]="color">done</mat-icon>
        <!-- in case of an error -->
        <mat-icon *ngIf="status === 400" class="submit-error">not_interested</mat-icon>
    </div>

</div>

<!-- default case: is loading -->
<ng-template #isLoading>
    <div class="kui-progress-indicator default">
        <div class="line">
            <div class="bounce1" [style.background-color]="color"></div>
            <div class="bounce2" [style.background-color]="color"></div>
            <div class="bounce3" [style.background-color]="color"></div>
        </div>
        <div class="line">
            <div class="bounce3" [style.background-color]="color"></div>
            <div class="bounce1" [style.background-color]="color"></div>
            <div class="bounce2" [style.background-color]="color"></div>
        </div>
    </div>
</ng-template>


<!-- another variety of isLoading (in one line) -->
<!--
<div class="loading-progress-indicator">
    <span class="text">{{text}}</span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
</div>
-->
`,
                styles: [`.kui-progress-indicator.default{height:56px;margin-left:auto;margin-right:auto;padding:24px 36px;top:60px;width:96px}.kui-progress-indicator.default.page-center{left:50%;position:absolute;top:39%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.kui-progress-indicator.default h1,.kui-progress-indicator.default h2,.kui-progress-indicator.default h3,.kui-progress-indicator.default p{color:#555;text-align:center}.kui-progress-indicator.default .line{margin:0 auto;text-align:center;width:70px}.kui-progress-indicator.default .line>div{-webkit-animation:1.4s ease-in-out infinite both bounce-keyframes;animation:1.4s ease-in-out infinite both bounce-keyframes;background-color:#00695c;border-radius:6px;display:inline-block;height:18px;width:18px}.kui-progress-indicator.default .line .bounce1{-webkit-animation-delay:-.32s;animation-delay:-.32s}.kui-progress-indicator.default .line .bounce2{-webkit-animation-delay:-.16s;animation-delay:-.16s}@-webkit-keyframes bounce-keyframes{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes bounce-keyframes{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}.kui-progress-indicator.submit{height:32px;width:32px}.kui-progress-indicator.submit .on-submit{-webkit-animation:.7s linear infinite spinner-keyframes;animation:.7s linear infinite spinner-keyframes;height:32px;width:32px}.kui-progress-indicator.submit .on-submit .spinner{border:2px solid #00695c;border-bottom-color:transparent;border-radius:50%;border-right-color:transparent;height:28px;width:28px}.kui-progress-indicator.submit .before-submit{color:rgba(128,128,128,.8)}.kui-progress-indicator.submit .after-submit{color:#00695c}.kui-progress-indicator.submit .submit-error{color:#f44336}@-webkit-keyframes spinner-keyframes{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes spinner-keyframes{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.loading-progress-indicator{text-align:center;width:100%}.loading-progress-indicator .text{color:#00695c;font-size:12pt}.loading-progress-indicator .dot{-webkit-animation:1.4s ease-in-out infinite dot-keyframes;animation:1.4s ease-in-out infinite dot-keyframes;background-color:#00695c;border-radius:2px;display:inline-block;height:6px;margin:3px 6px 2px;width:6px}.loading-progress-indicator .dot:nth-child(2){-webkit-animation-delay:.16s;animation-delay:.16s}.loading-progress-indicator .dot:nth-child(3){-webkit-animation-delay:.32s;animation-delay:.32s}.loading-progress-indicator .dot:nth-child(4){-webkit-animation-delay:.48s;animation-delay:.48s}.loading-progress-indicator .dot:nth-child(5){-webkit-animation-delay:.64s;animation-delay:.64s}.loading-progress-indicator .dot:nth-child(6){-webkit-animation-delay:.8s;animation-delay:.8s}@-webkit-keyframes dot-keyframes{0%,100%{opacity:.4;-webkit-transform:scale(1,1);transform:scale(1,1)}50%{opacity:1;-webkit-transform:scale(1.2,1.2);transform:scale(1.2,1.2)}}@keyframes dot-keyframes{0%,100%{opacity:.4;-webkit-transform:scale(1,1);transform:scale(1,1)}50%{opacity:1;-webkit-transform:scale(1.2,1.2);transform:scale(1.2,1.2)}}`]
            },] },
];
/** @nocollapse */
ProgressIndicatorComponent.ctorParameters = () => [];
ProgressIndicatorComponent.propDecorators = {
    status: [{ type: Input }],
    color: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtaW5kaWNhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9hY3Rpb24vIiwic291cmNlcyI6WyJsaWIvcHJvZ3Jlc3MtaW5kaWNhdG9yL3Byb2dyZXNzLWluZGljYXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFekQ7Ozs7R0FJRztBQXFESCxNQUFNLE9BQU8sMEJBQTBCO0lBd0JuQzs7T0FFRztJQUNIO1FBWkE7Ozs7O1dBS0c7UUFDTSxVQUFLLEdBQVksU0FBUyxDQUFDO0lBT3BDLENBQUM7SUFFRCxRQUFRO0lBQ1IsQ0FBQzs7O1lBbkZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBK0NiO2dCQUNHLE1BQU0sRUFBRSxDQUFDLDZ2R0FBNnZHLENBQUM7YUFDMXdHOzs7OztxQkFjSSxLQUFLO29CQVFMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBUaGUgcHJvZ3Jlc3MgaW5kaWNhdG9yIGNhbiBiZSB1c2VkIHRvIHNob3cgdGhlIHN0YXR1cyBvZiBsb2FkaW5nIHNvbWV0aGluZy5cbiAqIFRoaXMgY2FuIGJlIHRoZSBzaW1wbGUgbG9hZGVyIG9yIGluIGNhc2Ugb2Ygc3VibWl0dGluZyBkYXRhIGl0IGNhbiBzaG93IHRoZSBzdGF0dXMgKG5vdCByZWFkeSwgbG9hZGluZywgZG9uZSBvciBlcnJvcikuXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2t1aS1wcm9ncmVzcy1pbmRpY2F0b3InLFxuICAgIHRlbXBsYXRlOiBgPCEtLSB0aGlzIGlzIHRoZSBwcm9ncmVzcyBpbmRpY2F0b3IgZm9yIGZvcm1zIC0tPlxuPGRpdiBjbGFzcz1cImt1aS1wcm9ncmVzcy1pbmRpY2F0b3Igc3VibWl0XCIgKm5nSWY9XCJzdGF0dXMgIT09IHVuZGVmaW5lZDsgZWxzZSBpc0xvYWRpbmdcIj5cbiAgICA8IS0tIHNwaW5uZXIgd2hpbGUgb24gbG9hZCAvIG9uIHN1Ym1pdCAtLT5cbiAgICA8ZGl2IGNsYXNzPVwib24tc3VibWl0XCIgKm5nSWY9XCJzdGF0dXMgPT09IDBcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXJcIiBbc3R5bGUuYm9yZGVyLXRvcC1jb2xvcl09XCJjb2xvclwiIFtzdHlsZS5ib3JkZXItbGVmdC1jb2xvcl09XCJjb2xvclwiPjwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdj5cbiAgICAgICAgPCEtLSBidWxsZXQgcG9pbnQgYmVmb3JlIHN1Ym1pdCAtLT5cbiAgICAgICAgPG1hdC1pY29uICpuZ0lmPVwic3RhdHVzID09PSAtMVwiIGNsYXNzPVwiYmVmb3JlLXN1Ym1pdFwiPmtleWJvYXJkX2Fycm93X3JpZ2h0PC9tYXQtaWNvbj5cbiAgICAgICAgPCEtLSBpY29uICdjaGVjaycgd2hlbiBkb25lIC0tPlxuICAgICAgICA8bWF0LWljb24gKm5nSWY9XCJzdGF0dXMgPT09IDFcIiBjbGFzcz1cImFmdGVyLXN1Ym1pdFwiIFtzdHlsZS5jb2xvcl09XCJjb2xvclwiPmRvbmU8L21hdC1pY29uPlxuICAgICAgICA8IS0tIGluIGNhc2Ugb2YgYW4gZXJyb3IgLS0+XG4gICAgICAgIDxtYXQtaWNvbiAqbmdJZj1cInN0YXR1cyA9PT0gNDAwXCIgY2xhc3M9XCJzdWJtaXQtZXJyb3JcIj5ub3RfaW50ZXJlc3RlZDwvbWF0LWljb24+XG4gICAgPC9kaXY+XG5cbjwvZGl2PlxuXG48IS0tIGRlZmF1bHQgY2FzZTogaXMgbG9hZGluZyAtLT5cbjxuZy10ZW1wbGF0ZSAjaXNMb2FkaW5nPlxuICAgIDxkaXYgY2xhc3M9XCJrdWktcHJvZ3Jlc3MtaW5kaWNhdG9yIGRlZmF1bHRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxpbmVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3VuY2UxXCIgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwiY29sb3JcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3VuY2UyXCIgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwiY29sb3JcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib3VuY2UzXCIgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwiY29sb3JcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsaW5lXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm91bmNlM1wiIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cImNvbG9yXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm91bmNlMVwiIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cImNvbG9yXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm91bmNlMlwiIFtzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yXT1cImNvbG9yXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cblxuXG48IS0tIGFub3RoZXIgdmFyaWV0eSBvZiBpc0xvYWRpbmcgKGluIG9uZSBsaW5lKSAtLT5cbjwhLS1cbjxkaXYgY2xhc3M9XCJsb2FkaW5nLXByb2dyZXNzLWluZGljYXRvclwiPlxuICAgIDxzcGFuIGNsYXNzPVwidGV4dFwiPnt7dGV4dH19PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiZG90XCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiZG90XCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiZG90XCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiZG90XCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiZG90XCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwiZG90XCI+PC9zcGFuPlxuPC9kaXY+XG4tLT5cbmAsXG4gICAgc3R5bGVzOiBbYC5rdWktcHJvZ3Jlc3MtaW5kaWNhdG9yLmRlZmF1bHR7aGVpZ2h0OjU2cHg7bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0bztwYWRkaW5nOjI0cHggMzZweDt0b3A6NjBweDt3aWR0aDo5NnB4fS5rdWktcHJvZ3Jlc3MtaW5kaWNhdG9yLmRlZmF1bHQucGFnZS1jZW50ZXJ7bGVmdDo1MCU7cG9zaXRpb246YWJzb2x1dGU7dG9wOjM5JTstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSl9Lmt1aS1wcm9ncmVzcy1pbmRpY2F0b3IuZGVmYXVsdCBoMSwua3VpLXByb2dyZXNzLWluZGljYXRvci5kZWZhdWx0IGgyLC5rdWktcHJvZ3Jlc3MtaW5kaWNhdG9yLmRlZmF1bHQgaDMsLmt1aS1wcm9ncmVzcy1pbmRpY2F0b3IuZGVmYXVsdCBwe2NvbG9yOiM1NTU7dGV4dC1hbGlnbjpjZW50ZXJ9Lmt1aS1wcm9ncmVzcy1pbmRpY2F0b3IuZGVmYXVsdCAubGluZXttYXJnaW46MCBhdXRvO3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjcwcHh9Lmt1aS1wcm9ncmVzcy1pbmRpY2F0b3IuZGVmYXVsdCAubGluZT5kaXZ7LXdlYmtpdC1hbmltYXRpb246MS40cyBlYXNlLWluLW91dCBpbmZpbml0ZSBib3RoIGJvdW5jZS1rZXlmcmFtZXM7YW5pbWF0aW9uOjEuNHMgZWFzZS1pbi1vdXQgaW5maW5pdGUgYm90aCBib3VuY2Uta2V5ZnJhbWVzO2JhY2tncm91bmQtY29sb3I6IzAwNjk1Yztib3JkZXItcmFkaXVzOjZweDtkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6MThweDt3aWR0aDoxOHB4fS5rdWktcHJvZ3Jlc3MtaW5kaWNhdG9yLmRlZmF1bHQgLmxpbmUgLmJvdW5jZTF7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LS4zMnM7YW5pbWF0aW9uLWRlbGF5Oi0uMzJzfS5rdWktcHJvZ3Jlc3MtaW5kaWNhdG9yLmRlZmF1bHQgLmxpbmUgLmJvdW5jZTJ7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LS4xNnM7YW5pbWF0aW9uLWRlbGF5Oi0uMTZzfUAtd2Via2l0LWtleWZyYW1lcyBib3VuY2Uta2V5ZnJhbWVzezAlLDEwMCUsODAley13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKX00MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMSk7dHJhbnNmb3JtOnNjYWxlKDEpfX1Aa2V5ZnJhbWVzIGJvdW5jZS1rZXlmcmFtZXN7MCUsMTAwJSw4MCV7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMCk7dHJhbnNmb3JtOnNjYWxlKDApfTQwJXstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxKTt0cmFuc2Zvcm06c2NhbGUoMSl9fS5rdWktcHJvZ3Jlc3MtaW5kaWNhdG9yLnN1Ym1pdHtoZWlnaHQ6MzJweDt3aWR0aDozMnB4fS5rdWktcHJvZ3Jlc3MtaW5kaWNhdG9yLnN1Ym1pdCAub24tc3VibWl0ey13ZWJraXQtYW5pbWF0aW9uOi43cyBsaW5lYXIgaW5maW5pdGUgc3Bpbm5lci1rZXlmcmFtZXM7YW5pbWF0aW9uOi43cyBsaW5lYXIgaW5maW5pdGUgc3Bpbm5lci1rZXlmcmFtZXM7aGVpZ2h0OjMycHg7d2lkdGg6MzJweH0ua3VpLXByb2dyZXNzLWluZGljYXRvci5zdWJtaXQgLm9uLXN1Ym1pdCAuc3Bpbm5lcntib3JkZXI6MnB4IHNvbGlkICMwMDY5NWM7Ym9yZGVyLWJvdHRvbS1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXItcmFkaXVzOjUwJTtib3JkZXItcmlnaHQtY29sb3I6dHJhbnNwYXJlbnQ7aGVpZ2h0OjI4cHg7d2lkdGg6MjhweH0ua3VpLXByb2dyZXNzLWluZGljYXRvci5zdWJtaXQgLmJlZm9yZS1zdWJtaXR7Y29sb3I6cmdiYSgxMjgsMTI4LDEyOCwuOCl9Lmt1aS1wcm9ncmVzcy1pbmRpY2F0b3Iuc3VibWl0IC5hZnRlci1zdWJtaXR7Y29sb3I6IzAwNjk1Y30ua3VpLXByb2dyZXNzLWluZGljYXRvci5zdWJtaXQgLnN1Ym1pdC1lcnJvcntjb2xvcjojZjQ0MzM2fUAtd2Via2l0LWtleWZyYW1lcyBzcGlubmVyLWtleWZyYW1lc3swJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMCk7dHJhbnNmb3JtOnJvdGF0ZSgwKX0xMDAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19QGtleWZyYW1lcyBzcGlubmVyLWtleWZyYW1lc3swJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMCk7dHJhbnNmb3JtOnJvdGF0ZSgwKX0xMDAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19LmxvYWRpbmctcHJvZ3Jlc3MtaW5kaWNhdG9ye3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjEwMCV9LmxvYWRpbmctcHJvZ3Jlc3MtaW5kaWNhdG9yIC50ZXh0e2NvbG9yOiMwMDY5NWM7Zm9udC1zaXplOjEycHR9LmxvYWRpbmctcHJvZ3Jlc3MtaW5kaWNhdG9yIC5kb3R7LXdlYmtpdC1hbmltYXRpb246MS40cyBlYXNlLWluLW91dCBpbmZpbml0ZSBkb3Qta2V5ZnJhbWVzO2FuaW1hdGlvbjoxLjRzIGVhc2UtaW4tb3V0IGluZmluaXRlIGRvdC1rZXlmcmFtZXM7YmFja2dyb3VuZC1jb2xvcjojMDA2OTVjO2JvcmRlci1yYWRpdXM6MnB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDo2cHg7bWFyZ2luOjNweCA2cHggMnB4O3dpZHRoOjZweH0ubG9hZGluZy1wcm9ncmVzcy1pbmRpY2F0b3IgLmRvdDpudGgtY2hpbGQoMil7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LjE2czthbmltYXRpb24tZGVsYXk6LjE2c30ubG9hZGluZy1wcm9ncmVzcy1pbmRpY2F0b3IgLmRvdDpudGgtY2hpbGQoMyl7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LjMyczthbmltYXRpb24tZGVsYXk6LjMyc30ubG9hZGluZy1wcm9ncmVzcy1pbmRpY2F0b3IgLmRvdDpudGgtY2hpbGQoNCl7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LjQ4czthbmltYXRpb24tZGVsYXk6LjQ4c30ubG9hZGluZy1wcm9ncmVzcy1pbmRpY2F0b3IgLmRvdDpudGgtY2hpbGQoNSl7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LjY0czthbmltYXRpb24tZGVsYXk6LjY0c30ubG9hZGluZy1wcm9ncmVzcy1pbmRpY2F0b3IgLmRvdDpudGgtY2hpbGQoNil7LXdlYmtpdC1hbmltYXRpb24tZGVsYXk6LjhzO2FuaW1hdGlvbi1kZWxheTouOHN9QC13ZWJraXQta2V5ZnJhbWVzIGRvdC1rZXlmcmFtZXN7MCUsMTAwJXtvcGFjaXR5Oi40Oy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDEsMSk7dHJhbnNmb3JtOnNjYWxlKDEsMSl9NTAle29wYWNpdHk6MTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxLjIsMS4yKTt0cmFuc2Zvcm06c2NhbGUoMS4yLDEuMil9fUBrZXlmcmFtZXMgZG90LWtleWZyYW1lc3swJSwxMDAle29wYWNpdHk6LjQ7LXdlYmtpdC10cmFuc2Zvcm06c2NhbGUoMSwxKTt0cmFuc2Zvcm06c2NhbGUoMSwxKX01MCV7b3BhY2l0eToxOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDEuMiwxLjIpO3RyYW5zZm9ybTpzY2FsZSgxLjIsMS4yKX19YF1cbn0pXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NJbmRpY2F0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtzdGF0dXNdXG4gICAgICpcbiAgICAgKiBbc3RhdHVzXSBpcyBhIG51bWJlciBhbmQgY2FuIGJlIHVzZWQgd2hlbiBzdWJtaXR0aW5nIGZvcm0gZGF0YTpcbiAgICAgKlxuICAgICAqIC0gbm90IHJlYWR5OiAgICAtMVxuICAgICAqIC0gbG9hZGluZzogICAgICAgMFxuICAgICAqIC0gZG9uZTogICAgICAgICAgMVxuICAgICAqXG4gICAgICogLSBlcnJvcjogICAgICAgNDAwXG4gICAgICovXG4gICAgQElucHV0KCkgc3RhdHVzPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFtjb2xvcj1wcmltYXJ5XVxuICAgICAqXG4gICAgICogUGFyYW1ldGVyIHRvIGN1c3RvbWl6ZSB0aGUgYXBwZWFyYW5jZSBvZiB0aGUgbG9hZGVyLlxuICAgICAqIEhleGFkZWNpbWFsIGNvbG9yIHZhbHVlIGUuZy4gIzAwZmYwMCBvciBzaW1pbGFyIGNvbG9yIHZhbHVlcyAncmVkJywgJ2dyZWVuJyBldGMuXG4gICAgICovXG4gICAgQElucHV0KCkgY29sb3I/OiBzdHJpbmcgPSAncHJpbWFyeSc7XG5cblxuICAgIC8qKlxuICAgICAqIEBpZ25vcmVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbn1cbiJdfQ==