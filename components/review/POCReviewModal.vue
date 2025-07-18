<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h2 class="text-xl font-semibold">POC Review: {{ poc.title }}</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- POC Information -->
          <div class="space-y-6">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="font-semibold mb-3">POC Details</h3>
              <div class="space-y-2 text-sm">
                <div><strong>Submitted By:</strong> {{ poc.submittedBy }}</div>
                <div><strong>Submitted:</strong> {{ formatDate(poc.submittedAt) }}</div>
                <div class="flex items-center">
                  <strong class="mr-2">Security Tier:</strong>
                  <div 
                    class="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2"
                    :class="getSecurityTierColor(poc.securityTier)"
                  >
                    {{ poc.securityTier }}
                  </div>
                  <span>{{ getSecurityTierName(poc.securityTier) }}</span>
                </div>
                <div class="flex items-center">
                  <strong class="mr-2">Status:</strong>
                  <span 
                    class="px-2 py-1 rounded text-xs font-medium"
                    :class="getStatusColor(poc.status)"
                  >
                    {{ getStatusText(poc.status) }}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 class="font-semibold mb-2">Description</h4>
              <p class="text-gray-700 text-sm">{{ poc.description }}</p>
            </div>

            <div>
              <h4 class="font-semibold mb-2">Use Case</h4>
              <p class="text-gray-700 text-sm">{{ poc.useCase }}</p>
            </div>

            <div>
              <h4 class="font-semibold mb-2">Business Value</h4>
              <p class="text-gray-700 text-sm">{{ poc.businessValue }}</p>
            </div>

            <div>
              <h4 class="font-semibold mb-2">Deliverables</h4>
              <div class="space-y-2">
                <div 
                  v-for="deliverable in poc.deliverables"
                  :key="deliverable.requirementId"
                  class="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <div class="flex items-center">
                    <svg class="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-sm">{{ deliverable.fileName }}</span>
                  </div>
                  <button 
                    @click="downloadDeliverable(deliverable)"
                    class="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Review Form -->
          <div class="space-y-6">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-semibold mb-3">Engineering Review</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-2">Complexity Assessment</label>
                  <select 
                    v-model="reviewData.complexity"
                    class="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="">Select complexity...</option>
                    <option value="low">Low (1-2 weeks)</option>
                    <option value="medium">Medium (3-6 weeks)</option>
                    <option value="high">High (6+ weeks)</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-2">Estimated Hours</label>
                  <input 
                    v-model.number="reviewData.estimatedHours"
                    type="number"
                    class="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Enter estimated hours"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-2">Security Concerns</label>
                  <textarea 
                    v-model="reviewData.securityConcerns"
                    rows="3"
                    class="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="List any security concerns..."
                  ></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-2">Technical Concerns</label>
                  <textarea 
                    v-model="reviewData.technicalConcerns"
                    rows="3"
                    class="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="List any technical concerns..."
                  ></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-2">Recommendations</label>
                  <textarea 
                    v-model="reviewData.recommendations"
                    rows="3"
                    class="w-full p-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Provide recommendations..."
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Previous Comments -->
            <div v-if="poc.reviewComments && poc.reviewComments.length > 0">
              <h4 class="font-semibold mb-3">Previous Comments</h4>
              <div class="space-y-3">
                <div 
                  v-for="comment in poc.reviewComments"
                  :key="comment.id"
                  class="p-3 bg-gray-50 rounded-lg"
                >
                  <div class="flex justify-between items-start mb-2">
                    <div class="font-medium text-sm">{{ comment.reviewerName }}</div>
                    <div class="text-xs text-gray-500">{{ formatDate(comment.createdAt) }}</div>
                  </div>
                  <p class="text-sm text-gray-700">{{ comment.comment }}</p>
                  <div class="mt-2">
                    <span 
                      class="px-2 py-1 rounded text-xs font-medium"
                      :class="getCommentTypeColor(comment.type)"
                    >
                      {{ comment.type }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add Comment -->
            <div>
              <label class="block text-sm font-medium mb-2">Add Comment</label>
              <textarea 
                v-model="newComment"
                rows="3"
                class="w-full p-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Add your review comment..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <div class="flex items-center space-x-4">
            <label class="flex items-center">
              <input 
                v-model="createJiraTicket"
                type="checkbox"
                class="mr-2"
              />
              <span class="text-sm">Create Jira ticket</span>
            </label>
            <div v-if="createJiraTicket" class="flex items-center space-x-2">
              <input 
                v-model="jiraProject"
                type="text"
                placeholder="Project key"
                class="px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
          
          <div class="flex space-x-3">
            <button 
              @click="$emit('close')"
              class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              @click="rejectPOC"
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Reject
            </button>
            <button 
              @click="approvePOC"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  poc: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'update'])

