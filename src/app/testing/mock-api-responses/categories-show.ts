/**
 * categories-show
 * admin.get-native.com
 *
 * Created by henryehly on 2017/06/15.
 */

export const MockApiResponse_CategoriesShow = {
    id: 123,
    categories_localized: {
        records: [
            {
                language: {
                    name: 'English',
                    code: 'en'
                },
                name: 'Category 1',
                id: 1109
            },
            {
                language: {
                    name: '日本語',
                    code: 'ja'
                },
                name: 'カテゴリー１',
                id: 1110
            }
        ],
        count: 2
    },
    created_at: 'Wed Jan 11 04:35:55 +0000 2017',
    updated_at: 'Wed Jan 11 04:35:55 +0000 2017',
    subcategories: {
        records: [
            {
                id: 456,
                name: 'Subcategory 1',
                created_at: 'Wed Jan 11 04:35:55 +0000 2017',
                updated_at: 'Wed Jan 11 04:35:55 +0000 2017'
            },
            {
                id: 789,
                name: 'Subcategory 2',
                created_at: 'Wed Jan 11 04:35:55 +0000 2017',
                updated_at: 'Wed Jan 11 04:35:55 +0000 2017'
            },
            {
                id: 1234,
                name: 'Subcategory 3',
                created_at: 'Wed Jan 11 04:35:55 +0000 2017',
                updated_at: 'Wed Jan 11 04:35:55 +0000 2017'
            },
            {
                id: 2345,
                name: 'Subcategory 4',
                created_at: 'Wed Jan 11 04:35:55 +0000 2017',
                updated_at: 'Wed Jan 11 04:35:55 +0000 2017'
            }
        ],
        count: 4
    }
};
