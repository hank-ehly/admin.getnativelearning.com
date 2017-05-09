import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { PageComponent } from './page/page.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [NavigationComponent, PageComponent],
    exports: [NavigationComponent, PageComponent]
})
export class SharedModule {
}
