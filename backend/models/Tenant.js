// Tenant.js
import mongoose from "mongoose";

const TenantSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Acme"
  slug: { type: String, required: true, unique: true }, // e.g. "acme"
  plan: { type: String, enum: ['free','pro'], default: 'free' },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.model('Tenant', TenantSchema);