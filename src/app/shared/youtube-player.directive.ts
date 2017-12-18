import { AfterViewInit, Directive, ElementRef, Inject, Input, LOCALE_ID, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import * as _ from 'lodash';

@Directive({
    selector: '[gnYoutubePlayer]'
})
export class YoutubePlayerDirective implements OnInit, AfterViewInit, OnDestroy, OnChanges {

    api: any;

    @Input() width = 435;
    @Input() height = 280;
    @Input() loop = true;
    @Input() autoplay = true;
    @Input() videoId: string;

    get playerState(): number {
        if (_.has(this, 'api.getPlayerState')) {
            return this.api.getPlayerState();
        }
        return -1;
    }

    get buffered(): number {
        if (_.has(this, 'api.getVideoLoadedFraction')) {
            return this.api.getVideoLoadedFraction() || 0;
        }
        return 0;
    }

    get seek(): number {
        if (_.has(this, 'api.getCurrentTime') && _.has(this, 'api.getDuration')) {
            return (this.api.getCurrentTime() / this.api.getDuration()) || 0;
        }
        return 0;
    }

    get muted(): boolean {
        if (_.has(this, 'api.isMuted')) {
            return this.api.isMuted();
        }
        return false;
    }

    get duration(): number {
        if (_.has(this, 'api.getDuration')) {
            return this.api.getDuration();
        }
        return 0;
    }

    get currentTime(): number {
        if (_.has(this, 'api.getCurrentTime')) {
            return this.api.getCurrentTime();
        }
        return 0;
    }

    get volume(): number {
        if (_.has(this, 'api.getVolume')) {
            return this.api.getVolume();
        }
        return 0;
    }

    set volume(value: number) {
        if (_.has(this, 'api.setVolume')) {
            this.api.setVolume(_.clamp(value, 0, 100));
        }
    }

    constructor(private el: ElementRef, @Inject(LOCALE_ID) private localeId: string) {
        (<any>window).onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this);
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.loadYouTubeIframeAPIIfNeeded();
    }

    ngOnDestroy(): void {
        if (_.has(this, 'api.destroy')) {
            this.api.destroy();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes['videoId'] && _.has(this, 'api.loadVideoById')) {
            setTimeout(() => {
                this.api.loadVideoById(changes['videoId'].currentValue, 0);
            }, 0);
        }
    }

    seekTo(value: number): void {
        if (_.has(this, 'api.seekTo')) {
            this.api.seekTo(_.floor(value), true);
        }
    }

    private loadYouTubeIframeAPIIfNeeded() {
        const iframeAPIScriptTagID = 'youtube-iframe-api';
        if (document.getElementById(iframeAPIScriptTagID)) {
            this.onYouTubeIframeAPIReady();
        } else {
            const tag = document.createElement('script');
            tag.type = 'text/javascript';
            tag.src = 'https://www.youtube.com/iframe_api';
            tag.id = iframeAPIScriptTagID;
            document.body.appendChild(tag);
        }
    }

    private onYouTubeIframeAPIReady(): void {
        if (!window['YT']) {
            return;
        }

        this.api = new YT.Player(this.el.nativeElement.id, {
            height: this.height,
            width: this.width,
            videoId: this.videoId,
            playerVars: {
                version: 3,
                modestbranding: 1,
                controls: 1,
                enablejsapi: 1,
                rel: 0,
                loop: this.loop ? 1 : 0,
                autoplay: this.autoplay ? 1 : 0,
                hl: 'en'
            },
            events: {
                'onReady': this.onPlayerReady.bind(this),
                'onStateChange': this.onPlayerStateChange.bind(this),
                'onError': this.onError.bind(this)
            }
        });
    }

    /*
    * This event fires if an error occurs in the player. The API will pass an event object to the event listener function. That object's
    * data property will specify an integer that identifies the type of error that occurred. Possible values are:
    *
    * 2 – The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have
    *     11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.
    * 5 – The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.
    * 100 – The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as
    *       private.
    * 101 – The owner of the requested video does not allow it to be played in embedded players.
    * 150 – This error is the same as 101. It's just a 101 error in disguise!
    * */
    private onError(e: any): void {
        console.log('Error', e);
    }

    private onPlayerReady(e: any): void {
        console.log('PlayerReady', e);
    }

    private onPlayerStateChange(e: any): void {
    }

}
