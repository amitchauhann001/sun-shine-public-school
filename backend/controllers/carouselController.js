import asyncHandler from 'express-async-handler';
import Carousel from '../models/Carousel.js';

// @desc    Get all active carousel items
// @route   GET /api/carousel
// @access  Public
const getCarousels = asyncHandler(async (req, res) => {
  const carousels = await Carousel.find({ isActive: true }).sort('order');
  res.json(carousels);
});

// @desc    Get all carousel items (for admin panel)
// @route   GET /api/carousel/admin
// @access  Private/Admin
const getCarouselsAdmin = asyncHandler(async (req, res) => {
  const carousels = await Carousel.find({}).sort('order');
  res.json(carousels);
});

// @desc    Create a carousel item
// @route   POST /api/carousel
// @access  Private/Admin
const createCarousel = asyncHandler(async (req, res) => {
  const { title, order, isActive } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

  if (!imageUrl) {
    res.status(400);
    throw new Error('Image is required');
  }

  const carousel = new Carousel({
    title,
    imageUrl,
    order: order || 0,
    isActive: isActive !== undefined ? isActive : true,
  });

  const createdCarousel = await carousel.save();
  res.status(201).json(createdCarousel);
});

// @desc    Delete a carousel item
// @route   DELETE /api/carousel/:id
// @access  Private/Admin
const deleteCarousel = asyncHandler(async (req, res) => {
  const carousel = await Carousel.findById(req.params.id);

  if (carousel) {
    await carousel.deleteOne();
    res.json({ message: 'Carousel item removed' });
  } else {
    res.status(404);
    throw new Error('Carousel item not found');
  }
});

// @desc    Update a carousel item
// @route   PUT /api/carousel/:id
// @access  Private/Admin
const updateCarousel = asyncHandler(async (req, res) => {
  const { title, order, isActive } = req.body;
  const carousel = await Carousel.findById(req.params.id);

  if (carousel) {
    carousel.title = title || carousel.title;
    carousel.order = order !== undefined ? order : carousel.order;
    carousel.isActive = isActive !== undefined ? isActive : carousel.isActive;

    if (req.file) {
      // Typically, here we might also delete the old file from the server
      carousel.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedCarousel = await carousel.save();
    res.json(updatedCarousel);
  } else {
    res.status(404);
    throw new Error('Carousel item not found');
  }
});

export { getCarousels, getCarouselsAdmin, createCarousel, deleteCarousel, updateCarousel };
