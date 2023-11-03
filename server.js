const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // for parsing application/json

mongoose.connect('mongodb://0.0.0.0:27017/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const studentSchema = new mongoose.Schema({
  phone: String,
  password: String,
  age: Number,
  address: String,
  bio: String
});

const courseSchema = new mongoose.Schema({
  name: String,
  description: String
});

const Student = mongoose.model('Student', studentSchema);
const Course = mongoose.model('Course', courseSchema);

async function createStudent() {
    const student = new Student({
      phone: '1234567890',
      password: 'password',
      age: 20,
      address: '123 Main St',
      bio: 'I am a student'
    });
  
    const result = await student.save();
    console.log(result);
  }
  
  async function createCourse() {
    const course = new Course({
      name: 'Course 1',
      description: 'Description'
    });
  
    const result = await course.save();
    console.log(result);
  }
  
  createStudent();
  createCourse();

  app.get('/api/students', async (req, res) => {
    const students = await Student.find();
    res.send(students);
  });
  
  app.get('/api/courses', async (req, res) => {
    const courses = await Course.find();
    res.send(courses);
  });
  
  
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
