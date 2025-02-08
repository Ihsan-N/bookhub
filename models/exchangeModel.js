const mongoose = require('mongoose');

const exchangeSchema = mongoose.Schema(
  {
    requester: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    }, // User requesting the exchange
    
    requestedBook: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Book', 
      required: true 
    }, // The book they want
    
    offeredBook: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Book', 
      required: true 
    }, // The book they are offering
    
    status: { 
      type: String, 
      enum: ['Pending', 'Accepted', 'Rejected', 'Completed'], 
      default: 'Pending' 
    }, // Status of the exchange
    
    exchangedAt: { type: Date } // Date when the exchange is completed
  },
  { timestamps: true }
);

module.exports = mongoose.model('Exchange', exchangeSchema);
