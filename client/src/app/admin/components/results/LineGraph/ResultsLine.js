import React from 'react'
import LineChart, { parseFlatArray } from 'react-linechart'

const ResultsLine = ({ lineData }) => {
  const createChartData = (lineData) => {
    const staffData = lineData.filter(result => result.surveyName === 'participant')
    const managerData = lineData.filter(result => result.surveyName === 'management')

    const average = (data, staff = false) => data.reduce((obj, curr) => {
      obj.p1 += (curr.p1 / (staff ? staffData.length : managerData.length))
      obj.p2 += (curr.p2 / (staff ? staffData.length : managerData.length))
      obj.p3 += (curr.p3 / (staff ? staffData.length : managerData.length))
      obj.p4 += (curr.p4 / (staff ? staffData.length : managerData.length))
      obj.p5 += (curr.p5 / (staff ? staffData.length : managerData.length))
      obj.p6 += (curr.p6 / (staff ? staffData.length : managerData.length))
      return obj
    }, { p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, p6: 0 })

    const averageStaff = average(staffData, true)
    const averageManager = average(managerData)
    const results = Array(6).fill(0).map((skill, i) => ({ Skill: i + 1, Manager: averageManager[`p${i + 1}`] - 1, Staff: averageStaff[`p${i + 1}`] - 1 }))
    return results

  }
  const chartData = parseFlatArray(createChartData(lineData), 'Skill', ['Manager', 'Staff'])

  return (
    <LineChart
      showLegends
      legendPosition="bottom-right"
      width={620}
      height={400}
      data={chartData}
      hideXLabel
      yMin="0"
      yMax="5"
      yLabel="Average Rating"
      ticks={6}
    />
  )
}
export default ResultsLine

