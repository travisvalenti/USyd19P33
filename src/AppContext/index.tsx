import React from 'react'
import TimerContext from './TimerContext'

export interface AppContextType {
  timerContext: TimerContext
}

const AppContext = React.createContext<AppContextType | undefined>(undefined)

export default AppContext
