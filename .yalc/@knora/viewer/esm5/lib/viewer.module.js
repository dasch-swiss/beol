import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatNativeDateModule, MatSlideToggleModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { KuiActionModule } from '@knora/action';
import { KuiCoreModule } from '@knora/core';
import { BooleanValueComponent } from './property/boolean-value/boolean-value.component';
import { ColorValueComponent } from './property/color-value/color-value.component';
import { DateValueComponent } from './property/date-value/date-value.component';
import { DecimalValueComponent } from './property/decimal-value/decimal-value.component';
import { ExternalResValueComponent } from './property/external-res-value/external-res-value.component';
import { GeometryValueComponent } from './property/geometry-value/geometry-value.component';
import { GeonameValueComponent } from './property/geoname-value/geoname-value.component';
import { IntegerValueComponent } from './property/integer-value/integer-value.component';
import { IntervalValueComponent } from './property/interval-value/interval-value.component';
import { LinkValueComponent } from './property/link-value/link-value.component';
import { ListValueComponent } from './property/list-value/list-value.component';
import { TextValueAsHtmlComponent } from './property/text-value/text-value-as-html/text-value-as-html.component';
import { TextValueAsStringComponent } from './property/text-value/text-value-as-string/text-value-as-string.component';
import { TextValueAsXmlComponent } from './property/text-value/text-value-as-xml/text-value-as-xml.component';
import { TextfileValueComponent } from './property/textfile-value/textfile-value.component';
import { UriValueComponent } from './property/uri-value/uri-value.component';
import { AnnotationComponent } from './resource/annotation/annotation.component';
import { AudioComponent } from './resource/audio/audio.component';
import { CollectionComponent } from './resource/collection/collection.component';
import { DddComponent } from './resource/ddd/ddd.component';
import { DocumentComponent } from './resource/document/document.component';
import { LinkObjComponent } from './resource/link-obj/link-obj.component';
import { MovingImageComponent } from './resource/moving-image/moving-image.component';
import { ObjectComponent } from './resource/object/object.component';
import { RegionComponent } from './resource/region/region.component';
import { StillImageComponent } from './resource/still-image/still-image.component';
import { TextComponent } from './resource/text/text.component';
import { CompareViewComponent } from './view/compare-view/compare-view.component';
import { GraphViewComponent } from './view/graph-view/graph-view.component';
import { GridViewComponent } from './view/grid-view/grid-view.component';
import { ListViewComponent } from './view/list-view/list-view.component';
import { PropertiesViewComponent } from './view/properties-view/properties-view.component';
import { ResourceViewComponent } from './view/resource-view/resource-view.component';
import { TableViewComponent } from './view/table-view/table-view.component';
import { SearchResultsComponent } from './view/search-results/search-results.component';
var KuiViewerModule = /** @class */ (function () {
    function KuiViewerModule() {
    }
    KuiViewerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        KuiCoreModule,
                        KuiActionModule,
                        MatAutocompleteModule,
                        MatButtonModule,
                        MatCardModule,
                        MatCheckboxModule,
                        MatDatepickerModule,
                        MatExpansionModule,
                        MatFormFieldModule,
                        MatInputModule,
                        MatIconModule,
                        MatListModule,
                        MatNativeDateModule,
                        MatSlideToggleModule,
                        MatTabsModule,
                        MatToolbarModule,
                        MatTooltipModule,
                        ReactiveFormsModule,
                        FlexLayoutModule
                    ],
                    declarations: [
                        AnnotationComponent,
                        AudioComponent,
                        CollectionComponent,
                        DddComponent,
                        DocumentComponent,
                        LinkObjComponent,
                        MovingImageComponent,
                        ObjectComponent,
                        RegionComponent,
                        StillImageComponent,
                        TextComponent,
                        TextValueAsHtmlComponent,
                        TextValueAsStringComponent,
                        TextValueAsXmlComponent,
                        TextfileValueComponent,
                        DateValueComponent,
                        IntegerValueComponent,
                        ColorValueComponent,
                        DecimalValueComponent,
                        UriValueComponent,
                        BooleanValueComponent,
                        GeometryValueComponent,
                        GeonameValueComponent,
                        IntervalValueComponent,
                        ListValueComponent,
                        LinkValueComponent,
                        ExternalResValueComponent,
                        ListViewComponent,
                        GridViewComponent,
                        TableViewComponent,
                        ResourceViewComponent,
                        CompareViewComponent,
                        GraphViewComponent,
                        PropertiesViewComponent,
                        SearchResultsComponent
                    ],
                    exports: [
                        AnnotationComponent,
                        AudioComponent,
                        CollectionComponent,
                        DddComponent,
                        DocumentComponent,
                        LinkObjComponent,
                        MovingImageComponent,
                        ObjectComponent,
                        RegionComponent,
                        StillImageComponent,
                        TextComponent,
                        TextValueAsHtmlComponent,
                        TextValueAsStringComponent,
                        TextValueAsXmlComponent,
                        TextfileValueComponent,
                        DateValueComponent,
                        IntegerValueComponent,
                        ColorValueComponent,
                        DecimalValueComponent,
                        UriValueComponent,
                        BooleanValueComponent,
                        GeometryValueComponent,
                        GeonameValueComponent,
                        IntervalValueComponent,
                        ListValueComponent,
                        LinkValueComponent,
                        ExternalResValueComponent,
                        ListViewComponent,
                        GridViewComponent,
                        TableViewComponent,
                        ResourceViewComponent,
                        CompareViewComponent,
                        GraphViewComponent,
                        PropertiesViewComponent,
                        SearchResultsComponent
                    ]
                },] },
    ];
    return KuiViewerModule;
}());
export { KuiViewerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS92aWV3ZXIvIiwic291cmNlcyI6WyJsaWIvdmlld2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV4RCxPQUFPLEVBQ0gscUJBQXFCLEVBQ3JCLGVBQWUsRUFDZixhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLGtCQUFrQixFQUNsQixrQkFBa0IsRUFDbEIsYUFBYSxFQUNiLGNBQWMsRUFDZCxhQUFhLEVBQ2IsbUJBQW1CLEVBQ25CLG9CQUFvQixFQUNwQixhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNuQixNQUFNLG1CQUFtQixDQUFDO0FBRTNCLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUU1QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN6RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUNuRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNoRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUN6RixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUN2RyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztB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bmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5cbmltcG9ydCB7XG4gICAgTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICBNYXRDYXJkTW9kdWxlLFxuICAgIE1hdENoZWNrYm94TW9kdWxlLFxuICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICBNYXRMaXN0TW9kdWxlLFxuICAgIE1hdE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gICAgTWF0VGFic01vZHVsZSxcbiAgICBNYXRUb29sYmFyTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5pbXBvcnQgeyBNYXREYXRlcGlja2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGF0ZXBpY2tlcic7XG5pbXBvcnQgeyBLdWlBY3Rpb25Nb2R1bGUgfSBmcm9tICdAa25vcmEvYWN0aW9uJztcbmltcG9ydCB7IEt1aUNvcmVNb2R1bGUgfSBmcm9tICdAa25vcmEvY29yZSc7XG5cbmltcG9ydCB7IEJvb2xlYW5WYWx1ZUNvbXBvbmVudCB9IGZyb20gJy4vcHJvcGVydHkvYm9vbGVhbi12YWx1ZS9ib29sZWFuLXZhbHVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2xvclZhbHVlQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9wZXJ0eS9jb2xvci12YWx1ZS9jb2xvci12YWx1ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGF0ZVZhbHVlQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9wZXJ0eS9kYXRlLXZhbHVlL2RhdGUtdmFsdWUuY29tcG9uZW50JztcbmltcG9ydCB7IERlY2ltYWxWYWx1ZUNvbXBvbmVudCB9IGZyb20gJy4vcHJvcGVydHkvZGVjaW1hbC12YWx1ZS9kZWNpbWFsLXZhbHVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFeHRlcm5hbFJlc1ZhbHVlQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9wZXJ0eS9leHRlcm5hbC1yZXMtdmFsdWUvZXh0ZXJuYWwtcmVzLXZhbHVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHZW9tZXRyeVZhbHVlQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9wZXJ0eS9nZW9tZXRyeS12YWx1ZS9nZW9tZXRyeS12YWx1ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2VvbmFtZVZhbHVlQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9wZXJ0eS9nZW9uYW1lLXZhbHVlL2dlb25hbWUtdmFsdWUuY29tcG9uZW50JztcbmltcG9ydCB7IEludGVnZXJWYWx1ZUNvbXBvbmVudCB9IGZyb20gJy4vcHJvcGVydHkvaW50ZWdlci12YWx1ZS9pbnRlZ2VyLXZhbHVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbnRlcnZhbFZhbHVlQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9wZXJ0eS9pbnRlcnZhbC12YWx1ZS9pbnRlcnZhbC12YWx1ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGlua1ZhbHVlQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9wZXJ0eS9saW5rLXZhbHVlL2xpbmstdmFsdWUuY29tcG9uZW50JztcbmltcG9ydCB7IExpc3RWYWx1ZUNvbXBvbmVudCB9IGZyb20gJy4vcHJvcGVydHkvbGlzdC12YWx1ZS9saXN0LXZhbHVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUZXh0VmFsdWVBc0h0bWxDb21wb25lbnQgfSBmcm9tICcuL3Byb3BlcnR5L3RleHQtdmFsdWUvdGV4dC12YWx1ZS1hcy1odG1sL3RleHQtdmFsdWUtYXMtaHRtbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGV4dFZhbHVlQXNTdHJpbmdDb21wb25lbnQgfSBmcm9tICcuL3Byb3BlcnR5L3RleHQtdmFsdWUvdGV4dC12YWx1ZS1hcy1zdHJpbmcvdGV4dC12YWx1ZS1hcy1zdHJpbmcuY29tcG9uZW50JztcbmltcG9ydCB7IFRleHRWYWx1ZUFzWG1sQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9wZXJ0eS90ZXh0LXZhbHVlL3RleHQtdmFsdWUtYXMteG1sL3RleHQtdmFsdWUtYXMteG1sLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUZXh0ZmlsZVZhbHVlQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9wZXJ0eS90ZXh0ZmlsZS12YWx1ZS90ZXh0ZmlsZS12YWx1ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVXJpVmFsdWVDb21wb25lbnQgfSBmcm9tICcuL3Byb3BlcnR5L3VyaS12YWx1ZS91cmktdmFsdWUuY29tcG9uZW50JztcbmltcG9ydCB7IEFubm90YXRpb25Db21wb25lbnQgfSBmcm9tICcuL3Jlc291cmNlL2Fubm90YXRpb24vYW5ub3RhdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQXVkaW9Db21wb25lbnQgfSBmcm9tICcuL3Jlc291cmNlL2F1ZGlvL2F1ZGlvLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9yZXNvdXJjZS9jb2xsZWN0aW9uL2NvbGxlY3Rpb24uY29tcG9uZW50JztcbmltcG9ydCB7IERkZENvbXBvbmVudCB9IGZyb20gJy4vcmVzb3VyY2UvZGRkL2RkZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRG9jdW1lbnRDb21wb25lbnQgfSBmcm9tICcuL3Jlc291cmNlL2RvY3VtZW50L2RvY3VtZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaW5rT2JqQ29tcG9uZW50IH0gZnJvbSAnLi9yZXNvdXJjZS9saW5rLW9iai9saW5rLW9iai5jb21wb25lbnQnO1xuaW1wb3J0IHsgTW92aW5nSW1hZ2VDb21wb25lbnQgfSBmcm9tICcuL3Jlc291cmNlL21vdmluZy1pbWFnZS9tb3ZpbmctaW1hZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IE9iamVjdENvbXBvbmVudCB9IGZyb20gJy4vcmVzb3VyY2Uvb2JqZWN0L29iamVjdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVnaW9uQ29tcG9uZW50IH0gZnJvbSAnLi9yZXNvdXJjZS9yZWdpb24vcmVnaW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdGlsbEltYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9yZXNvdXJjZS9zdGlsbC1pbWFnZS9zdGlsbC1pbWFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGV4dENvbXBvbmVudCB9IGZyb20gJy4vcmVzb3VyY2UvdGV4dC90ZXh0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21wYXJlVmlld0NvbXBvbmVudCB9IGZyb20gJy4vdmlldy9jb21wYXJlLXZpZXcvY29tcGFyZS12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHcmFwaFZpZXdDb21wb25lbnQgfSBmcm9tICcuL3ZpZXcvZ3JhcGgtdmlldy9ncmFwaC12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHcmlkVmlld0NvbXBvbmVudCB9IGZyb20gJy4vdmlldy9ncmlkLXZpZXcvZ3JpZC12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaXN0Vmlld0NvbXBvbmVudCB9IGZyb20gJy4vdmlldy9saXN0LXZpZXcvbGlzdC12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9wZXJ0aWVzVmlld0NvbXBvbmVudCB9IGZyb20gJy4vdmlldy9wcm9wZXJ0aWVzLXZpZXcvcHJvcGVydGllcy12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZXNvdXJjZVZpZXdDb21wb25lbnQgfSBmcm9tICcuL3ZpZXcvcmVzb3VyY2Utdmlldy9yZXNvdXJjZS12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUYWJsZVZpZXdDb21wb25lbnQgfSBmcm9tICcuL3ZpZXcvdGFibGUtdmlldy90YWJsZS12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTZWFyY2hSZXN1bHRzQ29tcG9uZW50IH0gZnJvbSAnLi92aWV3L3NlYXJjaC1yZXN1bHRzL3NlYXJjaC1yZXN1bHRzLmNvbXBvbmVudCc7XG5cblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBLdWlDb3JlTW9kdWxlLFxuICAgICAgICBLdWlBY3Rpb25Nb2R1bGUsXG4gICAgICAgIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcbiAgICAgICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgICAgICBNYXRDYXJkTW9kdWxlLFxuICAgICAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICAgICAgTWF0RGF0ZXBpY2tlck1vZHVsZSxcbiAgICAgICAgTWF0RXhwYW5zaW9uTW9kdWxlLFxuICAgICAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgICAgIE1hdElucHV0TW9kdWxlLFxuICAgICAgICBNYXRJY29uTW9kdWxlLFxuICAgICAgICBNYXRMaXN0TW9kdWxlLFxuICAgICAgICBNYXROYXRpdmVEYXRlTW9kdWxlLFxuICAgICAgICBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcbiAgICAgICAgTWF0VGFic01vZHVsZSxcbiAgICAgICAgTWF0VG9vbGJhck1vZHVsZSxcbiAgICAgICAgTWF0VG9vbHRpcE1vZHVsZSxcbiAgICAgICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICAgICAgRmxleExheW91dE1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEFubm90YXRpb25Db21wb25lbnQsXG4gICAgICAgIEF1ZGlvQ29tcG9uZW50LFxuICAgICAgICBDb2xsZWN0aW9uQ29tcG9uZW50LFxuICAgICAgICBEZGRDb21wb25lbnQsXG4gICAgICAgIERvY3VtZW50Q29tcG9uZW50LFxuICAgICAgICBMaW5rT2JqQ29tcG9uZW50LFxuICAgICAgICBNb3ZpbmdJbWFnZUNvbXBvbmVudCxcbiAgICAgICAgT2JqZWN0Q29tcG9uZW50LFxuICAgICAgICBSZWdpb25Db21wb25lbnQsXG4gICAgICAgIFN0aWxsSW1hZ2VDb21wb25lbnQsXG4gICAgICAgIFRleHRDb21wb25lbnQsXG4gICAgICAgIFRleHRWYWx1ZUFzSHRtbENvbXBvbmVudCxcbiAgICAgICAgVGV4dFZhbHVlQXNTdHJpbmdDb21wb25lbnQsXG4gICAgICAgIFRleHRWYWx1ZUFzWG1sQ29tcG9uZW50LFxuICAgICAgICBUZXh0ZmlsZVZhbHVlQ29tcG9uZW50LFxuICAgICAgICBEYXRlVmFsdWVDb21wb25lbnQsXG4gICAgICAgIEludGVnZXJWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgQ29sb3JWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgRGVjaW1hbFZhbHVlQ29tcG9uZW50LFxuICAgICAgICBVcmlWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgQm9vbGVhblZhbHVlQ29tcG9uZW50LFxuICAgICAgICBHZW9tZXRyeVZhbHVlQ29tcG9uZW50LFxuICAgICAgICBHZW9uYW1lVmFsdWVDb21wb25lbnQsXG4gICAgICAgIEludGVydmFsVmFsdWVDb21wb25lbnQsXG4gICAgICAgIExpc3RWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgTGlua1ZhbHVlQ29tcG9uZW50LFxuICAgICAgICBFeHRlcm5hbFJlc1ZhbHVlQ29tcG9uZW50LFxuICAgICAgICBMaXN0Vmlld0NvbXBvbmVudCxcbiAgICAgICAgR3JpZFZpZXdDb21wb25lbnQsXG4gICAgICAgIFRhYmxlVmlld0NvbXBvbmVudCxcbiAgICAgICAgUmVzb3VyY2VWaWV3Q29tcG9uZW50LFxuICAgICAgICBDb21wYXJlVmlld0NvbXBvbmVudCxcbiAgICAgICAgR3JhcGhWaWV3Q29tcG9uZW50LFxuICAgICAgICBQcm9wZXJ0aWVzVmlld0NvbXBvbmVudCxcbiAgICAgICAgU2VhcmNoUmVzdWx0c0NvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuXG4gICAgICAgIEFubm90YXRpb25Db21wb25lbnQsXG4gICAgICAgIEF1ZGlvQ29tcG9uZW50LFxuICAgICAgICBDb2xsZWN0aW9uQ29tcG9uZW50LFxuICAgICAgICBEZGRDb21wb25lbnQsXG4gICAgICAgIERvY3VtZW50Q29tcG9uZW50LFxuICAgICAgICBMaW5rT2JqQ29tcG9uZW50LFxuICAgICAgICBNb3ZpbmdJbWFnZUNvbXBvbmVudCxcbiAgICAgICAgT2JqZWN0Q29tcG9uZW50LFxuICAgICAgICBSZWdpb25Db21wb25lbnQsXG4gICAgICAgIFN0aWxsSW1hZ2VDb21wb25lbnQsXG4gICAgICAgIFRleHRDb21wb25lbnQsXG4gICAgICAgIFRleHRWYWx1ZUFzSHRtbENvbXBvbmVudCxcbiAgICAgICAgVGV4dFZhbHVlQXNTdHJpbmdDb21wb25lbnQsXG4gICAgICAgIFRleHRWYWx1ZUFzWG1sQ29tcG9uZW50LFxuICAgICAgICBUZXh0ZmlsZVZhbHVlQ29tcG9uZW50LFxuICAgICAgICBEYXRlVmFsdWVDb21wb25lbnQsXG4gICAgICAgIEludGVnZXJWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgQ29sb3JWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgRGVjaW1hbFZhbHVlQ29tcG9uZW50LFxuICAgICAgICBVcmlWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgQm9vbGVhblZhbHVlQ29tcG9uZW50LFxuICAgICAgICBHZW9tZXRyeVZhbHVlQ29tcG9uZW50LFxuICAgICAgICBHZW9uYW1lVmFsdWVDb21wb25lbnQsXG4gICAgICAgIEludGVydmFsVmFsdWVDb21wb25lbnQsXG4gICAgICAgIExpc3RWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgTGlua1ZhbHVlQ29tcG9uZW50LFxuICAgICAgICBFeHRlcm5hbFJlc1ZhbHVlQ29tcG9uZW50LFxuICAgICAgICBMaXN0Vmlld0NvbXBvbmVudCxcbiAgICAgICAgR3JpZFZpZXdDb21wb25lbnQsXG4gICAgICAgIFRhYmxlVmlld0NvbXBvbmVudCxcbiAgICAgICAgUmVzb3VyY2VWaWV3Q29tcG9uZW50LFxuICAgICAgICBDb21wYXJlVmlld0NvbXBvbmVudCxcbiAgICAgICAgR3JhcGhWaWV3Q29tcG9uZW50LFxuICAgICAgICBQcm9wZXJ0aWVzVmlld0NvbXBvbmVudCxcbiAgICAgICAgU2VhcmNoUmVzdWx0c0NvbXBvbmVudFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgS3VpVmlld2VyTW9kdWxlIHtcbn1cbiJdfQ==