<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="asu-header">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-white">POC Flow</h1>
            <p class="text-gray-200 mt-1">Streamlined POC evaluation and handoff system</p>
          </div>
          <div class="flex space-x-4">
            <NuxtLink 
              to="/submit" 
              class="asu-btn asu-btn-secondary"
            >
              Submit POC
            </NuxtLink>
            <NuxtLink 
              to="/review" 
              class="asu-btn asu-btn-outline-primary bg-white"
            >
              Review POCs
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-12">
      <!-- Hero Section -->
      <section class="text-center mb-16">
        <h2 class="text-4xl asu-heading mb-4">
          Bridge the Gap Between Innovation and Implementation
        </h2>
        <p class="text-xl asu-text max-w-3xl mx-auto mb-8">
          POC Flow streamlines the process between vibe-coded solutions and engineering teams with 
          tier-based security classification, automated validation, and integrated roadmap planning.
        </p>
        <div class="flex justify-center space-x-4">
          <NuxtLink 
            to="/submit" 
            class="asu-btn asu-btn-primary text-lg px-8 py-4"
          >
            Get Started
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="asu-btn asu-btn-outline-primary text-lg px-8 py-4"
          >
            Learn More
          </NuxtLink>
        </div>
      </section>

      <!-- Features Section -->
      <section class="asu-section">
        <h3 class="text-2xl asu-heading text-center mb-12">Key Features</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="asu-card p-6 text-center">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: rgba(120, 190, 32, 0.1);">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" style="color: var(--asu-green);">
                <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <h4 class="asu-subheading mb-2">Tier-Based Security</h4>
            <p class="asu-text text-sm">Automated security classification from client-side to critical systems</p>
          </div>

          <div class="asu-card p-6 text-center">
            <div class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: rgba(0, 163, 224, 0.1);">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" style="color: var(--asu-blue);">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 00-1 1v1a1 1 0 100 2v1a1 1 0 001 1v1a1 1 0 100 2v1a1 1 0 00-1 1v1a1 1 0 01-2 0v-1a1 1 0 00-1-1v-1a1 1 0 01-1-1V5z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <h4 class="asu-subheading mb-2">Automated Forms</h4>
            <p class="asu-text text-sm">Smart forms that adapt based on security tier requirements</p>
          </div>

          <div class="asu-card p-6 text-center">
            <div class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: rgba(140, 29, 64, 0.1);">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" style="color: var(--asu-maroon);">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <h4 class="asu-subheading mb-2">Review Tools</h4>
            <p class="asu-text text-sm">Internal tools for engineering stakeholders to assess POCs</p>
          </div>

          <div class="asu-card p-6 text-center">
            <div class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: rgba(255, 127, 50, 0.1);">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" style="color: var(--asu-orange);">
                <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <h4 class="asu-subheading mb-2">Jira Integration</h4>
            <p class="asu-text text-sm">Seamless integration with Jira for roadmap planning</p>
          </div>
        </div>
      </section>

      <!-- Security Tiers Overview -->
      <section class="mb-16">
        <h3 class="text-2xl font-bold text-center mb-12">Security Tier Classification</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <div class="flex items-center mb-4">
              <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                1
              </div>
              <h4 class="font-semibold text-green-600">Client-Side Only</h4>
            </div>
            <p class="text-sm text-gray-600 mb-3">UI/UX modifications, static content</p>
            <ul class="text-xs text-gray-500 space-y-1">
              <li>• Demo video</li>
              <li>• Use case description</li>
              <li>• Business value</li>
            </ul>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <div class="flex items-center mb-4">
              <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                2
              </div>
              <h4 class="font-semibold text-yellow-600">Data Consumption</h4>
            </div>
            <p class="text-sm text-gray-600 mb-3">Read-only API calls, external integrations</p>
            <ul class="text-xs text-gray-500 space-y-1">
              <li>• All Tier 1 requirements</li>
              <li>• Data flow diagrams</li>
              <li>• API documentation</li>
            </ul>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <div class="flex items-center mb-4">
              <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                3
              </div>
              <h4 class="font-semibold text-orange-600">Data Manipulation</h4>
            </div>
            <p class="text-sm text-gray-600 mb-3">Write operations, user data handling</p>
            <ul class="text-xs text-gray-500 space-y-1">
              <li>• All Tier 2 requirements</li>
              <li>• Security assessment</li>
              <li>• Data handling procedures</li>
            </ul>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-sm border">
            <div class="flex items-center mb-4">
              <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                4
              </div>
              <h4 class="font-semibold text-red-600">Critical Systems</h4>
            </div>
            <p class="text-sm text-gray-600 mb-3">Authentication, payments, sensitive data</p>
            <ul class="text-xs text-gray-500 space-y-1">
              <li>• All Tier 3 requirements</li>
              <li>• Full security review</li>
              <li>• Compliance checklist</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="bg-blue-500 text-white rounded-lg p-12 text-center">
        <h3 class="text-2xl font-bold mb-4">Ready to Submit Your POC?</h3>
        <p class="text-blue-100 mb-6 max-w-2xl mx-auto">
          Our streamlined process makes it easy to get your proof of concept evaluated and integrated 
          into the engineering roadmap. Start with our guided form today.
        </p>
        <NuxtLink 
          to="/submit" 
          class="bg-white text-blue-500 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium inline-block"
        >
          Submit POC Now
        </NuxtLink>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <h4 class="text-lg font-semibold mb-2">POC Flow</h4>
            <p class="text-gray-400">Streamlined POC evaluation and handoff system</p>
          </div>
          <div class="flex space-x-6">
            <NuxtLink to="/submit" class="text-gray-400 hover:text-white transition-colors">Submit</NuxtLink>
            <NuxtLink to="/review" class="text-gray-400 hover:text-white transition-colors">Review</NuxtLink>
            <NuxtLink to="/about" class="text-gray-400 hover:text-white transition-colors">About</NuxtLink>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 POC Flow. Built with Nuxt.js 3, Vue.js 3, and Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Set page meta
useHead({
  title: 'POC Flow - Streamlined POC Evaluation System',
  meta: [
    {
      name: 'description',
      content: 'Bridge the gap between innovation and implementation with tier-based security classification, automated validation, and integrated roadmap planning.'
    }
  ]
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>