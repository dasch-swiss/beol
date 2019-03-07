import { Component, Input } from '@angular/core';
import { ReadTextValueAsXml } from '@knora/core';
export class TextValueAsXmlComponent {
    constructor() {
    }
    set valueObject(value) {
        this._xmlValueObj = value;
    }
    get valueObject() {
        return this._xmlValueObj;
    }
}
TextValueAsXmlComponent.decorators = [
    { type: Component, args: [{
                selector: 'kui-text-value-as-xml',
                template: `<span>{{valueObject.xml}}</span>`,
                styles: [``]
            },] },
];
/** @nocollapse */
TextValueAsXmlComponent.ctorParameters = () => [];
TextValueAsXmlComponent.propDecorators = {
    valueObject: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC12YWx1ZS1hcy14bWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtub3JhL3ZpZXdlci8iLCJzb3VyY2VzIjpbImxpYi9wcm9wZXJ0eS90ZXh0LXZhbHVlL3RleHQtdmFsdWUtYXMteG1sL3RleHQtdmFsdWUtYXMteG1sLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFPakQsTUFBTSxPQUFPLHVCQUF1QjtJQWFoQztJQUNBLENBQUM7SUFaRCxJQUNJLFdBQVcsQ0FBQyxLQUF5QjtRQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ1gsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7OztZQWRKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUUsa0NBQWtDO2dCQUM1QyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDZjs7Ozs7MEJBR0ksS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWRUZXh0VmFsdWVBc1htbCB9IGZyb20gJ0Brbm9yYS9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdrdWktdGV4dC12YWx1ZS1hcy14bWwnLFxuICAgIHRlbXBsYXRlOiBgPHNwYW4+e3t2YWx1ZU9iamVjdC54bWx9fTwvc3Bhbj5gLFxuICAgIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBUZXh0VmFsdWVBc1htbENvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCB2YWx1ZU9iamVjdCh2YWx1ZTogUmVhZFRleHRWYWx1ZUFzWG1sKSB7XG4gICAgICAgIHRoaXMuX3htbFZhbHVlT2JqID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlT2JqZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5feG1sVmFsdWVPYmo7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfeG1sVmFsdWVPYmo6IFJlYWRUZXh0VmFsdWVBc1htbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxufVxuIl19