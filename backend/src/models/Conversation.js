import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
    enum: ["user", "bot"],
  },
  text: {
    type: String,
    required: [true, "Message text is required"],
    maxlength: [5000, "Message cannot exceed 5000 characters"],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  sources: [
    {
      title: String,
      relevance: Number,
    },
  ],
});

const conversationSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    messages: [messageSchema],
    userIp: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries (sessionId already has unique index)
conversationSchema.index({ startTime: -1 });
conversationSchema.index({ isActive: 1, lastActivity: -1 });

// Update lastActivity on message push
conversationSchema.methods.addMessage = function (messageData) {
  this.messages.push(messageData);
  this.lastActivity = new Date();
  return this.save();
};

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
