<template>
  <div class="sidebar">
    <div class="sidebar-title">Analysis Systems</div>
    <button class="upload-btn" @click="openUploadModal">+ Upload PDB File</button>
    
    <div v-if="dataStore.loading.systems" class="loading">Loading systems...</div>
    
    <div v-else class="systems-list">
      <div
        v-for="system in dataStore.systems"
        :key="system.id"
        :class="['system-item', { active: dataStore.currentSystem?.id === system.id }]"
        @click="selectSystem(system.id)"
      >
        <div class="system-name">{{ system.name }}</div>
        <div class="system-frames">{{ system.frames }} frames</div>
      </div>
    </div>

    <UploadModal ref="uploadModal" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDataStore } from '../stores/dataStore'
import UploadModal from './UploadModal.vue'

const dataStore = useDataStore()
const uploadModal = ref(null)

const selectSystem = async (systemId) => {
  await dataStore.setCurrentSystem(systemId)
}

const openUploadModal = () => {
  if (uploadModal.value) {
    uploadModal.value.open()
  }
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  background: #fbfbfd;
  border-right: 1px solid #d2d2d7;
  padding: 20px;
  overflow-y: auto;
  z-index: 1000;
}

.sidebar-title {
  font-size: 17px;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #d2d2d7;
}

.upload-btn {
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  background: #1d1d1f;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.upload-btn:hover {
  background: #000000;
  transform: translateY(-1px);
}

.loading {
  padding: 20px;
  text-align: center;
  color: #6e6e73;
}

.systems-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.system-item {
  padding: 12px 16px;
  border-radius: 12px;
  background: #ffffff;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.system-item:hover {
  background: #f5f5f7;
}

.system-item.active {
  background: #1d1d1f;
  color: #ffffff;
  border-color: #1d1d1f;
}

.system-name {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
}

.system-frames {
  font-size: 12px;
  color: #6e6e73;
}

.system-item.active .system-frames {
  color: #d2d2d7;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
    border-right: none;
    border-bottom: 1px solid #d2d2d7;
  }
}
</style>

