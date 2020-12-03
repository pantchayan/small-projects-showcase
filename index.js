// CORE MODULES
const fs = require('fs');
const http = require('http');
const url = require('url');


const tempOverview = fs.readFileSync(`${__dirname}/templates/overview-template.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/card-template.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product-template.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');

const dataObj = JSON.parse(data);



