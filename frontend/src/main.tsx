import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Toaster } from "@/components/ui/sonner"
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/Auth/LoginPage.tsx'
import SignupPage from './pages/Auth/SignupPage.tsx'
import DashboardPage from './pages/dashboard/DashboardPage.tsx'
import ProfilePage from './pages/dashboard/ProfilePage.tsx'
import HomePage from './pages/HomePage.tsx'
import LandingPage from './pages/dashboard/LandingPage.tsx'
import { DateDataProvider } from './hooks/DateContext.tsx'
import { AuthProvider } from './hooks/AuthUser.tsx'
import {store} from "../strore/store.ts"
import { Provider } from 'react-redux'
import CategoryPage from './pages/dashboard/CategoryPage.tsx'

const router = createBrowserRouter([
  {
  path:'/',
  element:<HomePage/>
  },
  {
    path:"/login",
    element:<LoginPage/>
  },
  {
    path:"/signup",
    element:<SignupPage/>
  },
  {
    path:"/dashboard",
    element:<DashboardPage/>,
    children:[
      {
        path:"/dashboard/profile",
        element:<ProfilePage/>
      },
      {
        path:"/dashboard/landing",
        element:<LandingPage/>
      },
      {
        path:"/dashboard/category",
        element:<CategoryPage/>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthProvider>
    <DateDataProvider>
    <RouterProvider router={router}/>
    <Toaster/>
    <App />
    </DateDataProvider>
    </AuthProvider>
    </Provider>
  </React.StrictMode>,
)
