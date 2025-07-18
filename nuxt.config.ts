// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // CSS Framework and Styling
  css: [
    '@rds-vue-ui/rds-theme-base/dist/css/rds-theme-base.css',
    '~/assets/css/main.css'
  ],
  
  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@pinia/nuxt'
  ],

  // Component auto-discovery
  components: [
    {
      path: '~/components',
      pathPrefix: false
    },
    {
      path: '~/node_modules/@rds-vue-ui/',
      ignore: ['**/index.ts', '**/index.js', '**/node_modules']
    }
  ],
  
  // TypeScript configuration
  typescript: {
    strict: true
  },
  
  // Runtime config for API integrations
  runtimeConfig: {
    // Private keys (only available on server-side)
    jiraApiKey: process.env.JIRA_API_KEY,
    codaApiKey: process.env.CODA_API_KEY,
    
    // Public keys (exposed to client-side)
    public: {
      jiraBaseUrl: process.env.JIRA_BASE_URL,
      codaBaseUrl: process.env.CODA_BASE_URL
    }
  }
})
