/**
 * speaker-localization
 * admin.getnativelearning.com
 *
 * Created by henryehly on 2017/07/04.
 */

import { Language } from './language';

export interface SpeakerLocalization {
    language: Language
    name?: string
    description?: string
    location?: string
}
