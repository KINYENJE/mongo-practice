const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 2121
require('dotenv').config()

const MongoClient = require('mongodb').MongoClient

const mongoConnnectionString =  process.env.DB_STRING


MongoClient.connect(mongoConnnectionString, {useUnifiedTopology: true})
    .then(client => {
        console.log('connected to database')

        const db = client.db('cars-database')  // database name

        const carBrandsCollection = db.collection('cars-collection') // collection name

        app.set('view engine', 'ejs') // tell express were using ejs template  !!!! comes before use,get or post

        app.use(bodyParser.urlencoded({extended: true}))

        app.use(express.json())  // Middleware for parsing JSON body

        app.use(express.static('public'))

        app.get('/' , (req, res) => {

            /** fetching data from the database */
            db.collection('cars-collection').find().sort({year:1}).toArray() /** sort({year:1}). -1 sorts in descending order */
                .then(results => {
                    console.log(results)
                    res.render('index.ejs', {cars : results})
                })
                .catch(error => console.error(error))
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

        app.delete('/deleteCar' , (req, res) => {
            console.log(req.body)
            carBrandsCollection.deleteOne({name: req.body.carModel})
            .then(result => {

                if (result.deletedCount ===0){
                    return res.json('No quote to be deleted')
                }
                console.log(result)
                res.json('car deleted')
            })

            .catch(error => console.error(error))
        })

        app.put('/updatePrice' , (req, res) => {
            carBrandsCollection.updateOne(
                {name: req.body.carModel,
                year: req.body.YOM,
                brand: req.body.carBrand
                },
                { 
                    $set: {price: req.body.carPrice}
                })
            .then(result => {
                console.log(result)
                if (result.modifiedCount ===0){
                    return res.json('No price to be updated')
                }
                res.json('price updated')
            })
            .catch(error => console.error(error))
        })

        app.listen(process.env.PORT || PORT, () => {
            console.log('Running on 2121')
        })
    })
    .catch(error => console.error(error))



