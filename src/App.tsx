import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import router from './routes/router';


// const API_URL = 'https://api.unsplash.com/photos';
// const SECTRET_KEY = '6LBL56QUAYTjKg06efgxabqdpkxwPQVi6fQjUF1Ux2E' 


function App() {
  return (
    <div>
        <RouterProvider router={createBrowserRouter(router)}/>
    </div>
  )
}

export default App
