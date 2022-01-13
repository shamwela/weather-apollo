import Head from 'next/head'
import { gql } from '@apollo/client'
import { useLazyQuery } from '@apollo/client'
import { useState } from 'react'

const GET_WEATHER_DATA = gql`
  query getCityByName($name: String!) {
    getCityByName(name: $name) {
      name
      weather {
        summary {
          description
        }
        temperature {
          actual
        }
        wind {
          speed
        }
      }
    }
  }
`

const Home = () => {
  const [searchedCity, setSearchedCity] = useState('')
  const [getWeatherData, { loading, error, data }] = useLazyQuery(
    GET_WEATHER_DATA,
    {
      variables: { name: searchedCity },
    }
  )

  return (
    <>
      <Head>
        <title>Weather app using Apollo</title>
        <meta name='description' content='Weather app using Apollo' />
      </Head>
      <main>
        <h1>Weather app using Apollo</h1>
        <input
          type='text'
          placeholder='City name'
          aria-label='City name'
          value={searchedCity}
          onChange={(event) => setSearchedCity(event.currentTarget.value)}
        />
        <button onClick={() => getWeatherData()}>Search</button>
        {loading && <p>Searching now. Please wait.</p>}
        {error && <p>There was an error. Please search another city.</p>}
        {data?.getCityByName?.name && (
          <>
            <h2>City: {data?.getCityByName.name}</h2>
            <p>Summary: {data?.getCityByName.weather.summary.description}</p>
            <p>Temperature: {data?.getCityByName.weather.temperature.actual}</p>
            <p>Wind speed: {data?.getCityByName.weather.wind.speed}</p>
          </>
        )}
      </main>
    </>
  )
}

export default Home
