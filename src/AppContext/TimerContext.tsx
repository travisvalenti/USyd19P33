// TODO: Make timers persist between sessions
class TimerContext {
  timers: {
    [name: string]: {
      name: string
      startTime: Date
      timeout: NodeJS.Timeout
      callback: (...params: any[]) => any
      timeInMilliseconds: number
    }
  } = {}

  addTimer (name: string, callback: (...params: any[]) => any, timeInMilliseconds: number) {
    if (!!this.timers[name]) throw new Error('Timer is already running')
    const timeout = setTimeout(() => {
      callback()
      this.removeTimer(name)
    }, timeInMilliseconds)
    this.timers[name] = {
      startTime: new Date(),
      name,
      timeout,
      callback,
      timeInMilliseconds
    }
  }

  removeTimer (name: string) {
    if (!this.timers[name]) throw new Error('Timer is not running')
    clearTimeout(this.timers[name].timeout)
    delete this.timers[name]
  }

  addTimeToTimer (name: string, timeInMilliseconds: number) {
    const oldTimer = this.getTimer(name)
    this.removeTimer(oldTimer.name)
    const newTime = oldTimer.timeInMilliseconds + timeInMilliseconds - (new Date().valueOf() - oldTimer.startTime.valueOf())
    this.addTimer(name, oldTimer.callback, newTime)
  }

  setTimerToTime (name: string, timeInMilliseconds: number) {
    const oldTimer = this.getTimer(name)
    this.removeTimer(oldTimer.name)
    this.addTimer(name, oldTimer.callback, timeInMilliseconds)
  }

  getTimer (name: string) {
    if (!this.timers[name]) throw new Error('Timer is not running')
    return this.timers[name]
  }

  isTimerRunning (name: string) {
    return !!this.timers[name]
  }
}

export default TimerContext