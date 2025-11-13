/**
 * Chart helper functions
 */
import { COLOR_SCHEMES } from './constants'

/**
 * Get color for interaction type based on current color scheme
 */
export function getInteractionColor(types, consistency, colorScheme = 'classic') {
  const typeString = types.toLowerCase()
  const scheme = COLOR_SCHEMES[colorScheme] || COLOR_SCHEMES.classic
  let baseColor
  
  if (typeString.includes('h-bond')) {
    baseColor = scheme['h-bond']
  } else if (typeString.includes('salt-bridge') || typeString.includes('salt bridge')) {
    baseColor = scheme['salt-bridge']
  } else if (typeString.includes('pi-pi') || typeString.includes('π-π')) {
    baseColor = scheme['pi-pi']
  } else if (typeString.includes('cation') || typeString.includes('anion')) {
    baseColor = scheme['cation-anion-pi']
  } else if (typeString.includes('ch-o') || typeString.includes('c-h')) {
    baseColor = scheme['ch-on']
  } else if (typeString.includes('halogen')) {
    baseColor = scheme['halogen']
  } else if (typeString.includes('vdw') || typeString.includes('apolar') || typeString.includes('polar')) {
    baseColor = scheme['vdw']
  } else if (typeString.includes('proximal')) {
    baseColor = scheme['proximal']
  } else if (typeString.includes('clash')) {
    baseColor = scheme['clash']
  } else {
    baseColor = scheme['h-bond'] // Default
  }
  
  const opacity = 0.3 + (consistency * 0.6)
  return `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${opacity})`
}

/**
 * Check if interaction matches selected types
 */
export function matchesSelectedTypes(interactionTypes, selectedTypes, interactionTypeList) {
  if (selectedTypes.size === 0) return false
  
  const typesLower = interactionTypes.toLowerCase()
  
  for (const typeId of selectedTypes) {
    const type = interactionTypeList.find(t => t.id === typeId)
    if (type) {
      for (const keyword of type.keywords) {
        if (typesLower.includes(keyword.toLowerCase())) {
          return true
        }
      }
    }
  }
  return false
}

/**
 * Export INTERACTION_TYPES for use in components
 */
export { INTERACTION_TYPES } from './constants'

