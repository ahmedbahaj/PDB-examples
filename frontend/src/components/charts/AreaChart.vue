<template>
  <div ref="chartContainer"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Highcharts from 'highcharts'
import { useDataStore } from '../../stores/dataStore'

const dataStore = useDataStore()
const chartContainer = ref(null)
let chart = null

const updateChart = () => {
  if (!chartContainer.value) return

  if (!dataStore.areaData || dataStore.areaData.length === 0) {
    if (chart) {
      chart.destroy()
      chart = null
    }
    chartContainer.value.innerHTML = '<div style="text-align: center; padding: 100px 20px; color: #6e6e73; font-size: 19px;">No area data available for this system.</div>'
    return
  }

  const categories = dataStore.areaData.map(d => `Frame ${d.frame}`)
  const totalBSAData = dataStore.areaData.map(d => d.totalBSA)
  const polarBSAData = dataStore.areaData.map(d => d.polarBSA)
  const nonPolarBSAData = dataStore.areaData.map(d => d.nonPolarBSA)

  if (chart) {
    chart.destroy()
  }

  chart = Highcharts.chart(chartContainer.value, {
    chart: {
      type: 'line',
      backgroundColor: 'transparent',
      height: 650
    },
    title: {
      text: 'Total Buried Surface Area Across Frames',
      style: {
        fontSize: '24px',
        fontWeight: '600',
        color: '#1d1d1f'
      }
    },
    subtitle: {
      text: 'Total, POLAR, and NON POLAR Buried Surface Area (Å²)',
      style: {
        fontSize: '17px',
        color: '#6e6e73'
      }
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: categories,
      title: {
        text: 'Frame Index (Time)',
        style: {
          fontSize: '15px',
          fontWeight: '600',
          color: '#1d1d1f'
        }
      },
      labels: {
        style: {
          fontSize: '12px',
          fontWeight: '500',
          color: '#1d1d1f'
        }
      }
    },
    yAxis: {
      title: {
        text: 'Total Buried Surface Area (Å²)',
        style: {
          fontSize: '15px',
          fontWeight: '600',
          color: '#1d1d1f'
        }
      },
      labels: {
        style: {
          fontSize: '12px',
          fontWeight: '500',
          color: '#1d1d1f'
        }
      }
    },
    legend: {
      align: 'center',
      verticalAlign: 'top',
      layout: 'horizontal',
      itemStyle: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#1d1d1f'
      }
    },
    plotOptions: {
      line: {
        lineWidth: 3,
        marker: {
          enabled: true,
          radius: 5,
          lineWidth: 2,
          lineColor: '#ffffff'
        },
        states: {
          hover: {
            lineWidth: 4
          }
        }
      }
    },
    series: [{
      name: 'Total BSA',
      data: totalBSAData,
      color: '#3B6EF5',
      dashStyle: 'Solid',
      marker: {
        symbol: 'circle'
      }
    }, {
      name: 'Total POLAR Buried Area',
      data: polarBSAData,
      color: '#FF3B30',
      dashStyle: 'Dash',
      marker: {
        symbol: 'square'
      }
    }, {
      name: 'Total NON POLAR Buried Area',
      data: nonPolarBSAData,
      color: '#34C759',
      dashStyle: 'Dot',
      marker: {
        symbol: 'triangle'
      }
    }],
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#d2d2d7',
      shared: true,
      useHTML: true,
      formatter: function() {
        let html = `<div style="padding: 10px;">`
        html += `<div style="font-size: 15px; color: #1d1d1f; font-weight: 600; margin-bottom: 8px;">${this.x}</div>`
        
        const sortedPoints = this.points.sort((a, b) => b.y - a.y)
        sortedPoints.forEach(point => {
          html += `
            <div style="margin-bottom: 4px;">
              <span style="color: ${point.color}; font-weight: 600;">●</span>
              <span style="color: #1d1d1f;">${point.series.name}: </span>
              <span style="color: #1d1d1f; font-weight: 600;">${point.y.toFixed(2)} Å²</span>
            </div>
          `
        })
        html += '</div>'
        return html
      }
    }
  })
}

onMounted(() => {
  updateChart()
})

watch([
  () => dataStore.currentChartType,
  () => dataStore.areaData.length
], () => {
  if (dataStore.currentChartType === 'area') {
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

