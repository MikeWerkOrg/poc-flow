import type { POCSubmission } from '~/types'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const poc = body as POCSubmission

    const config = useRuntimeConfig()
    const codaBaseUrl = config.public.codaBaseUrl || 'https://coda.io/apis/v1'
    const codaApiKey = config.codaApiKey
    const docId = process.env.CODA_DOC_ID
    const tableId = process.env.CODA_TABLE_ID

    if (!codaApiKey || !docId || !tableId) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Coda configuration missing'
      })
    }

    // Prepare Coda row data
    const rowData = {
      rows: [
        {
          cells: [
            {
              column: 'POC ID',
              value: poc.id
            },
            {
              column: 'Title',
              value: poc.title
            },
            {
              column: 'Description',
              value: poc.description
            },
            {
              column: 'Use Case',
              value: poc.useCase
            },
            {
              column: 'Business Value',
              value: poc.businessValue
            },
            {
              column: 'Security Tier',
              value: poc.securityTier
            },
            {
              column: 'Security Tier Name',
              value: getSecurityTierName(poc.securityTier)
            },
            {
              column: 'Submitted By',
              value: poc.submittedBy
            },
            {
              column: 'Submitted Date',
              value: poc.submittedAt.toISOString()
            },
            {
              column: 'Status',
              value: poc.status
            },
            {
              column: 'Estimated Effort',
              value: poc.estimatedEffort || 0
            },
            {
              column: 'Complexity',
              value: poc.complexity || 'Unknown'
            },
            {
              column: 'Jira Ticket',
              value: poc.jiraTicket || ''
            },
            {
              column: 'Deliverables Count',
              value: poc.deliverables?.length || 0
            }
          ]
        }
      ]
    }

    // Check if POC already exists in Coda
    const existingRow = await findExistingCodaRow(poc.id, codaBaseUrl, codaApiKey, docId, tableId)

    let response
    if (existingRow) {
      // Update existing row
      response = await $fetch(`${codaBaseUrl}/docs/${docId}/tables/${tableId}/rows/${existingRow.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${codaApiKey}`,
          'Content-Type': 'application/json'
        },
        body: {
          row: rowData.rows[0]
        }
      })
    } else {
      // Create new row
      response = await $fetch(`${codaBaseUrl}/docs/${docId}/tables/${tableId}/rows`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${codaApiKey}`,
          'Content-Type': 'application/json'
        },
        body: rowData
      })
    }

    return {
      success: true,
      codaRowId: response.id || existingRow?.id,
      action: existingRow ? 'updated' : 'created',
      message: `POC ${existingRow ? 'updated' : 'created'} in Coda successfully`
    }
  } catch (error) {
    console.error('Error syncing POC to Coda:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to sync POC to Coda'
    })
  }
})

async function findExistingCodaRow(pocId: string, baseUrl: string, apiKey: string, docId: string, tableId: string) {
  try {
    const response = await $fetch(`${baseUrl}/docs/${docId}/tables/${tableId}/rows`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      },
      query: {
        query: `"POC ID":"${pocId}"`,
        useColumnNames: true
      }
    })

    return response.items && response.items.length > 0 ? response.items[0] : null
  } catch (error) {
    console.error('Error finding existing Coda row:', error)
    return null
  }
}

function getSecurityTierName(tier: number): string {
  const names = {
    1: 'Client-Side Only',
    2: 'Data Consumption',
    3: 'Data Manipulation',
    4: 'Critical Systems'
  }
  return names[tier as keyof typeof names] || 'Unknown'
}