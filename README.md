# POC Flow

A comprehensive POC (Proof of Concept) evaluation and handoff system for streamlining the process between vibe-coded solutions and engineering teams.

## Features

### 🔒 Tier-based Security Classification System
- **Tier 1**: Client-side only (UI/UX modifications, static content)
- **Tier 2**: Data consumption (read-only API calls, external integrations)
- **Tier 3**: Data manipulation (write operations, user data handling)
- **Tier 4**: Critical systems (authentication, payments, sensitive data)

### 📋 Automated Form/Ticket System
- Guides submitters through security tier identification
- Collects required deliverables based on tier level
- Validates completeness before submission
- Integrates with Jira for roadmap planning

### 📊 Deliverable Requirements by Tier
- **All tiers**: Demo video, use case description, business value
- **Tier 2+**: Data flow diagrams, API documentation
- **Tier 3+**: Security assessment, data handling procedures
- **Tier 4**: Full security review, compliance checklist

### 🔍 Internal Review Tools
- Quickly assess POC complexity and security implications
- Estimate engineering effort required
- Approve/reject with feedback
- Track POC status through pipeline

## Technology Stack

- **Frontend**: Nuxt.js 3 + Vue.js 3 + TypeScript
- **Styling**: Tailwind CSS + Bootstrap 5.1.3
- **Components**: @rds-vue-ui/* (ASU EdPlus RDS components)
- **Utilities**: @vueuse/core, docx, jszip, formidable, uuid
- **Integration**: Jira API for roadmap management
- **Optional**: Coda integration for enhanced project tracking

## Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd poc-flow
```

2. Create the .yarnrc file for RDS components:
```bash
echo '"@rds-vue-ui:registry" "https://npm.edpl.us"' > .yarnrc
```

3. Install dependencies:
```bash
npm install
```

4. Set up environment variables:
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
- Jira API credentials
- Coda API credentials (optional)
- Email configuration (optional)

### Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

## Project Structure

```
poc-flow/
├── components/
│   ├── forms/
│   │   ├── POCSubmissionForm.vue
│   │   └── DeliverableUpload.vue
│   ├── review/
│   │   ├── POCReviewDashboard.vue
│   │   └── POCReviewModal.vue
│   └── security/
│       └── TierClassification.vue
├── pages/
│   ├── index.vue
│   ├── submit.vue
│   └── review.vue
├── server/
│   └── api/
│       ├── jira/
│       │   └── create-ticket.post.ts
│       ├── coda/
│       │   └── sync-poc.post.ts
│       └── poc/
│           └── submit.post.ts
├── types/
│   └── index.ts
└── assets/
    └── css/
        └── main.css
```

## Usage

### Submitting a POC

1. Visit `/submit` to access the POC submission form
2. Fill in basic information (title, description, use case, business value)
3. Select appropriate security tier based on your POC requirements
4. Upload required deliverables based on selected tier
5. Review and submit for engineering evaluation

### Reviewing POCs

1. Visit `/review` to access the engineering review dashboard
2. Filter POCs by status and security tier
3. Click on any POC to open the detailed review modal
4. Assess complexity, add comments, and approve/reject
5. Optionally create Jira tickets for approved POCs

## API Endpoints

### POST /api/poc/submit
Submit a new POC for review.

### POST /api/jira/create-ticket
Create a Jira ticket for an approved POC.

### POST /api/coda/sync-poc
Sync POC data to Coda table (optional).

## Configuration

### Jira Integration
Set up Jira integration by configuring:
- `JIRA_BASE_URL`: Your Jira instance URL
- `JIRA_API_KEY`: API key for authentication
- `JIRA_PROJECT_KEY`: Project key for creating tickets

### Coda Integration (Optional)
Set up Coda integration by configuring:
- `CODA_API_KEY`: Coda API key
- `CODA_DOC_ID`: Document ID for tracking
- `CODA_TABLE_ID`: Table ID for POC data

## Security Tier Guidelines

### Tier 1 - Client-Side Only
- No server-side processing
- No external API calls
- No user data collection
- Examples: UI styling, static content changes

### Tier 2 - Data Consumption
- Read-only operations
- External API integrations
- Data visualization
- Examples: Dashboard displays, reporting features

### Tier 3 - Data Manipulation
- Write operations
- User data processing
- Form submissions
- Examples: Content management, user profiles

### Tier 4 - Critical Systems
- Authentication systems
- Payment processing
- Sensitive data handling
- Examples: Login systems, financial transactions

## Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
