import { useState } from 'react'

import './App.css'
import PostCreate from './components/PostCreate'
import PostList from './components/PostList'

function App() {


  return (
    <div className='container'>
      <h1>Create post:</h1>
      <PostCreate/>
      <hr />
      <PostList/>
    </div>
  )
}

export default App
