import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

userSchema.statics.findByCredentials = async function (username, password) {
  const user = await this.findOne({ username });
  if (!user) {
    throw new Error('Invalid username or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid username or password');
  }

  return user;
};

const User = mongoose.model('User', userSchema);
export default User;