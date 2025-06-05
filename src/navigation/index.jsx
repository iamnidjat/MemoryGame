import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from '../layout'
import GameLogics from '../components/gameLogicsComponent/gameLogics'
import NotFoundPage from '../components/notFoundComponent/notFoundPage'
import Menu from '../components/menuComponent/menu'
import Statistics from '../components/statisticsComponent/statistics'
import Settings from '../components/settingsComponent/settings'
import ChangeLanguage from '../components/changeLanguageComponent/changeLanguage'
import ChangeTheme from '../components/changeThemeComponent/changeTheme'

const RouteNavigator = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Menu />} />
          <Route exact path="/play" element={<GameLogics />} />
          <Route exact path="/stats" element={<Statistics />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/language" element={<ChangeLanguage />} />
          <Route exact path="/theme" element={<ChangeTheme />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default RouteNavigator