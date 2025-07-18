export interface SecurityTier {
  id: number
  name: string
  description: string
  color: string
  bgColor: string
  requirements: string[]
  examples: string[]
}

export interface DeliverableRequirement {
  id: string
  name: string
  description: string
  required: boolean
  tierLevel: number
  fileTypes?: string[]
  maxFileSize?: number
}

export interface POCSubmission {
  id: string
  title: string
  description: string
  businessValue: string
  useCase: string
  securityTier: number
  submittedBy: string
  submittedAt: Date
  status: 'draft' | 'submitted' | 'in_review' | 'approved' | 'rejected'
  deliverables: POCDeliverable[]
  reviewComments?: ReviewComment[]
  jiraTicket?: string
  estimatedEffort?: number
  complexity?: 'low' | 'medium' | 'high'
}

export interface POCDeliverable {
  requirementId: string
  fileName: string
  fileSize: number
  fileType: string
  uploadedAt: Date
  content?: string
  url?: string
}

export interface ReviewComment {
  id: string
  reviewerId: string
  reviewerName: string
  comment: string
  type: 'feedback' | 'approval' | 'rejection'
  createdAt: Date
}

export interface FormStep {
  id: string
  title: string
  description: string
  component: string
  isCompleted: boolean
  isActive: boolean
  validation?: () => boolean
}

export interface JiraIntegration {
  baseUrl: string
  projectKey: string
  issueType: string
  apiKey: string
}

export interface CodaIntegration {
  baseUrl: string
  docId: string
  tableId: string
  apiKey: string
}

export interface ReviewerFeedback {
  complexity: 'low' | 'medium' | 'high'
  estimatedHours: number
  securityConcerns: string[]
  technicalConcerns: string[]
  recommendations: string[]
  approved: boolean
}