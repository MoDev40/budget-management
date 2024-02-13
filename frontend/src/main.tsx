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
import { TransDataProvider } from './hooks/TransContext.tsx'
import { AuthProvider } from './hooks/AuthUser.tsx'
import {store} from "../strore/store.ts"
import { Provider } from 'react-redux'
import CategoryPage from './pages/dashboard/CategoryPage.tsx'
import HistoryPage from './pages/dashboard/HistoryPage.tsx'
import UpdateTransaction from './components/transaction/UpdateTransaction.tsx'

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
        path:"/dashboard/configure",
        element:<LandingPage/>
      },
      {
        path:"/dashboard/category",
        element:<CategoryPage/>
      },
      { 
        path:"/dashboard/history",
        element:<HistoryPage/>
      },
      { 
        path:"/dashboard/transaction/:id",
        element:<UpdateTransaction/>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <AuthProvider>
    <TransDataProvider>
    <RouterProvider router={router}/>
    <Toaster/>
    <App />
    </TransDataProvider>
    </AuthProvider>
    </Provider>
  </React.StrictMode>,
)
