/**
 * video
 * admin.getnativelearning.com
 *
 * Created by henryehly on 2017/07/10.
 */

import { Entity } from './entity';

export interface Video extends Entity {
    file?: File;
    is_public?: boolean;
    subcategory_id?: number;
    speaker_id?: number;
    language_id?: number;
    localizations?: { id?: number, language_id?: number, transcript?: string, writing_questions?: any }[]
    youtube_video_id?: string;
    loop_count?: number;
}
