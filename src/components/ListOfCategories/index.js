import React, { useEffect, useState } from 'react'
import { Category } from '../Category'
import { List, Item } from './styles'

function useCategoriesData() {
  const [categories, setCategories] = useState(Array(1).fill({}))
  const [loading, setLoading] = useState(true)

  useEffect(function () {        
    setLoading(true)
    setTimeout(() => {
      fetch('https://petgram-server-acasas.now.sh/categories')
        .then(rslt => rslt.json())
        .then(json => {
          setCategories(json)
          setLoading(false)
        })
    }, 2000)
    }, [])

    return { categories, loading }
}

export const ListOfCategories = () => {
  const { categories, loading } = useCategoriesData();
  const [showFixed, setShowFixed] = useState(false)
  
    useEffect(function () {
      const onScroll = e => {
        const newShowFixed = window.scrollY > 200
        showFixed !== newShowFixed && setShowFixed(newShowFixed)
      }
  
      document.addEventListener('scroll', onScroll)
  
      return () => document.removeEventListener('scroll', onScroll)
    }, [showFixed])
  
    const renderList = (fixed) => (
      <List fixed={fixed}>
        {
          categories.map((category, i) => {
            return (
              <Item key={category.id || i}>
                <Category {...category} loading={loading.toString()} />
              </Item>
            )
          })
        }
      </List>
    )
  
    return (
      <>
        {renderList(false, loading)}
        {showFixed && renderList(true, loading)}
      </>
    )
  }