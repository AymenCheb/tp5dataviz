/**
 * Sets the domain of the color scale. Each type of site should have its own corresponding color.
 *
 * @param {*} color The color scale to be used
 * @param {object[]} data The data to be displayed
 */
export function colorDomain (color, data) {
  // Set the color domain
  const features = data.features
  const types = Array.from(new Set(features.map(entry => entry.properties.TYPE_SITE_INTERVENTION)))
  types.sort((a, b) => a.localeCompare(b))
  color.domain(types)
}

/**
 * Draws the map base of Montreal. Each neighborhood should display its name when hovered.
 *
 * @param {object[]} data The data for the map base
 * @param {*} path The path associated with the current projection
 * @param {Function} showMapLabel The function to call when a neighborhood is hovered
 */
export function mapBackground (data, path, showMapLabel) {
  // TODO : Generate the map background and set the hover handlers
  const features = data.features
  const map = d3.select('#map-g')
  map.selectAll('path')
    .data(features)
    .enter()
    .append('path')
    .attr('d', (d) => path(d))
    .attr('fill', 'white')
    .attr('stroke', '#a7a7a0')
    .on('mouseover', (event, d) => showMapLabel(d, path))
    .on('mouseout', () => d3.selectAll('.label-map').remove())
}

/**
 * When a neighborhood is hovered, displays its name. The center of its
 * name is positioned at the centroid of the shape representing the neighborhood
 * on the map. Called when the neighborhood is hovered.
 *
 * @param {object[]} d The data to be displayed
 * @param {*} path The path used to draw the map elements
 */
export function showMapLabel (d, path) {
  // TODO : Show the map label at the center of the neighborhood
  // by calculating the centroid for its polygon
  const map = d3.select('#map-g')
  const centroid = path.centroid(d)

  map.append('text')
    .attr('class', 'label-map')
    .attr('x', centroid[0])
    .attr('y', centroid[1])
    .attr('text-anchor', 'middle')
    .attr('font-size', 10)
    .attr('font-family', 'Oswald')
    .text(d.properties.NOM)
}

/**
 * Displays the markers for each street on the map.
 *
 * @param {object[]} data The street data to be displayed
 * @param {*} color The color scaled used to determine the color of the circles
 * @param {*} panel The display panel, which should be dislayed when a circle is clicked
 */
export function mapMarkers (data, color, panel) {
  // TODO : Display the map markers.
  // Their color corresponds to the type of site and their outline is white.
  // Their radius is 5 and goes up to 6 while hovered by the cursor.
  // When clicked, the panel is displayed.
  const features = data.features
  const markers = d3.select('#marker-g')

  markers.selectAll('circle')
    .data(features)
    .enter()
    .append('circle')
    .attr('class', 'marker')
    .attr('fill', d => color(d.properties.TYPE_SITE_INTERVENTION))
    .attr('stroke', 'white')
    .attr('r', 5)
    .on('mouseover', function () {
      d3.select(this).attr('r', 6)
    })
    .on('mouseout', function () {
      d3.select(this).attr('r', 5)
    })
    .on('click', (d) => panel.display(d.target.__data__, color(d.target.__data__.properties.TYPE_SITE_INTERVENTION)))
}
