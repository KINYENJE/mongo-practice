const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const MongoClient = require('mongodb').MongoClient

const mongoConnnectionString =  'mongodb+srv://kinyenje:trustworthiness01@cluster0.aramigj.mongodb.net/?retryWrites=true&w=majority'


MongoClient.connect(mongoConnnectionString, {useUnifiedTopology: true})
    .then(client => {
        console.log('connected to database')

        const db = client.db('cars-database')  // database name

        const carBrandsCollection = db.collection('cars-collection') // collection name

        app.use(bodyParser.urlencoded({extended: true}))

        app.get('/' , (req, res) => {
            res.sendFile(__dirname + '/index.html')
        })

        app.post('/' , (req, res) => {
            console.log(req.body)

            /** storing data in the database */
            carBrandsCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                })


            res.redirect('/')
        })

        app.listen(2121, () => {
            console.log('Running on 2121')
        })
    })
    .catch(error => console.error(error))



