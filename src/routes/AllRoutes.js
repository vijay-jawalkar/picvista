import React from 'react'
import { Route, Routes } from 'react-router'
import { LogIn, Register, Profile, Edit, Add, Feed, Show, PostDetail, PageNotFound } from '../pages'


export default function AllRoutes() {
  return (
    <>
    <Routes>
        <Route path='/' element = { <LogIn/> } />
        <Route path='/register' element = { <Register/> } />
        <Route path='/profile' element = { <Profile/> } />
        <Route path='/edit' element = { <Edit/> } />
        <Route path='/add' element = { <Add/> } />
        <Route path='/feed' element = { <Feed/> } />
        <Route path='/show' element = { <Show/> } />
        <Route path='/post-detail/:postId' element = { <PostDetail/> } />
        <Route path='*' element = { <PageNotFound/> } />
    </Routes>
    </>
  )
}
