import mongoose from 'mongoose';

const achievementSchema = mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    achievementDetail: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Achievement = mongoose.model('Achievement', achievementSchema);
export default Achievement;