const reviewData = ref({
  complexity: '',
  estimatedHours: 0,
  securityConcerns: '',
  technicalConcerns: '',
  recommendations: ''
})

const newComment = ref('')
const createJiraTicket = ref(false)
const jiraProject = ref('POC')

const approvePOC = async () => {
  const updatedPOC = {
    ...props.poc,
    status: 'approved',
    estimatedEffort: reviewData.value.estimatedHours,
    complexity: reviewData.value.complexity,
    reviewComments: [
      ...(props.poc.reviewComments || []),
      {
        id: generateId(),
        reviewerId: 'current-user',
        reviewerName: 'Current Reviewer',
        comment: newComment.value,
        type: 'approval',
        createdAt: new Date()
      }
    ]
  }

  if (createJiraTicket.value) {
    // Create Jira ticket
    const jiraTicketId = await createJiraTicketForPOC(updatedPOC)
    updatedPOC.jiraTicket = jiraTicketId
  }

  emit('update', updatedPOC)
  emit('close')
}

const rejectPOC = async () => {
  const updatedPOC = {
    ...props.poc,
    status: 'rejected',
    reviewComments: [
      ...(props.poc.reviewComments || []),
      {
        id: generateId(),
        reviewerId: 'current-user',
        reviewerName: 'Current Reviewer',
        comment: newComment.value,
        type: 'rejection',
        createdAt: new Date()
      }
    ]
  }

  emit('update', updatedPOC)
  emit('close')
}

const downloadDeliverable = (deliverable) => {
  // In a real implementation, this would download the file
  console.log('Downloading:', deliverable.fileName)
}

const createJiraTicketForPOC = async (poc) => {
  // Mock Jira ticket creation
  const ticketId = `${jiraProject.value}-${Math.floor(Math.random() * 1000)}`
  
  // In real implementation, this would call Jira API
  console.log('Creating Jira ticket:', ticketId)
  
  return ticketId
}

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

const getSecurityTierColor = (tier) => {
  const colors = {
    1: 'bg-green-500',
    2: 'bg-yellow-500',
    3: 'bg-orange-500',
    4: 'bg-red-500'
  }
  return colors[tier] || 'bg-gray-500'
}

const getSecurityTierName = (tier) => {
  const names = {
    1: 'Client-Side Only',
    2: 'Data Consumption',
    3: 'Data Manipulation',
    4: 'Critical Systems'
  }
  return names[tier] || 'Unknown'
}

const getStatusColor = (status) => {
  const colors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'in_review': 'bg-blue-100 text-blue-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
  const texts = {
    'pending': 'Pending Review',
    'in_review': 'In Review',
    'approved': 'Approved',
    'rejected': 'Rejected'
  }
  return texts[status] || 'Unknown'
}

const getCommentTypeColor = (type) => {
  const colors = {
    'feedback': 'bg-blue-100 text-blue-800',
    'approval': 'bg-green-100 text-green-800',
    'rejection': 'bg-red-100 text-red-800'
  }
  return colors[type] || 'bg-gray-100 text-gray-800'
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>