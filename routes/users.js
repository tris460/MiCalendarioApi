const express = require("express");
const _ = require('underscore');
const app = express();
const User = require('../models/users');
const bcrypt = require('bcrypt');

/**
 * This function allows the validation of an user's email & pin
 */
app.put('/login', async (req, res) => {
  const { email, pin } = req.body;

  try {
    // Get the user in the database by their email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    if (pin === null && user.pin === null) {
      return res.status(200).json({ message: 'Valid credentials', data: user });
    }if (pin !== null && user.pin !== null) {
        // Compares the PIN stored in the database with the PIN provided
        bcrypt.compare(pin.toString(), user.pin, (err, result) => {
          if (err || !result) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }
          // If the credentials are valid, returns the user data
          return res.status(200).json({ message: 'Valid credentials', data: user });
        });
    }else{
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {

    return res.status(500).json({ error: 'Server error' });
  }
});

/**
 * This function returns the info of an user
 */
app.get('/user', async (req, res) => {
  const email = req.query.email;

  try {
    // Get the user in DB by its email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ data: user });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Function to get all users
 */
app.get('/users', (req, res) => {
  User.find({})
    .then(users => {
      res.json({
        ok: true,
        msg: 'Users retrieved successfully',
        length: users.length,
        data: users
      });
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        msg: 'Error retrieving users',
        error: err
      });
    });
});

/**
 * Function to create a new user
 */
app.post('/users', (req, res) => {
  let user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    pin: req.body.pin,
    sex: req.body.sex,
    role: req.body.role,
    symptoms: req.body.symptoms,
    pet: req.body.pet,
    doctor: req.body.doctor,
    license: req.body.license,
    profession: req.body.profession,
    description: req.body.description,
    cost: req.body.cost,
    patients: req.body.patients,
    officeAddress: req.body.officeAddress,
    appointments: req.body.appointments
  });
  if (user.pin === null) {
    user.save()
        .then(savedUser => {
          res.json({
            ok: true,
            msg: 'User saved successfully',
            data: savedUser
          });
        })
        .catch(err => {
          return res.status(400).json({
            ok: false,
            msg: 'Error saving user',
            error: err
          });
        });
  }if (user.pin !== null) {
    const pinAsString = req.body.pin.toString();
    // Generate a salt and then hash the PIN
    bcrypt.genSalt(10, (err, salt) => {
      console.log(salt);
      if (err) {
        return res.status(500).json({ error: 'Error generating salt' });
      }
      bcrypt.hash(pinAsString, salt, (err, hash) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Error generating hash' });
        }
        user.pin = hash; // Assign the hash instead of the original PIN
        user.save()
          .then(savedUser => {
            res.json({
              ok: true,
              msg: 'User saved successfully',
              data: savedUser
            });
          })
          .catch(err => {
            return res.status(400).json({
              ok: false,
              msg: 'Error saving user',
              error: err
            });
          });
      });
    });
  }
});

/**
 * Function to update an user
 */
app.put("/users/:id", function(req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ['fullName', 'email', 'pin', 'sex', 'role', 'symptoms', 'pet', 'doctor', 'license',
   'profession', 'description', 'cost', 'patients', 'officeAddress', 'appointments']);
   body.pin = body.pin !== undefined ? body.pin : null;

   if (body.pin !== null) {
    const pinAsString = body.pin.toString();
    // Generate a salt and then hash the PIN
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.status(500).json({ error: 'Error generating salt' });
      }
      bcrypt.hash(pinAsString, salt, (err, hash) => {
        if (err) {
          return res.status(500).json({ error: 'Error generating hash' });
        }
        body.pin = hash; // Assign the hash instead of the original PIN
        updateUser(id, body, res);
      });
    });
  } else {
    updateUser(id, body, res);
  }
});

function updateUser(id, body, res) {
  User.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' })
    .then(updatedUser => {
      res.json({
        ok: true,
        msg: 'User updated successfully',
        data: updatedUser
      });
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        msg: 'Error updating user',
        error: err
      });
    });
}

/**
 * Function to update the pet of a user
 */
app.put("/users/:id/pet", function(req, res) {
  let id = req.params.id;
  let newPet = req.body.pet; 

  User.findByIdAndUpdate(id, { pet: newPet }, { new: true, runValidators: true, context: 'query' })
    .then(updatedUser => {
      res.json({
        ok: true,
        msg: 'Pet updated successfully',
        data: updatedUser
      });
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        msg: 'Error updating pet',
        error: err
      });
    });
});

/**
 * Function to add a symptom record to a user
 */
app.post('/users/:id/symptoms', async (req, res) => {
  const userId = req.params.id;
  const newSymptomData = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.symptoms.push(newSymptomData);

    const updatedUser = await user.save();

    return res.status(200).json({
      msg: 'Symptom record added successfully',
      data: updatedUser,
    });
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Function to delete an user by its ID
 */
app.delete("/users/:id", function(req, res) {
  let id = req.params.id;

  User.findByIdAndUpdate(id, { status: false }, { new: true, runValidators: true, context: 'query' })
    .then(deletedUser => {
      res.json({
        ok: true,
        msg: 'User deleted successfully',
        data: deletedUser
      });
    })
    .catch(err => {
      return res.status(400).json({
        ok: false,
        msg: 'Error deleting user',
        error: err
      });
    });
});

/**
 * Function to get symptoms by date for a specific user
 */
app.get('/users/:id/symptoms', async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userSymptoms = user.symptoms.filter(symptom => { return symptom.date === date });

    if (userSymptoms.length === 0) {
      return res.status(404).json({ error: 'No symptoms found for the specified date' });
    }

    return res.status(200).json({ data: userSymptoms });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

/**
 * Function to get all symptoms for a specific user
 */
app.get('/users/:id/symptoms/all', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userSymptoms = user.symptoms;

    return res.status(200).json({ data: userSymptoms });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = app;