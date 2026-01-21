import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Orders table to track purchases
export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  stripeSessionId: text("stripe_session_id"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  productId: text("product_id").notNull(),
  productName: text("product_name").notNull(),
  amount: integer("amount").notNull(), // in cents
  currency: text("currency").default("usd"),
  status: text("status").default("pending"), // pending, completed, failed
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Contact messages
export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Product type definitions for frontend use (products come from Stripe)
export interface Product {
  id: string;
  name: string;
  description: string | null;
  metadata: {
    course?: string;
    unit?: string;
    unitNumber?: string;
    available?: string;
    type?: string;
    youtubeUrl?: string;
    podbeanUrl?: string;
  };
  active: boolean;
}

export interface Price {
  id: string;
  unit_amount: number;
  currency: string;
  product: string;
  active: boolean;
}

export interface ProductWithPrice extends Product {
  prices: Price[];
}

// Course definitions
export const COURSES = {
  IGCSE_PE: {
    code: "0413",
    name: "Cambridge IGCSE Physical Education",
    units: [
      { number: 1, name: "Anatomy and physiology", available: true },
      { number: 2, name: "Health, fitness and training", available: false },
      { number: 3, name: "Skill acquisition and psychology", available: false },
      { number: 4, name: "Social, cultural and ethical influences", available: false },
    ],
  },
  AS_LEVEL_SPE: {
    code: "8386",
    name: "Cambridge International AS Level Sport & Physical Education",
    units: [
      { number: 1, name: "Joints, movements and muscles", available: true },
      { number: 2, name: "Biomechanics", available: true },
      { number: 3, name: "The cardiovascular system", available: true },
      { number: 4, name: "The respiratory system", available: false },
      { number: 5, name: "Skill and ability", available: false },
      { number: 6, name: "Theories of learning", available: false },
      { number: 7, name: "Information processing", available: false },
      { number: 8, name: "Practice and learning", available: false },
      { number: 9, name: "Sociocultural issues", available: false },
      { number: 10, name: "Ethics and deviance", available: false },
      { number: 11, name: "Commercialisation and the media", available: false },
      { number: 12, name: "The use of technology", available: false },
    ],
  },
} as const;
