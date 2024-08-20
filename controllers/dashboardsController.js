const mongoose = require('mongoose');

const getData = async (req, res) => {
    const allData = await mongoose.connection.db.collection('shopifyCustomers').find({}).toArray();
    res.json(allData);
}

module.exports = {
    getData
}