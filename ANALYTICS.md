# Google Analytics 4 Integration - Ôluna Engenharia

## Overview

This document describes the comprehensive Google Analytics 4 (GA4) integration implemented for the Ôluna Engenharia website. The implementation focuses on LGPD compliance, professional service business intelligence, and privacy-first analytics.

## Features

### ✅ LGPD Compliance

- Privacy-first consent management
- Cookie consent banner with granular controls
- User opt-out mechanisms
- Data retention policies
- User rights management (access, deletion, portability)

### ✅ Business Intelligence

- Lead generation tracking
- Service interest analytics
- Customer journey mapping
- Conversion goal tracking
- Lead quality scoring
- Geographic and demographic insights

### ✅ Performance Monitoring

- Core Web Vitals tracking (CLS, FID, FCP, LCP, TTFB, INP)
- Page load performance
- Resource loading analytics
- Memory usage monitoring
- Frame rate tracking
- Error tracking

### ✅ User Experience Analytics

- Scroll depth tracking
- Engagement time measurement
- Form interaction analytics
- Contact method preferences
- Device and browser analytics

## Implementation Structure

```
src/
├── components/analytics/
│   ├── GoogleAnalytics.tsx      # GA4 script component
│   ├── CookieConsent.tsx        # LGPD consent manager
│   └── AnalyticsInit.tsx        # Client-side initialization
├── hooks/
│   └── useAnalytics.ts          # Analytics hooks for components
├── services/
│   └── analytics.ts             # Core analytics service
├── types/
│   └── analytics.ts             # TypeScript definitions
└── utils/
    ├── privacy.ts               # LGPD compliance utilities
    ├── performance.ts           # Performance tracking
    └── businessTracking.ts      # Business intelligence
```

## Configuration

### Environment Variables

Add these variables to your `.env.local` file:

```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://olunaengenharia.com.br

# WhatsApp Integration
NEXT_PUBLIC_WHATSAPP_NUMBER=5521999999999
NEXT_PUBLIC_WHATSAPP_MESSAGE=Olá! Vim pelo site e gostaria de solicitar um orçamento.
```

### GA4 Setup

1. Create a GA4 property in Google Analytics
2. Enable Enhanced Measurement
3. Set up custom events and conversions
4. Configure audience segments
5. Set up data retention (26 months for LGPD compliance)

## Usage Examples

### Basic Event Tracking

```typescript
import { trackEvent } from '@/services/analytics'

// Track custom event
trackEvent({
  name: 'service_interest',
  parameters: {
    service_name: 'Termografia Industrial',
    service_category: 'thermal',
    event_category: 'engagement',
    value: 1,
  },
})
```

### Form Tracking

```typescript
import { useFormTracking } from '@/hooks/useAnalytics'

function ContactForm() {
  const formTracking = useFormTracking('contact_form', 'contact')

  const handleSubmit = (data) => {
    formTracking.trackFormSubmit(true)
    // ... form submission logic
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
    </form>
  )
}
```

### Service Interest Tracking

```typescript
import { trackBusinessServiceInterest } from '@/utils/businessTracking'

// Track when user shows interest in a service
trackBusinessServiceInterest('Termografia Industrial', 'thermal', 'click', {
  timeOnSection: 30000,
  pageSection: 'services_grid',
  userType: 'returning',
})
```

### Lead Generation Tracking

```typescript
import { trackQualifiedLead } from '@/utils/businessTracking'

// Track high-quality lead
trackQualifiedLead({
  lead_type: 'contact_form',
  lead_source: 'organic',
  service_interest: ['thermal', 'electrical'],
  project_type: 'industrial',
  urgency_level: 'high',
  budget_range: '15k_50k',
  contact_preference: 'whatsapp',
  event_category: 'lead_generation',
  event_label: 'qualified_lead',
  value: 500,
})
```

## Business Events

### Lead Generation Events

- `lead_generated` - New lead created
- `contact_form_submit` - Contact form submission
- `whatsapp_click` - WhatsApp button clicked
- `phone_call_click` - Phone number clicked
- `quote_request` - Quote request submitted

### Service Interest Events

- `service_view` - Service page viewed
- `service_interest` - User shows interest in service
- `thermal_analysis_interest` - Specific service interest
- `portfolio_view` - Portfolio section viewed

### Conversion Events

- `conversion_lead` - Lead conversion
- `conversion_consultation` - Consultation booking
- `conversion_download` - Document download

## Privacy Compliance

### LGPD Features

1. **Consent Management**

   - Granular consent controls
   - Consent versioning
   - Automatic expiry (1 year)
   - Easy withdrawal

2. **Data Rights**

   - Access to collected data
   - Data portability
   - Right to deletion
   - Data rectification

