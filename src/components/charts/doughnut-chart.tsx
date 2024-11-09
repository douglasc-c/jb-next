import { useRef, useEffect } from 'react'
import * as d3 from 'd3'

interface DoughnutChartProps {
  labels: string[]
  data: number[]
  colors: string[]
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  labels,
  data,
  colors,
}) => {
  const chartRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const width = 230
    const height = 230
    const radius = Math.min(width, height) / 2

    const svg = d3.select(chartRef.current)
    svg.selectAll('*').remove()

    const arc = d3
      .arc<d3.PieArcDatum<number>>()
      .innerRadius(radius - 40)
      .outerRadius(radius)

    const pie = d3
      .pie<number>()
      .sort(null)
      .value((d) => d)

    const arcs = pie(data)

    svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`)
      .selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', arc as any)
      .attr('fill', (_, i) => colors[i])
      .attr('stroke-width', 2)
  }, [data, colors])

  return (
    <div className="">
      <svg ref={chartRef} />
    </div>
  )
}

export default DoughnutChart
