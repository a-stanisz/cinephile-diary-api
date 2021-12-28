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