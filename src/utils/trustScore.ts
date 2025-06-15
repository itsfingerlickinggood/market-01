
import { ProviderInfo, VerificationBadge } from "@/types/gpu-recommendation";

export const calculateTrustScore = (provider: ProviderInfo): number => {
  let score = 0.5; // Base score

  // Tier bonus
  switch (provider.tier) {
    case 'premium':
      score += 0.3;
      break;
    case 'verified':
      score += 0.2;
      break;
    case 'community':
      score += 0.1;
      break;
  }

  // SLA guarantee bonus
  if (provider.slaGuarantee) {
    score += (provider.slaGuarantee / 100) * 0.15;
  }

  // Verification badges bonus
  if (provider.verificationBadges) {
    const verifiedBadges = provider.verificationBadges.filter(badge => badge.verified);
    score += Math.min(verifiedBadges.length * 0.05, 0.2);
  }

  // Security certifications bonus
  if (provider.securityCertifications && provider.securityCertifications.length > 0) {
    score += Math.min(provider.securityCertifications.length * 0.03, 0.1);
  }

  // Global scale bonus
  if (provider.globalScale) {
    score += (provider.globalScale / 10) * 0.05;
  }

  return Math.min(score, 1.0);
};

export const generateMockVerificationBadges = (tier: string): VerificationBadge[] => {
  const allBadges: VerificationBadge[] = [
    {
      type: 'iso27001',
      verified: tier !== 'community',
      verifiedDate: '2024-01-15',
      description: 'ISO 27001 Information Security Management'
    },
    {
      type: 'soc2',
      verified: tier === 'verified' || tier === 'premium',
      verifiedDate: '2024-02-20',
      description: 'SOC 2 Type II Compliance'
    },
    {
      type: 'enterprise',
      verified: tier === 'premium',
      verifiedDate: '2024-03-10',
      description: 'Enterprise-grade infrastructure'
    },
    {
      type: 'performance',
      verified: true,
      verifiedDate: '2024-04-05',
      description: 'Performance benchmarks verified'
    },
    {
      type: 'uptime',
      verified: tier !== 'community',
      verifiedDate: '2024-05-01',
      description: '99.9% uptime guarantee'
    }
  ];

  return allBadges.filter(badge => 
    tier === 'premium' ? true : 
    tier === 'verified' ? badge.type !== 'enterprise' :
    ['performance'].includes(badge.type)
  );
};

export const enhanceProviderWithTrust = (provider: ProviderInfo): ProviderInfo => {
  const verificationBadges = generateMockVerificationBadges(provider.tier);
  const trustScore = calculateTrustScore({
    ...provider,
    verificationBadges
  });

  return {
    ...provider,
    verificationBadges,
    trustScore,
    uptimeGuarantee: provider.tier === 'premium' ? 99.95 : 
                     provider.tier === 'verified' ? 99.9 : 99.5
  };
};
