import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient , QueryClientProvider } from "@tanstack/react-query"
import Quote from "./pages/Quote"
import Layout  from "./pages/Layout"
import NoPage from "./pages/NoPage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Logout from "./pages/Logout"
import { checkAuthStatus } from "./store/authSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "./store/store"
import { useEffect } from "react"
export default function App() {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
        dispatch(checkAuthStatus())
    }, [dispatch])
  return (
        <>
            <QueryClientProvider client={new QueryClient({defaultOptions:{queries:{refetchOnWindowFocus:false}}})}>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Quote />} />
                        <Route path="quote" element={<Quote />} />
                        <Route path="login" element={<Login />} />
                        <Route path="logout" element={<Logout/>}/>
                        <Route path="signup" element={<Signup />} />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </Router>
            </QueryClientProvider>
        </>
    )
}