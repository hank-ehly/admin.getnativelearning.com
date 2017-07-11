/**
 * video
 * admin.get-native.com
 *
 * Created by henryehly on 2017/07/10.
 */

import { SafeUrl } from '@angular/platform-browser';

export interface Video {
    file?: File;
    is_public?: boolean;
    subcategory_id?: number;
    speaker_id?: number;
    language_id?: number;
    transcripts?: { language_id: number, text: string }[];
    descriptions?: { language_id: number, description: string }[]
    picture_url?: string
    video_url?: string | SafeUrl
}
