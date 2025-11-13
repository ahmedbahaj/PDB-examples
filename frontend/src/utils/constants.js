/**
 * Constants and configuration
 */

// Color schemes
export const COLOR_SCHEMES = {
  classic: {
    'h-bond': [29, 29, 31],
    'salt-bridge': [255, 59, 48],
    'pi-pi': [175, 82, 222],
    'cation-anion-pi': [255, 149, 0],
    'ch-on': [255, 204, 0],
    'halogen': [88, 86, 214],
    'vdw': [52, 199, 89],
    'proximal': [142, 142, 147],
    'clash': [255, 45, 85]
  },
  vibrant: {
    'h-bond': [255, 0, 127],
    'salt-bridge': [255, 87, 34],
    'pi-pi': [156, 39, 176],
    'cation-anion-pi': [255, 193, 7],
    'ch-on': [76, 175, 80],
    'halogen': [3, 169, 244],
    'vdw': [0, 188, 212],
    'proximal': [158, 158, 158],
    'clash': [244, 67, 54]
  },
  pastel: {
    'h-bond': [179, 157, 219],
    'salt-bridge': [255, 183, 178],
    'pi-pi': [206, 147, 216],
    'cation-anion-pi': [255, 224, 178],
    'ch-on': [255, 245, 157],
    'halogen': [179, 229, 252],
    'vdw': [200, 230, 201],
    'proximal': [224, 224, 224],
    'clash': [255, 138, 128]
  },
  dark: {
    'h-bond': [26, 35, 126],
    'salt-bridge': [183, 28, 28],
    'pi-pi': [74, 20, 140],
    'cation-anion-pi': [230, 81, 0],
    'ch-on': [249, 168, 37],
    'halogen': [13, 71, 161],
    'vdw': [27, 94, 32],
    'proximal': [66, 66, 66],
    'clash': [136, 14, 79]
  },
  scientific: {
    'h-bond': [55, 126, 184],
    'salt-bridge': [228, 26, 28],
    'pi-pi': [152, 78, 163],
    'cation-anion-pi': [255, 127, 0],
    'ch-on': [77, 175, 74],
    'halogen': [166, 86, 40],
    'vdw': [247, 129, 191],
    'proximal': [153, 153, 153],
    'clash': [255, 255, 51]
  }
}

// Interaction types
export const INTERACTION_TYPES = [
  { id: 'h-bond', label: 'H-bond', keywords: ['h-bond'] },
  { id: 'salt-bridge', label: 'Salt-bridge', keywords: ['salt-bridge', 'salt bridge'] },
  { id: 'pi-pi', label: 'π-π interactions', keywords: ['pi-pi', 'π-π'] },
  { id: 'cation-pi', label: 'Cation-π', keywords: ['cation-π', 'cation-pi'] },
  { id: 'anion-pi', label: 'Anion-π', keywords: ['anion-π', 'anion-pi'] },
  { id: 'ch-on', label: 'CH-O/N bonds', keywords: ['ch-o', 'c-h'] },
  { id: 'ch-pi', label: 'CH-π', keywords: ['ch-π', 'ch-pi'] },
  { id: 'halogen', label: 'Halogen bonds', keywords: ['halogen'] },
  { id: 'polar-vdw', label: 'Polar vdW', keywords: ['polar vdw', 'polar_vdw'] },
  { id: 'apolar-vdw', label: 'Apolar vdW', keywords: ['apolar vdw', 'apolar_vdw'] },
  { id: 'proximal', label: 'Proximal', keywords: ['proximal'] },
  { id: 'clash', label: 'Clash', keywords: ['clash'] },
  { id: 'water', label: 'Water mediated', keywords: ['water'] },
  { id: 'metal', label: 'Metal mediated', keywords: ['metal'] },
  { id: 'ss-bond', label: 'S-S bonds', keywords: ['s-s', 'ss'] }
]

