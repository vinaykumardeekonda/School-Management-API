module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('schools', [
            {
                name: 'XYZ High School',
                address: '123 XYZ Street',
                latitude: 40.7128,
                longitude: -74.0060,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'ABC Academy',
                address: '456 ABC Avenue',
                latitude: 34.0522,
                longitude: -118.2437,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'School A',
                address: 'Address A',
                latitude: 10.123,
                longitude: 20.123,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'School B',
                address: 'Address B',
                latitude: 11.123,
                longitude: 21.123,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'St. Xavier School',
                address: 'Mumbai, Maharashtra',
                latitude: 19.0760,
                longitude: 72.8777,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Delhi Public School',
                address: 'Delhi',
                latitude: 28.6139,
                longitude: 77.2090,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'National English School',
                address: 'Kolkata, West Bengal',
                latitude: 22.5726,
                longitude: 88.3639,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },
    
    down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('schools', null, {});
    }
}