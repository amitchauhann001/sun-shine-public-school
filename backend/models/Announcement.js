import mongoose from 'mongoose';

const announcementSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    linkUrl: {
      type: String,
    },
    priority: {
      type: Number,
      default: 1, // 1 is normal, higher number means higher priority/order
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

const Announcement = mongoose.model('Announcement', announcementSchema);
export default Announcement;
