# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Package Management
```bash
npm install          # Install dependencies (note: .yarnrc configures @rds-vue-ui registry)
```

## Architecture Overview

POC Flow is a Nuxt.js 3 application implementing a **tier-based security classification system** for POC evaluation. The core architectural pattern is that **security tiers (1-4) drive the entire application flow**, from form requirements to review processes.

### Security Tier System (Central Architecture)

The application revolves around a 4-tier security classification that dynamically influences every component:

- **Tier 1 (Green)**: Client-side only - 3 deliverables required
- **Tier 2 (Yellow)**: Data consumption - 5 deliverables required  
- **Tier 3 (Orange)**: Data manipulation - 7 deliverables required
- **Tier 4 (Red)**: Critical systems - 9 deliverables required

This tier selection cascades through:
- Form validation rules (`DeliverableUpload.vue`)
- API validation (`/api/poc/submit.post.ts`)
- Review complexity assessment
- Jira ticket priority mapping
- Coda integration metadata

### Component Flow Architecture

**Submission Flow** (4-step wizard pattern):
1. Basic info collection with validation gates
2. Security tier selection (drives all subsequent requirements)
3. Tier-aware deliverable uploads with file type/size validation
4. Review and submission with complete validation

**Review Flow** (engineering assessment):
1. Dashboard with tier-based filtering
2. Modal-based detailed review with complexity assessment
3. Approval/rejection with automated Jira ticket creation
4. External system synchronization (Jira/Coda)

### Key Integration Points

**External Systems**:
- **Jira**: Creates structured tickets with tier-based priorities and custom fields
- **Coda**: Syncs POC data for enhanced project tracking and reporting
- **Email**: Notification system for engineering team alerts

**API Endpoints**:
- `POST /api/poc/submit` - Handles submission with tier-aware validation
- `POST /api/jira/create-ticket` - Creates Jira tickets from approved POCs
- `POST /api/coda/sync-poc` - Syncs POC data to Coda tables

### Data Flow Patterns

**Tier-Driven Validation**: Every form step validates against the selected security tier requirements. When working with forms, always check how security tier affects validation logic.

**Progressive Enhancement**: Form steps build upon each other - each step's completion enables the next step. The `isCurrentStepValid` computed property pattern is used throughout.

**External Integration Chain**: Successful POC approval triggers: Jira ticket creation → Coda synchronization → Email notifications. This chain is orchestrated in the review modal.

### Configuration Architecture

**Runtime Config Pattern**: 
- Private keys (Jira/Coda API keys) are server-side only
- Public endpoints are exposed to client-side for integration
- Environment variables follow the `.env.example` pattern

**Component Registration**: 
- Global components are auto-imported via Nuxt's component discovery
- External RDS components require the `.yarnrc` registry configuration
- Bootstrap CSS is globally loaded for component styling

### Type System Design

The TypeScript type system is centralized in `/types/index.ts` with key interfaces:
- `POCSubmission` - Central data structure with status tracking
- `SecurityTier` - Tier configuration and requirements
- `DeliverableRequirement` - File upload specifications with tier-level mapping

### Development Patterns

**Tier-Aware Components**: Most components need to handle security tier logic. When adding features, consider how they should behave differently across tiers.

**Validation Patterns**: Each form step has its own validation logic that depends on both user input and security tier selection. Follow the established `isCurrentStepValid` pattern.

**External Integration**: All external integrations (Jira/Coda) follow the same pattern - structured data transformation with error handling and fallback responses.

**Modal Patterns**: The review system uses modal-based interactions with emit patterns for parent-child communication (`@close`, `@update` events).

### File Upload System

The deliverable upload system (`DeliverableUpload.vue`) is tier-aware and handles:
- Dynamic requirement generation based on security tier
- File type/size validation per deliverable type
- Drag-and-drop functionality with progress tracking
- Real-time validation feedback

When modifying upload functionality, ensure tier-level requirements are properly enforced and that the `getRequiredDeliverablesForTier()` function in the API matches the frontend logic.