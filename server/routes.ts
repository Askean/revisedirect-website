import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getUncachableStripeClient, getStripePublishableKey } from "./stripeClient";
import { insertContactMessageSchema, type ProductWithPrice } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Get Stripe publishable key for frontend
  app.get("/api/stripe/publishable-key", async (req, res) => {
    try {
      const key = await getStripePublishableKey();
      res.json({ publishableKey: key });
    } catch (error: any) {
      console.error("Error getting Stripe publishable key:", error);
      res.status(500).json({ error: "Failed to get Stripe configuration" });
    }
  });

  // List products with prices
  app.get("/api/products-with-prices", async (req, res) => {
    try {
      const rows = await storage.listProductsWithPrices();

      const productsMap = new Map<string, ProductWithPrice>();
      for (const row of rows as any[]) {
        if (!productsMap.has(row.product_id)) {
          productsMap.set(row.product_id, {
            id: row.product_id,
            name: row.product_name,
            description: row.product_description,
            active: row.product_active,
            metadata: row.product_metadata || {},
            prices: []
          });
        }
        if (row.price_id) {
          productsMap.get(row.product_id)!.prices.push({
            id: row.price_id,
            unit_amount: row.unit_amount,
            currency: row.currency,
            product: row.product_id,
            active: row.price_active,
          });
        }
      }

      res.json(Array.from(productsMap.values()));
    } catch (error: any) {
      console.error("Error listing products:", error);
      res.status(500).json({ error: "Failed to list products" });
    }
  });

  // List all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.listProducts();
      res.json({ data: products });
    } catch (error: any) {
      console.error("Error listing products:", error);
      res.status(500).json({ error: "Failed to list products" });
    }
  });

  // List all prices
  app.get("/api/prices", async (req, res) => {
    try {
      const prices = await storage.listPrices();
      res.json({ data: prices });
    } catch (error: any) {
      console.error("Error listing prices:", error);
      res.status(500).json({ error: "Failed to list prices" });
    }
  });

  // Create checkout session
  app.post("/api/checkout", async (req, res) => {
    try {
      const { priceId } = req.body;

      if (!priceId) {
        return res.status(400).json({ error: "Price ID is required" });
      }

      const stripe = await getUncachableStripeClient();
      
      // Get the price to find the product
      const price = await storage.getPrice(priceId);
      if (!price) {
        return res.status(404).json({ error: "Price not found" });
      }

      // Get product details
      const product = await storage.getProduct(price.product);
      
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/checkout/cancel`,
        metadata: {
          productId: price.product,
          productName: product?.name || "Unknown Product",
        },
      });

      // Create order record
      await storage.createOrder({
        email: session.customer_email || "",
        stripeSessionId: session.id,
        productId: price.product,
        productName: product?.name || "Unknown Product",
        amount: price.unit_amount,
        currency: price.currency,
        status: "pending",
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ success: true, message });
    } catch (error: any) {
      console.error("Error creating contact message:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid form data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  return httpServer;
}
