// types/events.ts

// The shape of the properties JSONB column
// This is intentionally flexible — add fields as your event types grow
export type EventProperties = {
  // Page events
  page?: string;
  referrer?: string;
  // User agent info
  browser?: string;
  os?: string;
  device?: string;
  // Geography
  country?: string;
  city?: string;
  // E-commerce
  product_id?: string;
  plan?: string;
  amount?: number;
  currency?: string;
  // Catch-all for anything else
  [key: string]: unknown;
};

// Valid event types — string union for type safety in your app code
// This does NOT constrain the DB column — that stays a plain string
export type EventType =
  | 'page_view'
  | 'click'
  | 'signup'
  | 'login'
  | 'purchase'
  | 'onboarding_step'
  | 'feature_used'
  | 'error';

// The shape of an event as returned from the DB (Prisma's Event type extended)
export type EventRow = {
  id: string;
  event_type: EventType | string; // string fallback for unknown types
  user_id: string | null;
  session_id: string | null;
  properties: EventProperties;
  timestamp: Date;
  created_at: Date;
};

// The shape of an ingest request body (what clients POST)
export type IngestEventPayload = {
  event_type: string;
  user_id?: string;
  session_id?: string;
  properties?: EventProperties;
  timestamp?: string; // ISO string, optional — defaults to now()
};