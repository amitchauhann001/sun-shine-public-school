import asyncHandler from 'express-async-handler';
import Announcement from '../models/Announcement.js';

// @desc    Get all active announcements
// @route   GET /api/announcements
// @access  Public
const getAnnouncements = asyncHandler(async (req, res) => {
  const announcements = await Announcement.find({ isActive: true }).sort('-priority -createdAt');
  res.json(announcements);
});

// @desc    Get all announcements (for admin panel)
// @route   GET /api/announcements/admin
// @access  Private/Admin
const getAnnouncementsAdmin = asyncHandler(async (req, res) => {
  const announcements = await Announcement.find({}).sort('-createdAt');
  res.json(announcements);
});

// @desc    Create an announcement
// @route   POST /api/announcements
// @access  Private/Admin
const createAnnouncement = asyncHandler(async (req, res) => {
  const { text, linkUrl, priority, isActive } = req.body;

  const announcement = new Announcement({
    text,
    linkUrl,
    priority: priority || 1,
    isActive: isActive !== undefined ? isActive : true,
  });

  const createdAnnouncement = await announcement.save();
  res.status(201).json(createdAnnouncement);
});

// @desc    Update an announcement
// @route   PUT /api/announcements/:id
// @access  Private/Admin
const updateAnnouncement = asyncHandler(async (req, res) => {
  const { text, linkUrl, priority, isActive } = req.body;

  const announcement = await Announcement.findById(req.params.id);

  if (announcement) {
    announcement.text = text || announcement.text;
    announcement.linkUrl = linkUrl || announcement.linkUrl;
    announcement.priority = priority !== undefined ? priority : announcement.priority;
    announcement.isActive = isActive !== undefined ? isActive : announcement.isActive;

    const updatedAnnouncement = await announcement.save();
    res.json(updatedAnnouncement);
  } else {
    res.status(404);
    throw new Error('Announcement not found');
  }
});

// @desc    Delete an announcement
// @route   DELETE /api/announcements/:id
// @access  Private/Admin
const deleteAnnouncement = asyncHandler(async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);

  if (announcement) {
    await announcement.deleteOne();
    res.json({ message: 'Announcement removed' });
  } else {
    res.status(404);
    throw new Error('Announcement not found');
  }
});

export { getAnnouncements, getAnnouncementsAdmin, createAnnouncement, updateAnnouncement, deleteAnnouncement };
