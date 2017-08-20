/**
 * index
 * admin.getnativelearning.com
 *
 * Created by henryehly on 2017/06/14.
 */

import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

export function newEvent(eventName: string, bubbles = false, cancelable = false) {
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
}

// See https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
export const ButtonClickEvents = {
    left:  { button: 0 },
    right: { button: 2 }
};

export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
    if (el instanceof HTMLElement) {
        el.click();
    } else {
        el.triggerEventHandler('click', eventObj);
    }
}

export function select<T>(el: HTMLSelectElement, index: number, fixture: ComponentFixture<T>) {
    el.selectedIndex = index;
    el.dispatchEvent(newEvent('input'));
    el.dispatchEvent(newEvent('change'));
    fixture.detectChanges();
}
