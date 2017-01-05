import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/react-db');
let Schema = mongoose.Schema;

let todoSchema = new Schema({
    text: String,
    created: {type: Date, default: Date.now}
});

mongoose.model('Todo', todoSchema);