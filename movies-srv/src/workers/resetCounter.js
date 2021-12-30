const User = require('../models/user');

const triggerReset = async () => {
  const currentTime = new Date();
  const firstDayNextMonth = () => {
    const date = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth() + 1);
    return date;
  }
  const triggerTime = firstDayNextMonth();
  console.log(`Usage limits counters reset will be triggered at${triggerTime.toISOString()}`)
  try {
    setTimeout(async () => {
      const basicUsers = await User.find({ userRole: 'basic' })
          if (basicUsers) {
            for (let user of basicUsers) {
              user.resetCounter;
              console.log('counters reseted!')
            }
          }
    }, triggerTime - currentTime)
  }  catch (err) {
    console.error('Failing resetting basic users counters!');
  }
}

module.exports = triggerReset;