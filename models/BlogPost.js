const mongoose = require("mongoose");
const Schema = mongoose.Schema;



/*************Mongoose Blog Post Model ****************/
const BlogPostSchema = new Schema({
  title: {
    type: String,

  },
  body: {
    type: String,
    required: true
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  datePosted: {
    type: Date,
    default: new Date()
  },
  image: String
});






const BlogPost = mongoose.model("BlogPost", BlogPostSchema);



module.exports = BlogPost;