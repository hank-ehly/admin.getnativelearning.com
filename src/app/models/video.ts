/**
 * video
 * admin.getnativelearning.com
 *
 * Created by henryehly on 2017/07/10.
 */

import { SafeUrl } from '@angular/platform-browser';
import { Entity } from './entity';

export interface Video extends Entity {
    file?: File;
    is_public?: boolean;
    subcategory_id?: number;
    speaker_id?: number;
    language_id?: number;
    localizations?: { id?: number, language_id?: number, transcript?: string, description?: string, writing_questions?: any }[]
    picture_url?: string
    video_url?: string | SafeUrl
}
