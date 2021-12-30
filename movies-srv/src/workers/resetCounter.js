const User = require('../models/user');

const triggerReset = async () => {
  const currentTime = new Date();
  const lastMinuteofMonth = () => {
    const date = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth() + 1);
    // date.setMinutes(59);
    return date;
  }
  const triggerTime = lastMinuteofMonth();
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



// const currentTime = 10;
// const triggerTime = 10;

// const reset = async () => {
//   try {
//     // const wait = () => {
//       setTimeout(async () => {
//         if (currentTime >= triggerTime) {
//           console.log('2 step')
//           const basicUsers = await User.find({ userRole: 'basic' })
//           if (basicUsers) {
//             for (let user of basicUsers) {
//               user.resetCounter;
//               console.log('counters reseted')
//             }
//           }
//           // if (User) {
//           // const basicUsers = await User.find({ userRole: 'basic' })
//           // for (user of basicUsers) {
//           //   user.resetCounter();
//           //   }
//           // }
//           // User.updateMany({ userRole: 'basic' }, User.resetCounter());
//           // for (let user of (await User.find({ userRole: 'basic' }))) {
//           //   user.resetCounter();
//           // }
//         } else {
//           console.log('IT WORKS AND WAITING!')
//           reset();
//         }
//       }, 1000 * 30);
//     // }
//   } catch (err) {
//     console.error('Failing resetting basic users counters!');
//   }
// }

module.exports = triggerReset;