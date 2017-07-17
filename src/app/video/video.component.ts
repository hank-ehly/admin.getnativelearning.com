import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'gn-videos',
    templateUrl: './video.component.html'
})
export class VideoComponent implements OnInit {
    title = 'Videos';
    // breadcrumbs: string[] = [];

    constructor() {
    }

    ngOnInit(): void {
        /*this.videoService.breadcrumbsEmitted$.subscribe(x => {
            console.log(x);
            this.breadcrumbs = x.split('_');
        });*/
    }
}
