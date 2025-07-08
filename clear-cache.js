/**
 * Cache busting script for TomasVerde website
 * 
 * This script generates a new timestamp to append to resource URLs
 * forcing browsers to download fresh copies of modified resources
 */

const fs = require('fs');
const path = require('path');

// Get current timestamp to use as version
const timestamp = Math.floor(Date.now() / 1000);
const versionString = `v=${timestamp}`;

// File paths to update
const htmlFile = path.join(__dirname, 'index.html');

// Read the HTML file
let htmlContent = fs.readFileSync(htmlFile, 'utf8');

// Create a single regex to match all version patterns
const versionRegex = /(\w+\.[a-z]{2,4})\?v=\d+/g;

// Replace all version strings
htmlContent = htmlContent.replace(versionRegex, (match, p1) => `${p1}?${versionString}`);

// Write the updated HTML file
fs.writeFileSync(htmlFile, htmlContent);

console.log(`Cache busting completed! New version: ${versionString}`);
console.log(`Updated resources in ${htmlFile}`);
