<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="asu-header">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-white hover:text-gray-200 mr-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            </NuxtLink>
            <div>
              <h1 class="text-2xl font-bold text-white">Submit POC</h1>
              <p class="text-gray-200">Submit your proof of concept for evaluation</p>
            </div>
          </div>
          <NuxtLink 
            to="/review" 
            class="asu-btn asu-btn-secondary"
          >
            Review POCs
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <POCSubmissionForm />
      </div>
    </main>
  </div>
</template>

<script setup>
// Import the POCSubmissionForm component
import POCSubmissionForm from '~/components/forms/POCSubmissionForm.vue'

// Set page meta
useHead({
  title: 'Submit POC - POC Flow',
  meta: [
    {
      name: 'description',
      content: 'Submit your proof of concept for engineering evaluation and roadmap integration.'
    }
  ]
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>