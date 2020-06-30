import { gql } from 'apollo-boost';

export const GET_ALL_PROJECT = gql`
query GetAllProjects(
  $startDate: String = null
  $endDate: String = null
  $pageNumber: ID!
  $sectorIds: [ID] = null
  $coreareaIds: [ID] = null
  $stateIds: [ID] = null
){
    getAllProjects(
     filters:{
      startDate:$startDate
      endDate:$endDate
      pageNumber:$pageNumber
      sectorIds:$sectorIds
      coreareaIds:$coreareaIds
      stateIds:$stateIds
     }
    )
  {
    pageInfo{
      currentPage
      pageSize
      totalPages
    }
    projects{
      address
      budget
      creationDate
      projectId
      states{
        latitude
        longitude
        state
        stateId
      }
      status
      title
      totalSpend

    }
  }
}
`;

export const LOAD_PROJECT_DETAIL = gql`
  query LoadProjectById(
    $projectId:ID
  ){
    loadProjectById(
    projectId:$projectId
  ){
    address
    beneficiaries
    budget
    title
    projectedFinishDate
    projectedStartDate
    organisations{
      orgId
      organisation
    }
  }
  }
`;

export const LOAD_PROJECT_BY_ID = gql`
query LoadProjectById(
  $projectId:ID
){
  loadProjectById(
    projectId:$projectId
  ){
    address
    approvedBy
    approvedDate
    beneficiaries
    budget
    coreareas{
      coreArea
      coreAreaId
    }
    createdBy
    creationDate
    disbursements{
    lgaSpend{
      lgaId
      lgaName
      spend{
        addedBy
        dateDisbursed
        spendAmount
      }
      totalLgaSpend
    }
    state
    stateId
    totalStateSpend
  }
  feedback{
    feebackSpan
  feedBackDate
  feedbackId
  message
  responses{
    email
    feedbackId
    response
    responseDate
    responseId
    responseSpan
  }
  userEmail
  }
  milestones{
    milestoneId
    status
    title
    weight
  }
  organisations{
    organisation
    orgId
  }
  orgId
  projectDescription
  projectId
  sectors{
    colorCode
    primarySector
    sectorId
    sectorName
  }
  stateBudgetInfo{
    lgaCount
    lgas{
    budget
    communities
    contractor
    contractorAddress
    contractorRcNo
    lga
    lgaId
    projectLgaCode
  }
  projectStateCode
  state
  stateId
  stateName
}
status
title
  }
}
`;

export const LOAD_SUB_PROJECT_BY_ID = gql`
query LoadSubProjectById(
  $projectId:ID
){
  loadSubProjectById(
    projectId:$projectId
    ){
  budget
  disbursed
  latitude
  longitude
  progress
  state
  stateCode
  stateId
}
}
`;

export const LOAD_SUB_PROJECT_BY_STATE_ID = gql`
  query LoadSubProjectByStateId(
    $projectId: ID,
    $stateId: ID
  ){
    loadSubProjectByStateId(
      projectId:$projectId,
      stateId: $stateId
    ){
      stateBudget
      stateDisbursed
      stateProgress
      lgas{
        budget
        communities
        contractor
        disbursed
        latitude
        lga
        lgaId
        longitude
        progress
        projectLgaCode
        state
      }
    }
  }
`;


export const LOAD_PROJECT_BY_LGA_ID = gql`
  query LoadSubProjectLGAId(
    $projectId: ID,
    $lgaId: ID
  ){
    loadSubProjectLGAId(
      projectId:$projectId,
      lgaId:$lgaId
    ){
      feedbacks{
        feebackSpan
        feedBackDate
        feedbackId
        message
        responses{
          username
          feedbackId
          response
          responseDate
          responseId
          responseSpan
        }
      username
      }

      loadLgaMilestone{
          milestoneId
          status
          title
          weight
      }
      loadLgaSpend{
          addedBy
          dateDisbursed
          spendAmount
      }
      project{
        budget
        communities
        contractor
        disbursed
        latitude
        lga
        lgaId
        longitude
        progress
        projectLgaCode
        state
      }
    }
  }
`;


export const LOAD_FILTER = gql`
{
  loadProjectFilter{
    coreAreas{
      coreAreaLongName
      id
    }
    organisations{
      longName
      id
    }
    sectors{
      sectorName
      id
    }
    states{
      state
      stateId
    }
  }
}
`;

