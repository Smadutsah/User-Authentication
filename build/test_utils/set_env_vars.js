"use strict";
const env = process.env;
process.env = Object.assign(Object.assign({}, env), { NODE_ENV: 'test' });
