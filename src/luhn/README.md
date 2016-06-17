# Luhn generator/validator

Generate and validate luhn checksum (https://en.wikipedia.org/wiki/Luhn_algorithm)

## Install
`npm install fjandin-luhn`

## Usage
```
const luhn = require('fjandin-luhn');
luhn.generate(12345); // = 123455
luhn.validate(123455); // = true
```
