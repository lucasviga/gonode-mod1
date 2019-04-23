const express = require('express')

const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

const ckeckIdade = (req, res, next) => {
  const { idade } = req.query

  if (!idade) {
    return res.redirect('/')
  }

  return next()
}

app.get('/', (req, res) => {
  return res.render('form')
})

app.get('/major', ckeckIdade, (req, res) => {
  const { idade } = req.query
  return res.render('major', { idade })
})

app.get('/minor', ckeckIdade, (req, res) => {
  const { idade } = req.query
  return res.render('minor', { idade })
})

app.post('/check', (req, res) => {
  const { idade } = req.body

  if (idade >= 18) {
    return res.redirect(`/major?idade=${idade}`)
  } else {
    return res.redirect(`/minor?idade=${idade}`)
  }
})

app.listen(3000)
