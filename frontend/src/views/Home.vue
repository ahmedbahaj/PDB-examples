<template>
  <div class="home">
    <Sidebar />
    <div class="main-content">
      <div class="container">
        <h1>Protein Interaction Analysis</h1>
        <p class="subtitle" v-if="dataStore.currentSystem">
          {{ dataStore.currentSystem.name }} - Chain A ↔ Chain B Residue Interactions Across Frames
        </p>
        <p class="subtitle" v-else>
          Select a system to begin analysis
        </p>

        <ChartSelector />
        <ControlsPanel />
        <ChartContainer />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useDataStore } from '../stores/dataStore'
import Sidebar from '../components/Sidebar.vue'
import ChartSelector from '../components/ChartSelector.vue'
import ControlsPanel from '../components/ControlsPanel.vue'
import ChartContainer from '../components/ChartContainer.vue'

const dataStore = useDataStore()

onMounted(async () => {
  await dataStore.loadSystems()
  // Set first system as default if available
  if (dataStore.systems.length > 0 && !dataStore.currentSystem) {
    await dataStore.setCurrentSystem(dataStore.systems[0].id)
  }
})
</script>

<style scoped>
.home {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 280px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 40px;
}

h1 {
  font-size: 56px;
  line-height: 1.07143;
  font-weight: 600;
  letter-spacing: -0.005em;
  text-align: center;
  margin-bottom: 16px;
  color: #1d1d1f;
}

.subtitle {
  font-size: 24px;
  line-height: 1.16667;
  font-weight: 400;
  letter-spacing: 0.009em;
  text-align: center;
  color: #6e6e73;
  margin-bottom: 48px;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}
</style>

