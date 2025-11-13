<template>
  <div ref="chartContainer"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Highcharts from 'highcharts'
import ArcDiagramModule from 'highcharts/modules/arc-diagram'
import { useDataStore } from '../../stores/dataStore'
import { getInteractionColor } from '../../utils/chartHelpers'
import { INTERACTION_TYPES } from '../../utils/constants'

ArcDiagramModule(Highcharts)

const dataStore = useDataStore()
const chartContainer = ref(null)
let chart = null

const updateChart = () => {
  if (!chartContainer.value) return

  const filteredData = dataStore.filteredInteractions

  if (filteredData.length === 0) {
    if (chart) {
      chart.destroy()
      chart = null
    }
    // Show empty state message
    chartContainer.value.innerHTML = '<div style="text-align: center; padding: 100px 20px; color: #6e6e73; font-size: 19px;">No interactions found. Try adjusting the threshold or interaction type filters.</div>'
    return
  }

  // Prepare data for arc diagram
  const nodes = new Set()
  const links = []

  filteredData.forEach(interaction => {
    nodes.add(interaction.id1)
    nodes.add(interaction.id2)

    links.push({
      from: interaction.id1,
      to: interaction.id2,
      weight: interaction.frameCount,
      consistency: interaction.consistency,
      types: interaction.typesArray.join('; ')
    })
  })

  // Create nodes array
  const nodesArray = Array.from(nodes).map(id => ({
    id: id,
    name: id,
    color: id.startsWith('A-') ? '#3B6EF5' : '#FF8A4C',
    dataLabels: {
      enabled: true,
      format: '{point.name}',
      style: {
        fontSize: '11px',
        fontWeight: '600',
        textOutline: 'none',
        color: '#1d1d1f'
      },
      rotation: -90,
      align: 'left',
      verticalAlign: 'middle',
      y: 10,
      x: 0
    }
  }))

  // Sort nodes
  nodesArray.sort((a, b) => {
    if (a.id.startsWith('A-') && !b.id.startsWith('A-')) return -1
    if (!a.id.startsWith('A-') && b.id.startsWith('A-')) return 1
    const numA = parseInt(a.id.match(/\d+/)?.[0] || '0')
    const numB = parseInt(b.id.match(/\d+/)?.[0] || '0')
    return numA - numB
  })

  if (chart) {
    chart.destroy()
  }

  chart = Highcharts.chart(chartContainer.value, {
    chart: {
      type: 'arcdiagram',
      backgroundColor: 'transparent',
      height: 850,
      marginBottom: 100,
      marginTop: 80
    },
    title: {
      text: `Residue Interaction Network (${filteredData.length} interactions)`,
      style: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#1d1d1f'
      }
    },
    subtitle: {
      text: `Chain A (blue) ↔ Chain B (orange) | Threshold: ${Math.round(dataStore.currentThreshold * 100)}%`,
      style: {
        fontSize: '17px',
        color: '#6e6e73'
      }
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      arcdiagram: {
        linkWeight: 2,
        centeredLinks: true,
        reversed: false,
        marker: {
          fillOpacity: 1,
          lineWidth: 3,
          lineColor: '#ffffff',
          radius: 18,
          states: {
            hover: {
              radius: 22,
              lineWidth: 3
            }
          }
        },
        states: {
          hover: {
            linkOpacity: 1,
            opacity: 1
          }
        }
      }
    },
    series: [{
      keys: ['from', 'to', 'weight'],
      type: 'arcdiagram',
      name: 'Interactions',
      nodes: nodesArray,
      data: links.map(link => ({
        from: link.from,
        to: link.to,
        weight: link.weight,
        color: getInteractionColor(link.types, link.consistency, dataStore.currentColorScheme),
        consistency: link.consistency,
        types: link.types
      })),
      linkOpacity: 0.75,
      offset: '100%',
      dataLabels: {
        enabled: false
      }
    }],
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#d2d2d7',
      useHTML: true,
      formatter: function() {
        if (this.point.from) {
          return `
            <div style="padding: 10px;">
              <div style="font-size: 15px; color: #1d1d1f; font-weight: 600; margin-bottom: 8px;">
                ${this.point.from} ↔ ${this.point.to}
              </div>
              <div style="margin-bottom: 4px;">
                <span style="color: #1d1d1f; font-weight: 600;">Consistency: ${Math.round(this.point.consistency * 100)}%</span>
              </div>
              <div style="margin-bottom: 4px;">
                <span style="color: #6e6e73;">Frames: ${this.point.weight} / ${dataStore.totalFrames}</span>
              </div>
              <div style="color: #6e6e73; font-size: 12px; margin-top: 6px; padding-top: 6px; border-top: 1px solid #e8e8ed;">
                ${this.point.types}
              </div>
            </div>
          `
        }
        return false
      }
    }
  })
}

onMounted(() => {
  updateChart()
})

watch([
  () => dataStore.currentChartType,
  () => dataStore.currentThreshold,
  () => dataStore.filteredInteractions.length,
  () => dataStore.currentColorScheme,
  () => dataStore.selectedInteractionTypes.size
], () => {
  if (dataStore.currentChartType === 'arc') {
    updateChart()
  }
}, { deep: true })
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>

