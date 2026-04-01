import asyncHandler from 'express-async-handler';
import Achievement from '../models/Achievement.js';

// @desc    Get all achievements
// @route   GET /api/achievements
// @access  Public
const getAchievements = asyncHandler(async (req, res) => {
  const achievements = await Achievement.find({}).sort('-year -createdAt');
  res.json(achievements);
});

// @desc    Create an achievement
// @route   POST /api/achievements
// @access  Private/Admin
const createAchievement = asyncHandler(async (req, res) => {
  const { studentName, achievementDetail, year } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

  const achievement = new Achievement({
    studentName,
    achievementDetail,
    year,
    imageUrl,
  });

  const createdAchievement = await achievement.save();
  res.status(201).json(createdAchievement);
});

// @desc    Update an achievement
// @route   PUT /api/achievements/:id
// @access  Private/Admin
const updateAchievement = asyncHandler(async (req, res) => {
  const { studentName, achievementDetail, year } = req.body;

  const achievement = await Achievement.findById(req.params.id);

  if (achievement) {
    achievement.studentName = studentName || achievement.studentName;
    achievement.achievementDetail = achievementDetail || achievement.achievementDetail;
    achievement.year = year || achievement.year;
    
    if (req.file) {
      achievement.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedAchievement = await achievement.save();
    res.json(updatedAchievement);
  } else {
    res.status(404);
    throw new Error('Achievement not found');
  }
});

// @desc    Delete an achievement
// @route   DELETE /api/achievements/:id
// @access  Private/Admin
const deleteAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.findById(req.params.id);

  if (achievement) {
    await achievement.deleteOne();
    res.json({ message: 'Achievement removed' });
  } else {
    res.status(404);
    throw new Error('Achievement not found');
  }
});

export { getAchievements, createAchievement, updateAchievement, deleteAchievement };
