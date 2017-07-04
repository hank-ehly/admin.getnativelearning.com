/**
 * speaker
 * admin.get-native.com
 *
 * Created by henryehly on 2017/07/04.
 */

import { SpeakerLocalization } from './speaker-localization';
import { Gender } from './gender';

export interface Speaker {
    gender?: Gender
    pictureUrl?: string
    localizations?: SpeakerLocalization[]
}
