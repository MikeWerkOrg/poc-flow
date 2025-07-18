<template>
  <div class="deliverable-upload">
    <h3 class="text-lg font-semibold mb-4">Required Deliverables</h3>
    
    <div class="mb-6">
      <div class="flex items-center mb-2">
        <div 
          class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3"
          :class="getSecurityTierColor(securityTier)"
        >
          {{ securityTier }}
        </div>
        <span class="font-medium">{{ getSecurityTierName(securityTier) }}</span>
      </div>
      <p class="text-sm text-gray-600">
        Based on your security tier selection, the following deliverables are required for submission.
      </p>
    </div>

    <div class="space-y-6">
      <div 
        v-for="requirement in getRequirementsForTier(securityTier)"
        :key="requirement.id"
        class="deliverable-item bg-white border border-gray-200 rounded-lg p-4"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex-1">
            <h4 class="font-semibold flex items-center">
              {{ requirement.name }}
              <span v-if="requirement.required" class="text-red-500 ml-1">*</span>
            </h4>
            <p class="text-sm text-gray-600 mt-1">{{ requirement.description }}</p>
            <div v-if="requirement.fileTypes" class="text-xs text-gray-500 mt-1">
              Accepted formats: {{ requirement.fileTypes.join(', ') }}
            </div>
          </div>
          <div class="flex items-center ml-4">
            <div 
              v-if="getUploadedFile(requirement.id)"
              class="text-green-500 flex items-center text-sm"
            >
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              Uploaded
            </div>
          </div>
        </div>

        <div class="upload-area">
          <div 
            v-if="!getUploadedFile(requirement.id)"
            class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
            @drop="handleDrop($event, requirement.id)"
            @dragover.prevent
            @dragenter.prevent
          >
            <div class="mb-4">
              <svg class="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
            </div>
            <p class="text-sm text-gray-600 mb-2">
              Drag and drop your file here, or 
              <button 
                type="button" 
                @click="triggerFileInput(requirement.id)"
                class="text-blue-500 hover:text-blue-700 underline"
              >
                browse
              </button>
            </p>
            <input 
              :ref="el => fileInputs[requirement.id] = el"
              type="file"
              class="hidden"
              :accept="requirement.fileTypes ? requirement.fileTypes.map(type => `.${type}`).join(',') : undefined"
              @change="handleFileSelect($event, requirement.id)"
            />
          </div>

          <div 
            v-else
            class="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between"
          >
            <div class="flex items-center">
              <svg class="w-8 h-8 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
              </svg>
              <div>
                <p class="font-medium">{{ getUploadedFile(requirement.id)?.fileName }}</p>
                <p class="text-sm text-gray-500">{{ formatFileSize(getUploadedFile(requirement.id)?.fileSize || 0) }}</p>
              </div>
            </div>
            <button 
              type="button"
              @click="removeFile(requirement.id)"
              class="text-red-500 hover:text-red-700 p-1"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 p-4 bg-blue-50 rounded-lg">
      <h4 class="font-semibold mb-2">Upload Guidelines</h4>
      <ul class="text-sm text-gray-700 space-y-1">
        <li>• Maximum file size: 10MB per file</li>
        <li>• Supported formats vary by deliverable type</li>
        <li>• All required deliverables must be uploaded before submission</li>
        <li>• Files will be reviewed by engineering teams</li>
      </ul>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  securityTier: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const fileInputs = ref({})
const uploadedFiles = computed({
  get: () => props.modelValue || [],
  set: (value) => emit('update:modelValue', value)
})

