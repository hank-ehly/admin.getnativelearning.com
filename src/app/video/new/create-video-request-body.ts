/**
 * create-video-request-params
 * admin.get-native.com
 *
 * Created by henryehly on 2017/07/10.
 */

export interface CreateVideoRequestBody {
    subcategory_id: number
    language_id: number
    speaker_id: number
    transcripts: { language_id: number, text: string }[]
    descriptions: { language_id: number, description: string }[]
}
