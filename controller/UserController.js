const User = require("../userschema"); 
const slugify = require('slugify');

// Signup route
const signupuser = async (req, res) => {
    try {
        const data = req.body;
        const user = new User(data);
        const response = await user.save();
        console.log('Data Saved Successfully');
        res.status(200).json(response);
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
    try {
        const userId = req.user.id; 
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if old password matches
        if (!(await user.comparePassword(oldPassword))) {
            return res.status(401).json({ message: 'Old password is incorrect' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.log('Error updating password:', err);
        res.status(500).json({ error: 'Failed to update password' });
    }
}

module.exports = { signupuser, updatepass, loginuser };
