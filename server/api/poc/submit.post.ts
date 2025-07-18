import type { POCSubmission } from '~/types'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const poc = body as POCSubmission

    // Validate required fields
    if (!poc.title || !poc.description || !poc.useCase || !poc.businessValue || !poc.submittedBy) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields'
      })
    }

    // Validate security tier
    if (!poc.securityTier || poc.securityTier < 1 || poc.securityTier > 4) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid security tier'
      })
    }

    // Validate deliverables based on tier
    const requiredDeliverables = getRequiredDeliverablesForTier(poc.securityTier)
    const submittedDeliverables = poc.deliverables?.map(d => d.requirementId) || []
    
    for (const required of requiredDeliverables) {
      if (!submittedDeliverables.includes(required)) {
        throw createError({
          statusCode: 400,
          statusMessage: `Missing required deliverable: ${required}`
        })
      }
    }

    // Set submission metadata
    const submissionData: POCSubmission = {
      ...poc,
      id: poc.id || generateId(),
      submittedAt: new Date(),
      status: 'submitted'
    }

    // In a real implementation, save to database
    // For now, we'll just return success
    console.log('POC submitted:', submissionData)

    // Optional: Send notification email
    await sendNotificationEmail(submissionData)

    return {
      success: true,
      pocId: submissionData.id,
      message: 'POC submitted successfully'
    }
  } catch (error) {
    console.error('Error submitting POC:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to submit POC'
    })
  }
})

function getRequiredDeliverablesForTier(tier: number): string[] {
  const baseRequirements = ['demo-video', 'use-case-doc', 'business-value']
  
  switch (tier) {
    case 1:
      return baseRequirements
    case 2:
      return [...baseRequirements, 'data-flow', 'api-docs']
    case 3:
      return [...baseRequirements, 'data-flow', 'api-docs', 'security-assessment', 'data-handling']
    case 4:
      return [...baseRequirements, 'data-flow', 'api-docs', 'security-assessment', 'data-handling', 'security-review', 'compliance-checklist']
    default:
      return baseRequirements
  }
}

async function sendNotificationEmail(poc: POCSubmission) {
  // In a real implementation, this would send an email notification
  console.log(`Sending notification email for POC: ${poc.title}`)
  
  // Example notification content
  const emailContent = {
    to: 'engineering-team@company.com',
    subject: `New POC Submission: ${poc.title}`,
    body: `
      A new POC has been submitted for review:
      
      Title: ${poc.title}
      Submitted by: ${poc.submittedBy}
      Security Tier: ${poc.securityTier}
      
      Please review the submission in the POC dashboard.
    `
  }
  
  // Mock email sending
  return Promise.resolve(emailContent)
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}