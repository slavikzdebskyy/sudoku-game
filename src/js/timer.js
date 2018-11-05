export default class Timer {
  constructor () {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }
  
  updateHours () {
    this.hours += 1;
  }
  
  updateMinutes () {
    if (this.minutes < 59) {
      this.minutes += 1;
    } else {
      this.minutes = 0;
      this.updateHours();
    }
  }
  
  updateSeconds () {
    if (this.seconds < 59) {
      this.seconds += 1;
    } else {
      this.seconds = 0;
      this.updateMinutes();
    }
  }
  
  start ($elem) {
    if ($elem) {
      this.timerStart = setInterval(() => {
        this.updateSeconds();
        $elem.innerText = this.getTimerValue();
      }, 1000);
    }        
  }
  
  pause () {
    clearInterval(this.timerStart);
  }
  
  stop () {
    clearInterval(this.timerStart);
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }
  
  getTimerValue () {
    const min = this.minutes < 10 ? '0' + this.minutes.toString() : this.minutes.toString();
    const sec = this.seconds < 10 ? '0' + this.seconds.toString() : this.seconds.toString();  
    return this.hours.toString() + ':' + min + ':' + sec;
  }
}

// module.exports = Timer;

   
   