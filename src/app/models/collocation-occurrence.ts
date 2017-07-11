/**
 * collocation-occurrence
 * admin.get-native.com
 *
 * Created by henryehly on 2017/07/11.
 */

import { EntityList } from './entity-list';
import { UsageExample } from './usage-example';
import { Entity } from './entity';

export interface CollocationOccurrence extends Entity {
    id: number
    text: string
    ipa_spelling: string
    usage_examples: EntityList<UsageExample>
}
