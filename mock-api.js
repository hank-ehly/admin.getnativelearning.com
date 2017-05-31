/**
 * mock-api
 * admin.get-native.com
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

app.post('/videos/transcribe', (req, res) => {
    return res.send({
        transcription: 'test 123'
    });
});

module.exports = app;
