const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    mobile: {
        type: String, 
        required: false,
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hash password before saving
userschema.pre('save', async function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (err) {
        next(err); 
    }
});

// Compare password method
userschema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userschema);
module.exports = User;
