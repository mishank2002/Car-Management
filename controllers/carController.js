const Car = require('../models/Car');

// Create a new car
const createCar = async (req, res) => {
    try {
        const { title, description, tags, images } = req.body;

        const car = new Car({
            title,
            description,
            tags,
            images,
            user: req.user.id, // Get the user ID from the verified token
        });

        await car.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all cars for the logged-in user
const getCars = async (req, res) => {
    try {
        const cars = await Car.find({ user: req.user.id });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single car by ID
const getCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car || car.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Car not found' });
        }

        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a car
const updateCar = async (req, res) => {
    try {
        const { title, description, tags, images } = req.body;

        let car = await Car.findById(req.params.id);

        if (!car || car.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Car not found' });
        }

        car = await Car.findByIdAndUpdate(
            req.params.id,
            { title, description, tags, images },
            { new: true }
        );

        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a car
const deleteCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (!car || car.user.toString() !== req.user.id) {
            return res.status(404).json({ message: 'Car not found' });
        }

        await car.remove();
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search cars by title, description, or tags
const searchCars = async (req, res) => {
    try {
        const { keyword } = req.query; // Get the search keyword from the query parameters

        // Find cars that belong to the user and match the keyword in title, description, or tags
        const cars = await Car.find({
            user: req.user.id,
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { tags: { $regex: keyword, $options: 'i' } }
            ]
        });

        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { createCar, getCars, getCar, updateCar, deleteCar,searchCars };
