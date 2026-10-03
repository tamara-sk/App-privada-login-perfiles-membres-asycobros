// Single catalogue of events allowed to reach GHL. Add a name here AND in the
// event_outbox check constraint. Not every app action belongs here — only CRM,
// communication, sales, nurturing, transaction and journey events.
export const GHL_EVENTS = [
  'user_registered', 'onboarding_started', 'onboarding_completed', 'ai_profile_completed',
  'membership_created', 'booking_created', 'payment_success', 'payment_failed',
  'booking_cancelled', 'transaction_created',
] as const;
export type GhlEvent = (typeof GHL_EVENTS)[number];

// Tag applied in GHL per event; GHL workflows trigger on these tags (emails live in GHL).
export const EVENT_TAGS: Record<GhlEvent, string> = {
  user_registered: 'sk-event-registered',
  onboarding_started: 'sk-event-onboarding-started',
  onboarding_completed: 'sk-event-onboarding-completed',
  ai_profile_completed: 'sk-event-ai-profile',
  membership_created: 'sk-event-membership',
  booking_created: 'sk-event-booking',
  payment_success: 'sk-event-payment-ok',
  payment_failed: 'sk-event-payment-failed',
  booking_cancelled: 'sk-event-booking-cancelled',
  transaction_created: 'sk-event-transaction',
};
