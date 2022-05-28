import * as React from 'react'
import { Link } from 'gatsby'
import TodoApp from '../components/app.js'

const IndexPage = () => {
  return (
    <main>
      <title>Home Page</title>
      <h1>Welcome to my Gatsby site!</h1>
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <TodoApp/>
    </main>
  )
}
export default IndexPage