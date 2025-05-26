import React from "react"
import TopHeader from "../elements/top-header"
import Navbar from "../elements/navbar"

const Header = () => {
  return (
    <header className="border-b border-primary-content/80 dark:border-primary-content/20">
      <TopHeader />
      <Navbar />
    </header>
  )
}

export default Header
