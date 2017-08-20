/**
 * speaker
 * admin.getnativelearning.com
 *
 * Created by henryehly on 2017/07/04.
 */

import { SpeakerLocalization } from './speaker-localization';
import { Gender } from './gender';
import { Entity } from './entity';

export interface Speaker extends Entity {
    gender?: Gender
    pictureUrl?: string
    localizations?: SpeakerLocalization[]
}
