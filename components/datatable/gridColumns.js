import {
  LinkCell,
  BooleanDataCell
} from 'common/dataTable/Cells';

import { toDate } from 'lib/formatter';

import {objectValuesToString} from 'lib/utils';

export default (masterlistCell)=>[
  {
    name:"Start Date",
    field:"startDate",
    cell:{
      props:{
        formatter:toDate
      }
    },
    width:130
  },
  {
    name:"End Date",
    field:"endDate",
    cell:{
      props:{
        formatter:toDate
      }
    },
    width:130
  },
  {
    name:"Name",
    field:"name",
    cell:{
      component:LinkCell,
      props:{
        idField:'id',
        route:'/incident'
      }
    },
    width:130,
    flexGrow:1
  },
  {
    name:"Location",
    field:"location",
    cell:{
      props:{
        formatter:objectValuesToString
      }
    },
    width:130,
    flexGrow:1
  },
  {
    name:"Severity",
    field:"severity",
    width:130
  },
  {
    name:"Drill",
    field:"isDrill",
    cell:{
      component:BooleanDataCell
    },
    width:130,
  },
  {
    name:"Master List",
    field:'masterlist',
    suppressFilter:true,
    cell:{
      custom:masterlistCell
    },
    width:90
  },
  {
    width:17
  }
]
