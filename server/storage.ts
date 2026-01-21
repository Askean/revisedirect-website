import { orders, contactMessages, type InsertOrder, type InsertContactMessage, type Order, type ContactMessage } from "@shared/schema";
import { eq, sql } from "drizzle-orm";
import { db } from "./db";
import { randomUUID } from "crypto";

export interface IStorage {
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
  getOrderBySessionId(sessionId: string): Promise<Order | undefined>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;

  // Contact messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;

  // Stripe data queries (from stripe schema)
  getProduct(productId: string): Promise<any>;
  listProducts(active?: boolean, limit?: number, offset?: number): Promise<any[]>;
  listProductsWithPrices(active?: boolean, limit?: number, offset?: number): Promise<any[]>;
  getPrice(priceId: string): Promise<any>;
  listPrices(active?: boolean, limit?: number, offset?: number): Promise<any[]>;
  getPricesForProduct(productId: string): Promise<any[]>;
}

export class DatabaseStorage implements IStorage {
  // Orders
  async createOrder(order: InsertOrder): Promise<Order> {
    const [created] = await db.insert(orders).values(order).returning();
    return created;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async getOrderBySessionId(sessionId: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.stripeSessionId, sessionId));
    return order;
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const [order] = await db.update(orders).set({ status }).where(eq(orders.id, id)).returning();
    return order;
  }

  // Contact messages
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [created] = await db.insert(contactMessages).values(message).returning();
    return created;
  }

  // Stripe data queries
  async getProduct(productId: string) {
    const result = await db.execute(
      sql`SELECT * FROM stripe.products WHERE id = ${productId}`
    );
    return result.rows[0] || null;
  }

  async listProducts(active = true, limit = 20, offset = 0) {
    const result = await db.execute(
      sql`SELECT * FROM stripe.products WHERE active = ${active} LIMIT ${limit} OFFSET ${offset}`
    );
    return result.rows;
  }

  async listProductsWithPrices(active = true, limit = 20, offset = 0) {
    // First try the database
    const result = await db.execute(
      sql`
        WITH paginated_products AS (
          SELECT id, name, description, metadata, active
          FROM stripe.products
          WHERE active = ${active}
          ORDER BY id
          LIMIT ${limit} OFFSET ${offset}
        )
        SELECT 
          p.id as product_id,
          p.name as product_name,
          p.description as product_description,
          p.active as product_active,
          p.metadata as product_metadata,
          pr.id as price_id,
          pr.unit_amount,
          pr.currency,
          pr.recurring,
          pr.active as price_active,
          pr.metadata as price_metadata
        FROM paginated_products p
        LEFT JOIN stripe.prices pr ON pr.product = p.id AND pr.active = true
        ORDER BY p.id, pr.unit_amount
      `
    );
    
    // If database is empty, fetch from Stripe API directly (fallback)
    if (result.rows.length === 0) {
      return this.fetchProductsFromStripeAPI();
    }
    
    return result.rows;
  }
  
  // Fallback method to fetch from Stripe API directly
  private async fetchProductsFromStripeAPI() {
    try {
      const { getUncachableStripeClient } = await import('./stripeClient');
      const stripe = await getUncachableStripeClient();
      
      const products = await stripe.products.list({ active: true, limit: 100 });
      const prices = await stripe.prices.list({ active: true, limit: 100 });
      
      const pricesByProduct = new Map<string, any[]>();
      for (const price of prices.data) {
        const productId = typeof price.product === 'string' ? price.product : price.product.id;
        if (!pricesByProduct.has(productId)) {
          pricesByProduct.set(productId, []);
        }
        pricesByProduct.get(productId)!.push(price);
      }
      
      const rows: any[] = [];
      for (const product of products.data) {
        const productPrices = pricesByProduct.get(product.id) || [];
        if (productPrices.length === 0) {
          rows.push({
            product_id: product.id,
            product_name: product.name,
            product_description: product.description,
            product_active: product.active,
            product_metadata: product.metadata,
            price_id: null,
            unit_amount: null,
            currency: null,
            recurring: null,
            price_active: null,
          });
        } else {
          for (const price of productPrices) {
            rows.push({
              product_id: product.id,
              product_name: product.name,
              product_description: product.description,
              product_active: product.active,
              product_metadata: product.metadata,
              price_id: price.id,
              unit_amount: price.unit_amount,
              currency: price.currency,
              recurring: price.recurring,
              price_active: price.active,
            });
          }
        }
      }
      
      return rows;
    } catch (error) {
      console.error('Error fetching from Stripe API:', error);
      return [];
    }
  }

  async getPrice(priceId: string) {
    const result = await db.execute(
      sql`SELECT * FROM stripe.prices WHERE id = ${priceId}`
    );
    return result.rows[0] || null;
  }

  async listPrices(active = true, limit = 20, offset = 0) {
    const result = await db.execute(
      sql`SELECT * FROM stripe.prices WHERE active = ${active} LIMIT ${limit} OFFSET ${offset}`
    );
    return result.rows;
  }

  async getPricesForProduct(productId: string) {
    const result = await db.execute(
      sql`SELECT * FROM stripe.prices WHERE product = ${productId} AND active = true`
    );
    return result.rows;
  }
}

export const storage = new DatabaseStorage();