const deliverableRequirements = [
  {
    id: 'demo-video',
    name: 'Demo Video',
    description: 'A video demonstration of your POC in action',
    required: true,
    tierLevel: 1,
    fileTypes: ['mp4', 'avi', 'mov', 'wmv'],
    maxFileSize: 50 * 1024 * 1024 // 50MB
  },
  {
    id: 'use-case-doc',
    name: 'Use Case Description',
    description: 'Detailed document describing the use case and requirements',
    required: true,
    tierLevel: 1,
    fileTypes: ['pdf', 'doc', 'docx', 'txt']
  },
  {
    id: 'business-value',
    name: 'Business Value Assessment',
    description: 'Document outlining the business value and expected ROI',
    required: true,
    tierLevel: 1,
    fileTypes: ['pdf', 'doc', 'docx', 'xls', 'xlsx']
  },
  {
    id: 'data-flow',
    name: 'Data Flow Diagrams',
    description: 'Visual representation of data flow within the system',
    required: true,
    tierLevel: 2,
    fileTypes: ['pdf', 'png', 'jpg', 'svg', 'vsd', 'vsdx']
  },
  {
    id: 'api-docs',
    name: 'API Documentation',
    description: 'Documentation of APIs used or created',
    required: true,
    tierLevel: 2,
    fileTypes: ['pdf', 'doc', 'docx', 'json', 'yaml', 'md']
  },
  {
    id: 'security-assessment',
    name: 'Security Assessment',
    description: 'Security analysis and risk assessment document',
    required: true,
    tierLevel: 3,
    fileTypes: ['pdf', 'doc', 'docx']
  },
  {
    id: 'data-handling',
    name: 'Data Handling Procedures',
    description: 'Procedures for handling, storing, and processing data',
    required: true,
    tierLevel: 3,
    fileTypes: ['pdf', 'doc', 'docx']
  },
  {
    id: 'security-review',
    name: 'Full Security Review',
    description: 'Comprehensive security review and penetration testing results',
    required: true,
    tierLevel: 4,
    fileTypes: ['pdf', 'doc', 'docx']
  },
  {
    id: 'compliance-checklist',
    name: 'Compliance Checklist',
    description: 'Compliance checklist for regulatory requirements',
    required: true,
    tierLevel: 4,
    fileTypes: ['pdf', 'doc', 'docx', 'xls', 'xlsx']
  }
]

const getRequirementsForTier = (tier) => {
  return deliverableRequirements.filter(req => req.tierLevel <= tier)
}

const getUploadedFile = (requirementId) => {
  return uploadedFiles.value.find(file => file.requirementId === requirementId)
}

const triggerFileInput = (requirementId) => {
  fileInputs.value[requirementId]?.click()
}

const handleFileSelect = (event, requirementId) => {
  const target = event.target
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    addFile(file, requirementId)
  }
}

const handleDrop = (event, requirementId) => {
  event.preventDefault()
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    const file = event.dataTransfer.files[0]
    addFile(file, requirementId)
  }
}

const addFile = (file, requirementId) => {
  const requirement = deliverableRequirements.find(req => req.id === requirementId)
  if (!requirement) return

  // Validate file type
  if (requirement.fileTypes) {
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    if (!fileExtension || !requirement.fileTypes.includes(fileExtension)) {
      alert(`Invalid file type. Accepted formats: ${requirement.fileTypes.join(', ')}`)
      return
    }
  }

  // Validate file size
  if (requirement.maxFileSize && file.size > requirement.maxFileSize) {
    alert(`File size exceeds maximum limit of ${formatFileSize(requirement.maxFileSize)}`)
    return
  }

  const deliverable = {
    requirementId,
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type,
    uploadedAt: new Date(),
    // In a real implementation, you would upload the file and get a URL
    url: URL.createObjectURL(file)
  }

  // Remove existing file for this requirement and add new one
  const newFiles = uploadedFiles.value.filter(f => f.requirementId !== requirementId)
  newFiles.push(deliverable)
  uploadedFiles.value = newFiles
}

const removeFile = (requirementId) => {
  uploadedFiles.value = uploadedFiles.value.filter(f => f.requirementId !== requirementId)
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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
</script>

<style scoped>
.upload-area {
  transition: all 0.2s ease;
}

.upload-area:hover {
  transform: translateY(-1px);
}
</style>