/**
 * mock-api
 * admin.getnativelearning.com
 *
 * Created by henryehly on 2017/05/31.
 */

const express = require('express');

const app = express();

for (let key of ['x-powered-by', 'etag', 'views', 'view engine']) {
    app.disable(key);
}

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': 'X-GN-Auth-Token, X-GN-Auth-Expire',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'PATCH'
};

app.use((req, res, next) => {
    res.set(corsHeaders);
    res.set('x-gn-auth-token', 'test-token-123');
    res.set('x-gn-auth-expire', '9996148743676');
    next();
});

app.post('/sessions', (req, res) => {
    return res.status(201).send({});
});

app.get('/categories', (req, res) => {
    return res.send({
        records: [
            {
                id: 1,
                name: 'Business',
                subcategories: {
                    records: [
                        {
                            id: 1,
                            name: 'Meeting Preparation'
                        }, {
                            id: 2,
                            name: 'Business Cards'
                        }, {
                            id: 3,
                            name: 'Greeting Co-Workers'
                        }
                    ],
                    count: 3
                }
            }, {
                id: 2,
                name: 'Holidays',
                subcategories: {
                    records: [
                        {
                            id: 4,
                            name: 'Holding Hands'
                        }, {
                            id: 5,
                            name: 'Meeting the Parents'
                        }
                    ],
                    count: 2
                }
            }, {
                id: 3,
                name: 'Travel',
                subcategories: {
                    records: [
                        {
                            id: 6,
                            name: 'Subcategory 1'
                        }, {
                            id: 7,
                            name: 'Subcategory 2'
                        }, {
                            id: 8,
                            name: 'Subcategory 3'
                        }, {
                            id: 9,
                            name: 'Subcategory 4'
                        }, {
                            id: 10,
                            name: 'Subcategory 5'
                        }
                    ],
                    count: 5
                }
            }, {
                id: 4,
                name: 'School',
                subcategories: {
                    records: [],
                    count: 0
                }
            }, {
                id: 5,
                name: 'Transportation',
                subcategories: {
                    records: [
                        {
                            id: 13,
                            name: 'Taking the Train'
                        }, {
                            id: 14,
                            name: 'Riding Horses'
                        }, {
                            id: 15,
                            name: 'Bus Passes'
                        }, {
                            id: 16,
                            name: 'Taking Long Road Trips'
                        }
                    ],
                    count: 4
                }
            }
        ],
        count: 5
    });
});

app.get('/categories/:id', (req, res) => {
    res.sendStatus(404);
});

app.patch('/categories/:id', (req, res) => {
    res.sendStatus(404);
});

if (process.env.LISTEN) {
    module.exports = app.listen(3000, () => console.log('Mock API is running'));
} else {
    module.exports = app;
}
