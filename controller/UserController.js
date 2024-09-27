const User = require("../userschema");
const bcrypt = require('bcrypt');

// Signup route
const signupuser = async (req, res) => {
    try {
        const { password, ...data } = req.body;

        // Validate password strength here if needed
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        const user = new User({ ...data, password });
        const response = await user.save();
        console.log('Data Saved Successfully');
        res.status(201).json({ response });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
}

// Login user
const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ user: { id: user.id, name: user.name } });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
}

// Update password route (protected)
const updatepass = async (req, res) => {
    const userId = req.params.id;
    const { password } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).send("User not found");
    }

    // If password is correct, proceed to update the password
    user.password = await (password);
    await user.save();
    return res.status(200).send("Password updated successfully");
}

module.exports = { signupuser, loginuser, updatepass };