3. **Privacy Controls**
   - Anonymized IP addresses
   - Session-based identifiers
   - No persistent cross-site tracking
   - Minimal data collection

### Cookie Categories

- **Essential** (always enabled): Security, basic functionality
- **Analytics** (optional): Google Analytics, performance metrics
- **Functional** (optional): Contact forms, WhatsApp integration
- **Preferences** (optional): User preferences, customization

## Performance Tracking

### Core Web Vitals

Automatically tracked metrics:

- **CLS** (Cumulative Layout Shift)
- **FID** (First Input Delay)
- **FCP** (First Contentful Paint)
- **LCP** (Largest Contentful Paint)
- **TTFB** (Time to First Byte)
- **INP** (Interaction to Next Paint)

### Custom Performance Metrics

```typescript
import { trackCustomTiming } from '@/utils/performance'

// Track custom timing
trackCustomTiming('api', 'contact_form_submission', 1250)
```

## Business Intelligence

### Lead Scoring

Leads are automatically scored based on:

- Contact method (WhatsApp: 8, Phone: 10, Email: 6)
- Lead source (Direct: 10, Organic: 9, Referral: 8)
- Urgency level (Urgent: 10, High: 8, Medium: 6)
- Service interest (Multiple services: 10, Single high-value: 8)
- Company type (Industrial: 10, Commercial: 7, Residential: 5)

### Conversion Goals

Pre-configured conversion goals:

- Contact form submission (100 BRL value)
- Quote request (250 BRL value)
- Consultation request (500 BRL value)
- WhatsApp engagement (50 BRL value)
- Document download (30 BRL value)

### Customer Journey Stages

Tracked stages:

1. **Awareness** - First visit, page views
2. **Consideration** - Service interest, multiple pages
3. **Decision** - Contact forms, direct contact
4. **Retention** - Return visits, ongoing engagement

## Testing and Debugging

### Debug Mode

Enable debug mode in development:

```typescript
// Automatic in development
const debugMode = process.env.NODE_ENV === 'development'
```

### Analytics Validation

Check browser console for:

- Event tracking logs
- Consent state changes
- Performance metrics
- Error tracking

### Testing Tools

1. **Google Analytics DebugView**
2. **GA4 Real-time reports**
3. **Browser DevTools Console**
4. **Privacy compliance checkers**

## Maintenance

### Regular Tasks

1. **Monthly**

   - Review conversion goals
   - Check performance metrics
   - Analyze lead quality scores
   - Update service categories

2. **Quarterly**

   - Review LGPD compliance
   - Update consent mechanisms
   - Analyze customer journey data
   - Optimize tracking parameters

3. **Annually**
   - Consent version updates
   - Privacy policy reviews
   - Data retention cleanup
   - Analytics configuration audit

### Performance Optimization

- Monitor bundle size impact
- Lazy load analytics scripts
- Optimize event frequency
- Review custom dimensions usage

## Compliance Checklist

### LGPD Compliance

- [ ] Privacy policy updated
- [ ] Consent banner implemented
- [ ] User rights mechanisms
- [ ] Data retention policies
- [ ] Opt-out functionality
- [ ] Anonymized data collection
- [ ] Secure data transmission
- [ ] Regular compliance audits

### GA4 Best Practices

- [ ] Custom events properly named
- [ ] Conversion goals configured
- [ ] Enhanced measurement enabled
- [ ] Audience segments created
- [ ] Data retention set (26 months)
- [ ] Cross-domain tracking (if needed)
- [ ] Server-side tracking (future)

## Troubleshooting

### Common Issues

1. **Events not appearing**

   - Check consent state
   - Verify GA4 ID
   - Check browser console
   - Validate event parameters

2. **Performance impact**

   - Review script loading
   - Check event frequency
   - Monitor bundle size
   - Optimize tracking calls

3. **Consent issues**
   - Clear cookies and test
   - Check consent state persistence
   - Verify LGPD compliance
   - Test opt-out functionality

### Support Resources

- [GA4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Web Vitals Guide](https://web.dev/vitals/)
- [LGPD Compliance Guide](https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd)
- [Next.js Analytics](https://nextjs.org/docs/basic-features/eslint#usage)

## Future Enhancements

### Planned Features

1. **Server-side tracking** for enhanced privacy
2. **Advanced attribution modeling**
3. **Machine learning insights**
4. **Real-time dashboard integration**
5. **A/B testing framework**
6. **Enhanced e-commerce tracking**

### Metrics to Add

- Customer lifetime value
- Service demand forecasting
- Competitive analysis
- Market segmentation
- ROI tracking per channel

---

For technical support or questions about this implementation, contact the development team or refer to the project documentation.
