import { useState } from 'react'
import './App.css'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import CategoriesTabsPage from './components/CategoriesTabsPage'
import SubCategoriesList from './components/SubCategoriesList'
import LoginPage from './components/LogInPage'
import HomePage from './components/HomePage'
import History from './components/History'
import PromptResult from './components/PromptResult'
import AllPrompts from './components/Admin'
function App() {
  return (
    <>
      <BrowserRouter>
        <div id='navDiv'>
          <nav>
          <NavLink to="/HomePage" activeclassname="active">HomePage</NavLink>
            <NavLink to="/Login" activeclassname="active">Login</NavLink>
            <NavLink to="/register" activeclassname="active">Register</NavLink>
            {/* <NavLink to="/admin" activeclassname="active">admin</NavLink> */}
          </nav>
        </div>
        <div>
          <Routes>
          <Route path='/HomePage' element={<HomePage />} />
            <Route path='/Login' element={<LoginPage />} />
            <Route path='/register' element={<Register />} />
            <Route path='/categories' element={<CategoriesTabsPage />} />
            <Route path='/SubCategory' element={<SubCategoriesList />} />
            <Route path='/History' element={<History />} />
            <Route path='/prompt-result' element={<PromptResult />} />
             <Route path='admin' element={<AllPrompts />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App