import gql from 'graphql-tag'

export const GET_DASHBOARD_SUMMARY = gql`
   query {
  getDashboardSummary{

    projectForMap{
      colorCode
      lgaName
      longitude
      latitude
      projectTitle
      budget
    }

    sectorChartInfo{
      label
      projectBudget
      projectCount
    }

    stateChartInfo{
      label
      projectBudget
      projectCount
    }
    
    totalProject
    totalProjectBudget
   
}
}
`;