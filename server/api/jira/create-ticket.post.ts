import type { POCSubmission } from '~/types'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { poc, projectKey = 'POC' } = body as { poc: POCSubmission; projectKey?: string }

    const config = useRuntimeConfig()
    const jiraBaseUrl = config.public.jiraBaseUrl
    const jiraApiKey = config.jiraApiKey

    if (!jiraBaseUrl || !jiraApiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Jira configuration missing'
      })
    }

    // Prepare Jira ticket data
    const ticketData = {
      fields: {
        project: {
          key: projectKey
        },
        summary: `POC Implementation: ${poc.title}`,
        description: {
          type: 'doc',
          version: 1,
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'POC Implementation Request'
                }
              ]
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: `Description: ${poc.description}`
                }
              ]
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: `Use Case: ${poc.useCase}`
                }
              ]
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: `Business Value: ${poc.businessValue}`
                }
              ]
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: `Security Tier: ${poc.securityTier} (${getSecurityTierName(poc.securityTier)})`
                }
              ]
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: `Submitted By: ${poc.submittedBy}`
                }
              ]
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: `Estimated Effort: ${poc.estimatedEffort || 'TBD'} hours`
                }
              ]
            }
          ]
        },
        issuetype: {
          name: 'Story'
        },
        priority: {
          name: getJiraPriority(poc.securityTier)
        },
        labels: [
          'poc-implementation',
          `tier-${poc.securityTier}`,
          poc.complexity ? `complexity-${poc.complexity}` : 'complexity-unknown'
        ],
        customfield_10000: poc.id, // POC ID custom field
        customfield_10001: poc.securityTier, // Security Tier custom field
        customfield_10002: poc.estimatedEffort || 0 // Estimated Effort custom field
      }
    }

    // Create Jira ticket
    const response = await $fetch(`${jiraBaseUrl}/rest/api/3/issue`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`admin:${jiraApiKey}`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: ticketData
    })

    return {
      success: true,
      ticketId: response.key,
      ticketUrl: `${jiraBaseUrl}/browse/${response.key}`
    }
  } catch (error) {
    console.error('Error creating Jira ticket:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create Jira ticket'
    })
  }
})

function getSecurityTierName(tier: number): string {
  const names = {
    1: 'Client-Side Only',
    2: 'Data Consumption',
    3: 'Data Manipulation',
    4: 'Critical Systems'
  }
  return names[tier as keyof typeof names] || 'Unknown'
}

function getJiraPriority(tier: number): string {
  const priorities = {
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Highest'
  }
  return priorities[tier as keyof typeof priorities] || 'Medium'
}