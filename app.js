const express = require('express')
const morgan = require('morgan')
const app = express()
const apps = require('./playstore-apps.js')

app.use(morgan('common'))

app.get('/apps', (req, res) => {
    const { genres = '', sort} = req.query

    if(sort) {
        if (!['Rating', 'App'].includes(sort)) {
            return res
                .status(400)
                .send('sort must be by app or rating')
        }
    }

    let results = apps
            .filter(app => 
                app
                    .Genres
                    .toLowerCase()
                    .includes(genres.toLowerCase()))

    if (sort) {
        results
            .sort((a,b) => {
                return a[sort] > b[sort] ? 1 : -1
            })
    }

    res
        .json(results)
})

app.listen(8000, () => {
    console.log('Server started on PORT 8000');
  });

  module.exports = app