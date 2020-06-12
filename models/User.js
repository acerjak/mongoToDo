const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true
  },
  items: [{
    text: {
      type: String,
      required: true
    },
    isDone: {
      type: Boolean,
      required: true
    },
    time: {
      type: Number,
      required: true
    }
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
})

userSchema.virtual('totalTime').get(function () {
  return this.items.reduce((t, item) => t + item.time, 0)
})

module.exports = model('User', userSchema)
