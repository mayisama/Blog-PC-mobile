import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import { AuthRoute } from '@/components/AuthRoute'
import { Suspense } from 'react'
import React from 'react'
// import Home from '@/pages/Home';
// import Article from '@/pages/Article';
// import Publish from '@/pages/Publish';

// 1. lazy函数对组件进行导入
const Home = React.lazy(() => import('@/pages/Home'))
const Article = React.lazy(() => import('@/pages/Article'))
const Publish = React.lazy(() => import('@/pages/Publish'))


const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                index: true,
                element: <Suspense fallback={'加载中'}><Home /></Suspense>,
            },
            {
                path: 'article',
                element: <Suspense fallback={'加载中'}><Article /></Suspense>,
            },
            {
                path: 'publish',
                element: <Suspense fallback={'加载中'}><Publish /></Suspense>,
            },
        ]
    },
    {
        path: '/login',
        element: <Login />,
    }
]);

export default router