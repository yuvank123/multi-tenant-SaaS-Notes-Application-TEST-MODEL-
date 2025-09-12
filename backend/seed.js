//seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Tenant from "./models/Tenant.js";
import User from "./models/User.js";

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await Tenant.deleteMany({});
  await User.deleteMany({});

  // Create tenants
  const acme = await Tenant.create({ name: "Acme", slug: "acme", plan: "free" });
  const globex = await Tenant.create({ name: "Globex", slug: "globex", plan: "free" });

  const passwordHash = await bcrypt.hash("password", 10);

  // Create predefined users
  await User.insertMany([
    { email: "admin@acme.test", passwordHash, role: "admin", tenantId: acme._id },
    { email: "user@acme.test", passwordHash, role: "member", tenantId: acme._id },
    { email: "admin@globex.test", passwordHash, role: "admin", tenantId: globex._id },
    { email: "user@globex.test", passwordHash, role: "member", tenantId: globex._id },
  ]);

  console.log("Seed complete");
  process.exit();
}

seed();
