/**
 * collocation-occurrences-index
 * admin.getnativelearning.com
 *
 * Created by henryehly on 2017/07/12.
 */

export const MockApiResponse_CollocationOccurrencesIndex = {
    records: [
        {
            id: 1,
            text: 'funny thing',
            ipa_spelling: 'fʌni θɪŋ',
            usage_examples: {
                records: [
                    {
                        id: 5,
                        text: 'It\'s a funny thing, being in love with someone.'
                    },
                    {
                        id: 72,
                        text: 'Too bad it\'s a funny thing you didn\'t consider it.'
                    }
                ],
                count: 2
            }
        },
        {
            id: 91,
            text: 'try out',
            ipa_spelling: 'traɪ aʊt',
            usage_examples: {
                records: [
                    {
                        id: 691,
                        text: 'I really want to try out my new computer.'
                    }
                ],
                count: 1
            }
        }
    ],
    count: 2
};
