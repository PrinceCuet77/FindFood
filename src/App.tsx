import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import RootPage from './components/pages/RootPage'
import ErrorPage from './components/pages/ErrorPage'
import HomePage from './components/pages/HomePage'
import PostsPage from './components/pages/PostsPage'
import LoginPage from './components/pages/LoginPage'
import SignupPage from './components/pages/SignupPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      { path: 'posts', element: <PostsPage /> },
      // { path: 'products/:productId', element: <ProductDetailPage /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
