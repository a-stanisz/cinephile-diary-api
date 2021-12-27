// class User {
//   constructor(_id, name, role) {
//     this.data = { _id, name, role }
//   }
//   get role() {
//     return this.data.role;
//   }

// }

// const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      required: true,
    },
    diaryEntries: [{
      type: Schema.Types.ObjectId,
      ref: 'Movie',
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);


// console.log(Object.keys(userSchema.schema.paths));