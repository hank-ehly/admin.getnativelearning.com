import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NavigationComponent } from './navigation/navigation.component';
import { ForbidDirective } from './forbid/forbid.directive';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        NavigationComponent,
        ForbidDirective
    ],
    exports: [
        NavigationComponent,
        ForbidDirective
    ]
})
export class SharedModule {
}
