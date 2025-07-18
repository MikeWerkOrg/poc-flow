<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-blue-500 hover:text-blue-700 mr-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            </NuxtLink>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">About POC Flow</h1>
              <p class="text-gray-600">Learn more about our POC evaluation system</p>
            </div>
          </div>
          <div class="flex space-x-3">
            <NuxtLink 
              to="/submit" 
              class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Submit POC
            </NuxtLink>
            <NuxtLink 
              to="/review" 
              class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Review POCs
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto">
        <!-- Introduction -->
        <section class="mb-12">
          <h2 class="text-3xl font-bold mb-6">What is POC Flow?</h2>
          <p class="text-lg text-gray-700 mb-4">
            POC Flow is a comprehensive evaluation and handoff system designed to bridge the gap between rapid prototyping 
            ("vibe-coded solutions") and formal engineering implementation. Our platform streamlines the process of evaluating 
            proof of concepts and integrating them into production roadmaps.
          </p>
          <p class="text-lg text-gray-700">
            By implementing a tier-based security classification system, we ensure that every POC receives the appropriate 
            level of scrutiny and documentation required for safe and efficient production deployment.
          </p>
        </section>

        <!-- How It Works -->
        <section class="mb-12">
          <h2 class="text-3xl font-bold mb-6">How It Works</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <div class="flex items-center mb-4">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">1</div>
                <h3 class="text-xl font-semibold">Submit Your POC</h3>
              </div>
              <p class="text-gray-600">
                Use our guided form to submit your proof of concept. The system will help you classify your POC's security requirements and gather the necessary documentation.
              </p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <div class="flex items-center mb-4">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">2</div>
                <h3 class="text-xl font-semibold">Engineering Review</h3>
              </div>
              <p class="text-gray-600">
                Our engineering team reviews your submission, assesses complexity, estimates effort, and provides feedback on implementation feasibility.
              </p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <div class="flex items-center mb-4">
                <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">3</div>
                <h3 class="text-xl font-semibold">Roadmap Integration</h3>
              </div>
              <p class="text-gray-600">
                Approved POCs are automatically integrated into our project management systems (Jira) and planning tools (Coda) for seamless handoff.
              </p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm border">
              <div class="flex items-center mb-4">
                <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">4</div>
                <h3 class="text-xl font-semibold">Implementation</h3>
              </div>
              <p class="text-gray-600">
                Engineering teams have all the necessary documentation and context to implement your POC efficiently and securely.
              </p>
            </div>
          </div>
        </section>

        <!-- Security Tiers -->
        <section class="mb-12">
          <h2 class="text-3xl font-bold mb-6">Security Tier System</h2>
          <p class="text-lg text-gray-700 mb-8">
            Our tier-based classification system ensures that every POC receives appropriate security review based on its potential impact and data handling requirements.
          </p>
          
          <div class="space-y-6">
            <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
              <div class="flex items-center mb-3">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">1</div>
                <h3 class="text-xl font-semibold text-green-700">Tier 1 - Client-Side Only</h3>
              </div>
              <p class="text-gray-600 mb-3">
                UI/UX modifications, static content changes, and client-side functionality that doesn't interact with servers or process data.
              </p>
              <p class="text-sm text-gray-500">
                <strong>Examples:</strong> Button styling, layout changes, static page content, CSS modifications
              </p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
              <div class="flex items-center mb-3">
                <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mr-3">2</div>
                <h3 class="text-xl font-semibold text-yellow-700">Tier 2 - Data Consumption</h3>
              </div>
              <p class="text-gray-600 mb-3">
                Read-only API calls, external service integrations, and data display functionality that consumes but doesn't modify data.
              </p>
              <p class="text-sm text-gray-500">
                <strong>Examples:</strong> Analytics dashboards, external API integrations, data visualization, reporting features
              </p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500">
              <div class="flex items-center mb-3">
                <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-3">3</div>
                <h3 class="text-xl font-semibold text-orange-700">Tier 3 - Data Manipulation</h3>
              </div>
              <p class="text-gray-600 mb-3">
                Write operations, user data handling, form submissions, and functionality that creates, updates, or deletes data.
              </p>
              <p class="text-sm text-gray-500">
                <strong>Examples:</strong> User profile updates, content management, form processing, data entry systems
              </p>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
              <div class="flex items-center mb-3">
                <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-3">4</div>
                <h3 class="text-xl font-semibold text-red-700">Tier 4 - Critical Systems</h3>
              </div>
              <p class="text-gray-600 mb-3">
                Authentication systems, payment processing, sensitive data handling, and security-critical functionality.
              </p>
              <p class="text-sm text-gray-500">
                <strong>Examples:</strong> Login systems, payment gateways, personal data processing, security features
              </p>
            </div>
          </div>
        </section>

        <!-- Benefits -->
        <section class="mb-12">
          <h2 class="text-3xl font-bold mb-6">Benefits</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">Faster Implementation</h3>
              <p class="text-gray-600">Streamlined process reduces time from concept to production</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">Enhanced Security</h3>
              <p class="text-gray-600">Tier-based classification ensures appropriate security measures</p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold mb-2">Better Documentation</h3>
              <p class="text-gray-600">Comprehensive documentation for all POC implementations</p>
            </div>
          </div>
        </section>

        <!-- Get Started -->
        <section class="bg-blue-500 text-white rounded-lg p-8 text-center">
          <h2 class="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p class="text-blue-100 mb-6">
            Submit your POC today and see how our streamlined process can help bring your ideas to production.
          </p>
          <NuxtLink 
            to="/submit" 
            class="bg-white text-blue-500 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium inline-block"
          >
            Submit Your POC
          </NuxtLink>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
// Set page meta
useHead({
  title: 'About - POC Flow',
  meta: [
    {
      name: 'description',
      content: 'Learn about POC Flow, our comprehensive POC evaluation and handoff system with tier-based security classification.'
    }
  ]
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>