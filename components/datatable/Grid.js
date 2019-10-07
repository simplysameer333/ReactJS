/**
 * @module Components/Incidents
 */

//Node Modules
import React from 'react';

//Components
import Grid from 'components/GridComponent';
import { Button } from 'common/Buttons';
import * as Svg from 'common/SVGs';

//CSS
import 'css/fixed-data-table.min.css';

//Column Generator to feed into GridComponent
import columnGenerator from './gridColumns.js';


/**
 * Incident Grid
 * 
 * Stateless Functional Component
 * 
 * @param {any} {
 *     data,
 *     isLoaded,
 *     setActiveIncident,
 *     myRole,
 *     sort,
 *     filter,
 *     onSort,
 *     onFilter,
 *     clearFilter
 *   } 
 * @returns {JSXElement} Master List object
 */
const IncidentGrid = ({
    data,
    isLoaded,
    setActiveIncident,
    myRole,
    sort,
    filter,
    onSort,
    onFilter,
    clearFilter
  })=>{

  let masterlistCell = (props)=>{
      let active = !data[props.rowIndex]['endDate'].length;
      return (
        <Button id={data[props.rowIndex]['id']}
          title="Go to Masterlist"
          style={{
            width:'100%',
            height:'100%',
            backgroundColor:'transparent'
          }}
          to={!active && "/masterlist/"+data[props.rowIndex]['id']}
          onClick={active && setActiveIncident}
        >
          <Svg.filetable fill={active ? "#CA2420" : "#737373"}/>
        </Button>)
    }

  let columns = columnGenerator(masterlistCell);
  return(<Grid responsive
    header={
      (<div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
        <div>{ myRole.is('sla') ? <Button to="/incident" title="New Incident"> New Incident </Button> : null }</div>
        <span className="pull-right">
        <Button title="Clear Filter" type='secondary' onClick={clearFilter}> Clear Filter </Button>
        </span>
      </div>)
    }
    data={data}
    isLoaded={isLoaded}
    columns={columns}
    filter={filter}
    sort={sort}
    onSort={onSort}
    onFilter={onFilter}/>)
}

export default IncidentGrid;
