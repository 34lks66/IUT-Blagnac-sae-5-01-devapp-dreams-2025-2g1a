const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
  jti: { type: String, required: true, unique: true }, // JWT ID
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  expiresAt: { type: Date, required: true },
  revoked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Optionnel  pour supprimer automatiquement après expiry
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);
