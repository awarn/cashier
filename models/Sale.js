const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');

const saleSchema = new mongoose.Schema({
	id: String,
	user: String,
	value: Number,
	currency: String,
	products: Array,
	clientDate: Date,
	serverDate: Date
}, { timestamps: true });

/**
 * ID creation middleware.
 */
saleSchema.pre('save', 'true', function save(next, done) {
	const sale = this;
	if (!sale.id) {
		sale.id = uuidv1();
	}
	if (!sale.serverDate) {
		sale.id = new Date();
	}
	next();
	done();
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
