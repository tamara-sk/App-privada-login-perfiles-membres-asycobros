import { PricingSection } from '@/features/membership/components/pricing-section';

export const revalidate = 3600;

export default async function PricingPage() {
  return <PricingSection isPricingPage />;
}
