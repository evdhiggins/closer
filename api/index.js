import express from 'express'
import axios from 'axios'
require('dotenv').config()
const app = express()

const MAPS_URL = `https://maps.googleapis.com/maps/api/geocode/json`

/** Lookup endpoint for location requests */
app.get('/location', async (req, res) => {
  try {
    const { data } = await axios.get(MAPS_URL, {
      params: {
        address: req.query.address,
        key: process.env.API_KEY
      }
    })

    if (data && data.error_message) {
      console.error(data.error_message)
      return res
        .status(500)
        .send({ error: 'An internal server error occurred' })
    }

    if (!data || !data.results || !data.results.length) {
      return res.status(404).send({ error: 'Location not found' })
    }

    const results = data.results.map((result) => {
      const location = {
        id: result.place_id,
        address: result.formatted_address,
        geometry: result.geometry
      }

      if (result.geometry && result.geometry.bounds) {
        if (result.geometry.bounds.northeast) {
          const { lat, lng } = result.geometry.bounds.northeast
          location.lat = lat
          location.lng = lng
        } else {
          const { lat, lng } = result.geometry.bounds.southwest
          location.lat = lat
          location.lng = lng
        }
      }

      return location
    })

    return res.send({ error: null, results })
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ error: err.message })
  }
})

export default {
  path: '/api',
  handler: app
}
