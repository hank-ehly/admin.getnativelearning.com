/**
 * categories-index
 * admin.get-native.com
 *
 * Created by henryehly on 2017/06/14.
 */

export const MockApiResponse_CategoriesIndex = {
    records: [
        {
            id: 1,
            name: 'Business',
            subcategories: {
                records: [
                    {
                        id: 1,
                        name: 'Meeting Preparation'
                    },
                    {
                        id: 2,
                        name: 'Business Cards'
                    },
                    {
                        id: 3,
                        name: 'Greeting Co-Workers'
                    }
                ],
                count: 3
            }
        },
        {
            id: 2,
            name: 'Holidays',
            subcategories: {
                records: [
                    {
                        id: 4,
                        name: 'Holding Hands'
                    },
                    {
                        id: 5,
                        name: 'Meeting the Parents'
                    }
                ],
                count: 2
            }
        },
        {
            id: 3,
            name: 'Travel',
            subcategories: {
                records: [
                    {
                        id: 6,
                        name: 'Subcategory 1'
                    },
                    {
                        id: 7,
                        name: 'Subcategory 2'
                    },
                    {
                        id: 8,
                        name: 'Subcategory 3'
                    },
                    {
                        id: 9,
                        name: 'Subcategory 4'
                    },
                    {
                        id: 10,
                        name: 'Subcategory 5'
                    }
                ],
                count: 5
            }
        },
        {
            id: 4,
            name: 'School',
            subcategories: {
                records: [
                    {
                        id: 11,
                        name: 'First Day'
                    },
                    {
                        id: 12,
                        name: 'Making Friends'
                    }
                ],
                count: 2
            }
        },
        {
            id: 5,
            name: 'Transportation',
            subcategories: {
                records: [
                    {
                        id: 13,
                        name: 'Taking the Train'
                    },
                    {
                        id: 14,
                        name: 'Riding Horses'
                    },
                    {
                        id: 15,
                        name: 'Bus Passes'
                    },
                    {
                        id: 16,
                        name: 'Taking Long Road Trips'
                    }
                ],
                count: 4
            }
        }
    ],
    count: 5
};
