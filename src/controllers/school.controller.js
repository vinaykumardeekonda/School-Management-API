const db = require('../models');
const School = db.School;

const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; 
}

exports.addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        if (!name || !address || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ message: "Latitude and Longitude must be valid numbers." });
        }

        const newSchool = await School.create({ name, address, latitude, longitude });

        res.status(200).json({ message: "School created successfully."});
    } catch (error) {
        res.status(500).json({ message: "Error while creating school: " + error });
    }
};

exports.deleteSchool = async (req, res) => {
    try {
        const { id } = req.params;
        const school = await School.findByPk(id);

        if (!school) {
            return res.status(404).json({ message: "Error: School not found." });
        }

        await school.destroy();

        res.status(200).json({ message: 'School deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error while deleting school: ' + error });
    }
};

exports.getSchoolById = async (req, res) => {
    try {
        const { id } = req.params;
        const school = await School.findByPk(id);

        if (!school) {
            return res.status(404).json({ message: `School with ID ${id} not found` });
        }

        res.status(200).json(school);
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching school: ' + error });
    }
};

exports.getAllSchools = async (req, res) => {
    try {
        const { lat, lng } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({ message: 'Latitude and Longitude are required' });
        }

        const userLat = parseFloat(lat);
        const userLng = parseFloat(lng);

        if (isNaN(userLat) || isNaN(userLng)) {
            return res.status(400).json({ message: 'Invalid latitude or longitude values' });
        }

        const schools = await School.findAll();

        if (schools.length === 0) {
            return res.status(404).json({ message: 'No schools found in the database' });
        }

        const schoolsWithDistance = schools.map(school => {
            const distance = haversineDistance(userLat, userLng, school.latitude, school.longitude);
            return {
                ...school.dataValues,
                distance
            };
        });

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).json(schoolsWithDistance);
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching schools: ' + error });
    }
};

exports.updateSchool = async (req, res) => {
    try {
        const { id } = req.params;
        const { address, latitude, longitude } = req.body;

        if (!address && latitude === undefined && longitude === undefined) {
            return res.status(400).json({ message: 'At least one field (address, latitude, or longitude) must be provided for update.' });
        }

        const school = await School.findByPk(id);

        if (!school) {
            return res.status(404).json({ message: 'School not found' });
        }

        await school.update({ address, latitude, longitude });

        res.status(200).json({ message: 'School updated successfully', data: school });
    } catch (error) {
        res.status(500).json({ message: 'Error updating school: ' + error });
    }
};
