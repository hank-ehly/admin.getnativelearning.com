/**
 * subcategories-show
 * admin.get-native.com
 *
 * Created by henryehly on 2017/06/14.
 */

export const MockApiResponse_SubcategoriesShow = {
    id: 456,
    category: {
        id: 3
    },
    subcategories_localized: {
        records: [
            {
                language: {
                    name: 'English',
                    code: 'en'
                },
                name: 'Subcategory 1',
                id: 123
            },
            {
                language: {
                    name: '日本語',
                    code: 'ja'
                },
                name: 'サブカテゴリー１',
                id: 456
            }
        ],
        count: 2
    },
    created_at: 'Wed Jan 11 04:35:55 +0000 2017',
    updated_at: 'Wed Jan 11 04:35:55 +0000 2017'
};
