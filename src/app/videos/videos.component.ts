import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'gn-videos',
    templateUrl: './videos.component.html',
    styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
    title = 'Videos';

    emitTranscriptSource = new Subject<string>();

    transcriptionEmitted$ = this.emitTranscriptSource.asObservable();

    constructor() {
        // FormData
    }

    ngOnInit() {
    }

    onFileChange(e: Event) {
        this.emitTranscriptSource.next('this is a video camera test this is a video camera test');
    }
}
