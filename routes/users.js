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
    // Obtén el usuario en la base de datos por su email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    console.log('Datos del usuario encontrado:', user);
    // Compara el PIN almacenado en la base de datos con el PIN proporcionado
    bcrypt.compare(pin.toString(), user.pin, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Si las credenciales son válidas, devuelve los datos del usuario
      return res.status(200).json({ message: 'Valid credentials', data: user });
    });
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
console.log(user.pin);
const pinAsString = req.body.pin.toString();
  // Genera un salt y luego hashea el PIN
  bcrypt.genSalt(10, (err, salt) => {
    console.log(salt);
    if (err) {
      return res.status(500).json({ error: 'error al generar salt' });
    }
    bcrypt.hash(pinAsString, salt, (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'error al generar hash' });
      }
      user.pin = hash; // Asigna el hash en lugar del PIN original
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
});


/**
 * Function to update an user
 */
app.put("/users/:id", function(req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ['fullName', 'email', 'pin', 'sex', 'role', 'symptoms', 'pet', 'doctor', 'license',
   'profession', 'description', 'cost', 'patients', 'officeAddress', 'appointments']);

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
});

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


module.exports = app;