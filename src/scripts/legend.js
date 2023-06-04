import d3Legend from 'd3-svg-legend'

/**
 * Draws the color legend.
 *
 * @param {*} colorScale The color scale used for the legend
 * @param {*} g The d3 Selection of the SVG g elemnt containing the legend
 */
export function drawLegend (colorScale, g) {
  // TODO : Generate the legend
  // For help, see : https://d3-legend.susielu.com/
  const sortedLabels = colorScale.domain().sort((a, b) => a.localeCompare(b))
  g.append('g').attr('class', 'legend').attr('transform', 'translate(50, 120)')
  const legend = d3Legend.legendColor()
    .shape('circle')
    .labels(sortedLabels)
    .title('Légende')
    .scale(colorScale)
  g.select('.legend').call(legend)
}
