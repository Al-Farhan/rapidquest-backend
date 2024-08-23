const mongoose = require('mongoose');

const getOrdersData = async (req, res) => {
    const interval = req.query.interval || 'daily';

    let group;
    if (interval === 'monthly') {
        group = { year: { $year: {$toDate: "$created_at"}}, month: { $month: {$toDate: "$created_at"}}};
    } else if (interval === 'quarterly') {
        group = { year: { $year: {$toDate: "$created_at"} }, quarter: { $ceil: { $divide: [{ $month: {$toDate: "$created_at"} }, 3]}}};
    } else if (interval === 'yearly') {
        group = { year: { $year: {$toDate: "$created_at"}} };
    } else {
        group = { year: { $year: {$toDate: "$created_at"}}, month: { $month: {$toDate: "$created_at"} }, day: { $dayOfMonth: {$toDate: "$created_at"} } };
    }

    const salesData = await mongoose.connection.db.collection('shopifyOrders').aggregate([
        { $group: {_id: group, totalSales: { $sum: {$toDouble: "$total_price_set.presentment_money.amount"}}}},
        { $sort: {"_id.year": 1, "_id.month": 1, "_id.day": 1}}
    ]).toArray();

    res.status(200).json(salesData);
}

module.exports = {
    getOrdersData
}