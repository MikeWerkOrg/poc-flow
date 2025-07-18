<template>
  <div class="security-tier-classification">
    <div class="mb-4">
      <h3 class="text-xl font-semibold mb-2">Security Tier Classification</h3>
      <p class="text-gray-600">Select the security tier that best describes your POC based on the data it handles and operations it performs.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div 
        v-for="tier in securityTiers" 
        :key="tier.id"
        class="asu-card p-4 cursor-pointer"
        :class="selectedTier === tier.id ? 'ring-2 ring-maroon-500' : ''"
        @click="selectTier(tier.id)"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3"
              :class="tier.bgColor"
            >
              {{ tier.id }}
            </div>
            <h4 class="font-semibold" :class="tier.color">{{ tier.name }}</h4>
          </div>
          <div v-if="selectedTier === tier.id" class="text-blue-500">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>
        
        <p class="text-sm text-gray-600 mb-3">{{ tier.description }}</p>
        
        <div class="mb-3">
          <h5 class="font-medium text-sm mb-2">Requirements:</h5>
          <ul class="text-xs text-gray-600 space-y-1">
            <li v-for="req in tier.requirements" :key="req" class="flex items-start">
              <span class="text-gray-400 mr-2">•</span>
              <span>{{ req }}</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h5 class="font-medium text-sm mb-2">Examples:</h5>
          <ul class="text-xs text-gray-600 space-y-1">
            <li v-for="example in tier.examples" :key="example" class="flex items-start">
              <span class="text-gray-400 mr-2">•</span>
              <span>{{ example }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="selectedTier" class="mt-6 p-4 bg-blue-50 rounded-lg">
      <h4 class="font-semibold mb-2">Selected Tier {{ selectedTier }} Requirements</h4>
      <p class="text-sm text-gray-700">
        Based on your selection, you will need to provide the following deliverables:
      </p>
      <ul class="mt-2 text-sm text-gray-600 space-y-1">
        <li v-for="req in getRequirementsForTier(selectedTier)" :key="req" class="flex items-start">
          <span class="text-blue-500 mr-2">•</span>
          <span>{{ req }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: Number,
    default: undefined
  }
})

const emit = defineEmits(['update:modelValue'])

const selectedTier = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const securityTiers = [
  {
    id: 1,
    name: 'Client-Side Only',
    description: 'UI/UX modifications, static content, no data processing',
    color: 'tier-1',
    bgColor: 'bg-tier-1',
    requirements: [
      'Demo video required',
      'Use case description',
      'Business value assessment'
    ],
    examples: [
      'Button color changes',
      'Layout modifications',
      'Static content updates',
      'CSS/styling changes'
    ]
  },
  {
    id: 2,
    name: 'Data Consumption',
    description: 'Read-only API calls, external integrations, data display',
    color: 'tier-2',
    bgColor: 'bg-tier-2',
    requirements: [
      'Demo video required',
      'Use case description',
      'Business value assessment',
      'Data flow diagrams',
      'API documentation'
    ],
    examples: [
      'Displaying external data',
      'API integration for reading',
      'Data visualization',
      'Third-party service integration'
    ]
  },
  {
    id: 3,
    name: 'Data Manipulation',
    description: 'Write operations, user data handling, data modifications',
    color: 'tier-3',
    bgColor: 'bg-tier-3',
    requirements: [
      'Demo video required',
      'Use case description',
      'Business value assessment',
      'Data flow diagrams',
      'API documentation',
      'Security assessment',
      'Data handling procedures'
    ],
    examples: [
      'User data creation/updates',
      'Form submissions',
      'Data processing workflows',
      'Content management'
    ]
  },
  {
    id: 4,
    name: 'Critical Systems',
    description: 'Authentication, payments, sensitive data, security-critical operations',
    color: 'tier-4',
    bgColor: 'bg-tier-4',
    requirements: [
      'Demo video required',
      'Use case description',
      'Business value assessment',
      'Data flow diagrams',
      'API documentation',
      'Security assessment',
      'Data handling procedures',
      'Full security review',
      'Compliance checklist'
    ],
    examples: [
      'Payment processing',
      'Authentication systems',
      'Sensitive data handling',
      'Security-critical features'
    ]
  }
]

const selectTier = (tierId) => {
  selectedTier.value = tierId
}

const getRequirementsForTier = (tier) => {
  const selectedTierData = securityTiers.find(t => t.id === tier)
  return selectedTierData?.requirements || []
}
</script>

<style scoped>
.tier-card {
  transition: all 0.2s ease;
}

.tier-card:hover {
  transform: translateY(-2px);
}
</style>