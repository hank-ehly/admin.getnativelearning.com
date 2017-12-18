import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NavigationComponent } from './navigation/navigation.component';
import { YoutubePlayerDirective } from './youtube-player.directive';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        NavigationComponent,
        YoutubePlayerDirective
    ],
    exports: [
        NavigationComponent,
        YoutubePlayerDirective
    ]
})
export class SharedModule {
}
