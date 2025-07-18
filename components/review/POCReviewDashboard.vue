<template>
  <div class="poc-review-dashboard">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-2xl font-bold mb-2">POC Review Dashboard</h2>
        <p class="text-gray-600">Review and manage submitted POCs for engineering evaluation</p>
      </div>
      <div class="flex space-x-3">
        <select v-model="selectedFilter" class="px-4 py-2 border border-gray-300 rounded-lg">
          <option value="all">All POCs</option>
          <option value="pending">Pending Review</option>
          <option value="in_review">In Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select v-model="selectedTier" class="px-4 py-2 border border-gray-300 rounded-lg">
          <option value="all">All Tiers</option>
          <option value="1">Tier 1</option>
          <option value="2">Tier 2</option>
          <option value="3">Tier 3</option>
          <option value="4">Tier 4</option>
        </select>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Total POCs</p>
            <p class="text-2xl font-bold">{{ stats.total }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
              <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 00-1 1v1a1 1 0 100 2v1a1 1 0 001 1v1a1 1 0 001 1v1a1 1 0 100 2v1a1 1 0 00-1 1v1a1 1 0 01-2 0v-1a1 1 0 00-1-1v-1a1 1 0 01-1-1V5z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Pending Review</p>
            <p class="text-2xl font-bold text-yellow-600">{{ stats.pending }}</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Approved</p>
            <p class="text-2xl font-bold text-green-600">{{ stats.approved }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">Rejected</p>
            <p class="text-2xl font-bold text-red-600">{{ stats.rejected }}</p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- POC List -->
    <div class="bg-white rounded-lg shadow-sm border">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold">POC Submissions</h3>
      </div>
      <div class="divide-y divide-gray-200">
        <div 
          v-for="poc in filteredPOCs" 
          :key="poc.id"
          class="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
          @click="selectPOC(poc)"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center mb-2">
                <h4 class="text-lg font-semibold mr-3">{{ poc.title }}</h4>
                <div 
                  class="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2"
                  :class="getSecurityTierColor(poc.securityTier)"
                >
                  {{ poc.securityTier }}
                </div>
                <span class="text-sm text-gray-500">{{ getSecurityTierName(poc.securityTier) }}</span>
              </div>
              
              <p class="text-gray-600 mb-3">{{ poc.description }}</p>
              
              <div class="flex items-center text-sm text-gray-500 space-x-4">
                <span>By {{ poc.submittedBy }}</span>
                <span>{{ formatDate(poc.submittedAt) }}</span>
                <span v-if="poc.estimatedEffort" class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                  </svg>
                  {{ poc.estimatedEffort }}h
                </span>
              </div>
            </div>
            
            <div class="ml-4 flex flex-col items-end">
              <div class="flex items-center mb-2">
                <span 
                  class="px-3 py-1 rounded-full text-sm font-medium"
                  :class="getStatusColor(poc.status)"
                >
                  {{ getStatusText(poc.status) }}
                </span>
              </div>
              
              <div class="flex space-x-2">
                <button 
                  @click.stop="reviewPOC(poc)"
                  class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                >
                  Review
                </button>
                <button 
                  v-if="poc.jiraTicket"
                  @click.stop="openJiraTicket(poc.jiraTicket)"
                  class="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                >
                  Jira
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- POC Review Modal -->
    <POCReviewModal 
      v-if="selectedPOC"
      :poc="selectedPOC"
      @close="selectedPOC = null"
      @update="handlePOCUpdate"
    />
  </div>
</template>

<script setup>
import POCReviewModal from '~/components/review/POCReviewModal.vue'

// Mock data - in real app, this would come from API
const mockPOCs = [
  {
    id: '1',
    title: 'Enhanced User Dashboard',
    description: 'Improved user dashboard with better analytics and visualization',
    businessValue: 'Increased user engagement by 25%',
    useCase: 'Users need better insights into their data',
    securityTier: 2,
    submittedBy: 'John Doe',
    submittedAt: new Date('2024-01-15'),
    status: 'pending',
    deliverables: [],
    estimatedEffort: 40
  },
  {
    id: '2',
    title: 'Payment Gateway Integration',
    description: 'Integration with new payment provider for better conversion rates',
    businessValue: 'Reduced payment friction, increased revenue by 15%',
    useCase: 'Current payment system has high abandonment rates',
    securityTier: 4,
    submittedBy: 'Jane Smith',
    submittedAt: new Date('2024-01-10'),
    status: 'in_review',
    deliverables: [],
    estimatedEffort: 80,
    jiraTicket: 'PROJ-123'
  }
]

const selectedFilter = ref('all')
const selectedTier = ref('all')
const selectedPOC = ref(null)

const pocs = ref(mockPOCs)

const stats = computed(() => ({
  total: pocs.value.length,
  pending: pocs.value.filter(p => p.status === 'pending').length,
  approved: pocs.value.filter(p => p.status === 'approved').length,
  rejected: pocs.value.filter(p => p.status === 'rejected').length
}))

const filteredPOCs = computed(() => {
  let filtered = pocs.value

  if (selectedFilter.value !== 'all') {
    filtered = filtered.filter(poc => poc.status === selectedFilter.value)
  }

  if (selectedTier.value !== 'all') {
    filtered = filtered.filter(poc => poc.securityTier === parseInt(selectedTier.value))
  }

  return filtered
})

const selectPOC = (poc) => {
  selectedPOC.value = poc
}

const reviewPOC = (poc) => {
  selectedPOC.value = poc
}

const openJiraTicket = (ticketId) => {
  // Open Jira ticket in new tab
  window.open(`https://jira.example.com/browse/${ticketId}`, '_blank')
}

const handlePOCUpdate = (updatedPOC) => {
  const index = pocs.value.findIndex(p => p.id === updatedPOC.id)
  if (index !== -1) {
    pocs.value[index] = updatedPOC
  }
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

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}
</script>

<style scoped>
.poc-review-dashboard {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>