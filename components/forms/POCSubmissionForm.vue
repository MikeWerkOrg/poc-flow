<template>
  <div class="poc-submission-form">
    <div class="mb-6">
      <h2 class="text-2xl font-bold mb-2">POC Submission Form</h2>
      <p class="text-gray-600">Submit your Proof of Concept for engineering review and roadmap consideration.</p>
    </div>

    <!-- Progress Indicator -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm font-medium">Progress</span>
        <span class="text-sm text-gray-500">{{ currentStep + 1 }} of {{ formSteps.length }}</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          class="progress-indicator h-2 rounded-full"
          :style="{ width: `${((currentStep + 1) / formSteps.length) * 100}%` }"
        ></div>
      </div>
    </div>

    <!-- Step Navigation -->
    <div class="flex justify-between mb-8">
      <div 
        v-for="(step, index) in formSteps"
        :key="step.id"
        class="flex-1 flex items-center"
      >
        <div class="flex items-center">
          <div 
            class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
            :class="[
              index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500',
              index < currentStep ? 'bg-green-500' : ''
            ]"
          >
            <svg v-if="index < currentStep" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <span class="ml-2 text-sm font-medium hidden md:block">{{ step.title }}</span>
        </div>
        <div v-if="index < formSteps.length - 1" class="flex-1 h-0.5 bg-gray-200 mx-4">
          <div 
            class="h-full bg-blue-500 transition-all duration-300"
            :class="index < currentStep ? 'w-full' : 'w-0'"
          ></div>
        </div>
      </div>
    </div>

    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Step 1: Basic Information -->
      <div v-if="currentStep === 0" class="form-step">
        <h3 class="text-lg font-semibold mb-4">Basic Information</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="asu-form-label">POC Title *</label>
            <input 
              v-model="formData.title"
              type="text"
              class="asu-form-control"
              placeholder="Enter a descriptive title for your POC"
              required
            />
          </div>
          
          <div>
            <label class="asu-form-label">Submitted By *</label>
            <input 
              v-model="formData.submittedBy"
              type="text"
              class="asu-form-control"
              placeholder="Your name"
              required
            />
          </div>
        </div>
        
        <div>
          <label class="asu-form-label">Description *</label>
          <textarea 
            v-model="formData.description"
            rows="4"
            class="asu-form-control"
            placeholder="Describe what your POC does and how it works"
            required
          ></textarea>
        </div>
        
        <div>
          <label class="asu-form-label">Use Case *</label>
          <textarea 
            v-model="formData.useCase"
            rows="3"
            class="asu-form-control"
            placeholder="Describe the specific use case this POC addresses"
            required
          ></textarea>
        </div>
        
        <div>
          <label class="asu-form-label">Business Value *</label>
          <textarea 
            v-model="formData.businessValue"
            rows="3"
            class="asu-form-control"
            placeholder="Explain the business value and expected impact"
            required
          ></textarea>
        </div>
      </div>

      <!-- Step 2: Security Classification -->
      <div v-if="currentStep === 1" class="form-step">
        <TierClassification v-model="formData.securityTier" />
      </div>

      <!-- Step 3: Deliverables -->
      <div v-if="currentStep === 2" class="form-step">
        <DeliverableUpload 
          v-model="formData.deliverables"
          :security-tier="formData.securityTier"
        />
      </div>

      <!-- Step 4: Review -->
      <div v-if="currentStep === 3" class="form-step">
        <h3 class="text-lg font-semibold mb-4">Review Submission</h3>
        
        <div class="bg-gray-50 p-6 rounded-lg space-y-4">
          <div>
            <h4 class="font-semibold mb-2">Basic Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div><strong>Title:</strong> {{ formData.title }}</div>
              <div><strong>Submitted By:</strong> {{ formData.submittedBy }}</div>
              <div class="md:col-span-2"><strong>Description:</strong> {{ formData.description }}</div>
              <div class="md:col-span-2"><strong>Use Case:</strong> {{ formData.useCase }}</div>
              <div class="md:col-span-2"><strong>Business Value:</strong> {{ formData.businessValue }}</div>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold mb-2">Security Classification</h4>
            <div class="flex items-center">
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3"
                :class="getSecurityTierColor(formData.securityTier)"
              >
                {{ formData.securityTier }}
              </div>
              <span class="font-medium">{{ getSecurityTierName(formData.securityTier) }}</span>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold mb-2">Deliverables</h4>
            <div class="space-y-2">
              <div v-for="deliverable in formData.deliverables" :key="deliverable.requirementId" class="flex items-center text-sm">
                <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <span>{{ deliverable.fileName }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-between pt-6">
        <button
          v-if="currentStep > 0"
          type="button"
          @click="previousStep"
          class="asu-btn asu-btn-outline-primary"
        >
          Previous
        </button>
        
        <div class="flex space-x-3">
          <button
            type="button"
            @click="saveDraft"
            class="asu-btn asu-btn-outline-primary"
          >
            Save Draft
          </button>
          
          <button
            v-if="currentStep < formSteps.length - 1"
            type="button"
            @click="nextStep"
            :disabled="!isCurrentStepValid"
            class="asu-btn asu-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
          
          <button
            v-else
            type="submit"
            :disabled="!isFormValid"
            class="asu-btn asu-btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit POC
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import TierClassification from '~/components/security/TierClassification.vue'
import DeliverableUpload from '~/components/forms/DeliverableUpload.vue'

const formData = ref({
  title: '',
  description: '',
  businessValue: '',
  useCase: '',
  securityTier: 1,
  submittedBy: '',
  deliverables: []
})

const currentStep = ref(0)

const formSteps = [
  {
    id: 'basic-info',
    title: 'Basic Info',
    description: 'Basic information about your POC',
    component: 'BasicInfo',
    isCompleted: false,
    isActive: true
  },
  {
    id: 'security-tier',
    title: 'Security Tier',
    description: 'Classify your POC security requirements',
    component: 'SecurityTier',
    isCompleted: false,
    isActive: false
  },
  {
    id: 'deliverables',
    title: 'Deliverables',
    description: 'Upload required documents and files',
    component: 'Deliverables',
    isCompleted: false,
    isActive: false
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Review and submit your POC',
    component: 'Review',
    isCompleted: false,
    isActive: false
  }
]

const isCurrentStepValid = computed(() => {
  switch (currentStep.value) {
    case 0:
      return formData.value.title && formData.value.description && formData.value.useCase && formData.value.businessValue && formData.value.submittedBy
    case 1:
      return formData.value.securityTier !== undefined
    case 2:
      return formData.value.deliverables && formData.value.deliverables.length > 0
    case 3:
      return true
    default:
      return false
  }
})

const isFormValid = computed(() => {
  return formData.value.title && formData.value.description && formData.value.useCase && 
         formData.value.businessValue && formData.value.submittedBy && formData.value.securityTier &&
         formData.value.deliverables && formData.value.deliverables.length > 0
})

const nextStep = () => {
  if (currentStep.value < formSteps.length - 1 && isCurrentStepValid.value) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const saveDraft = async () => {
  // Implementation for saving draft
  console.log('Saving draft:', formData.value)
}

const submitForm = async () => {
  if (!isFormValid.value) return
  
  try {
    // Submit the form
    const submission = {
      ...formData.value,
      id: generateId(),
      status: 'submitted',
      submittedAt: new Date()
    }
    
    // API call to submit POC
    await $fetch('/api/poc/submit', {
      method: 'POST',
      body: submission
    })
    
    // Redirect to confirmation page
    await navigateTo('/poc/confirmation')
  } catch (error) {
    console.error('Error submitting POC:', error)
  }
}

const getSecurityTierColor = (tier) => {
  const colors = {
    1: 'bg-tier-1',
    2: 'bg-tier-2',
    3: 'bg-tier-3',
    4: 'bg-tier-4'
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

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
</script>

<style scoped>
.form-step {
  animation: fadeIn 0.3s ease-in-out;
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