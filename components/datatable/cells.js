/**
 * Thesec components are used to fill the body of the fixed data tables
 * 
 * @module Common/Cell Components
 */

// Node Modules
import React from 'react';
import {Cell} from 'fixed-data-table-2';
import Link from 'react-router/lib/Link';

// Common Components
import {Button} from 'common/Buttons';

import {genStatusIcon} from 'lib/contentGenerators';

// CSS
import './cells.css';

// Helper Functions
const defaultFormatter = x=>x;
const formatCallObject = (call)=>`${call.outstanding}/${call.incoming}`;

// Exports
export {
  DataCell,
  CallCell,
  BooleanDataCell,
  LinkCell,
  ButtonCell,
  CheckCell,
  ApproveCell,
  UrgentCell
};


/**
 * Basic Data Cell
 * 
 * This object will take data, a row index and a field and present that data.
 * The data can be manipulated by a factory function that produces a valid react
 * object child
 * 
 * @class DataCell
 * @param {JSXProps} {rowIndex, height=45, data, 
 *    field, formatter = defaultFormatter} 
 */
const DataCell = ({rowIndex, height=45, data, field, formatter = defaultFormatter})=>(
  <Cell className="test" height={height}>{formatter(data[rowIndex][field],rowIndex,data)}</Cell>
);

/**
 * UrgentCell Cell
 * 
 * This object will take data, a row index and a field and present that data.
 * This works specifically with the urgency row to enable extra formatting
 * dependent on urgency
 * 
 * @class UrgentCell
 * @param {JSXProps} {rowIndex, height=45, data, 
 *    field} 
 */
const UrgentCell = ({rowIndex, height=45, data, field})=>{
  let call_data = data[rowIndex][field];
  let urgent_class = call_data === 'Yes' ? 'calls urgent' : 'calls';

  return(
    <Cell height={height} width={'100%'}>
      <div className={urgent_class}>
        {call_data}
      </div>
    </Cell>
  )
};

/**
 * Call Cell
 * 
 * This object will take data, a row index and a field and present that data.
 * This works specifically with the Call Logs row to enable extra formatting
 * dependent on urgency
 * 
 * @class CallCell
 * @param {JSXProps} {rowIndex, height=45, data, 
 *    field} 
 */
const CallCell = ({rowIndex, height=45, data, field})=>{
  let call_data = data[rowIndex][field];
  let urgent_class = call_data.urgent === 'Yes' ? 
    'calls urgent' : 
    'calls';

  return(
    <Cell height={height} width={'100%'}>
      <div className={urgent_class}>
      {formatCallObject(call_data)}
      </div>
    </Cell>
  )
};

/**
 * Optimised Boolean Data Cell
 * 
 * Replaces boolean data with "Yes" or "No"
 * 
 * @class BooleanDataCell
 * @extends {React.Component}
 */
class BooleanDataCell extends React.Component {

  /**
   * Props are only updated if the row has changed (since the same may be 
   * reused) or if the data being represented has changed
   * 
   * @param {any} nextProps 
   * @memberof BooleanDataCell
   */
  shouldComponentUpdate(nextProps){
    let props = this.props;
    let field = this.props.field;
    if(props.rowIndex !== nextProps.rowIndex){
      return true;
    } else if(props.data[props.rowIndex][field] !== nextProps.data[nextProps.rowIndex][field]){
      return true;
    } else {
      return false;
    }
  }

  /**
   * Render Method
   * 
   * @memberof BooleanDataCell
   */
  render() {
    const {rowIndex, data, field} = this.props;
    return (
      <Cell height={50}>{data[rowIndex][field] ? 'Yes' : 'No'}</Cell>
    );
  }
}

/**
 * Link Cell
 * 
 * Creates a React Router Link within a cell for routing around the application
 * 
 * @class LinkCell
 * @extends {React.Component}
 */
class LinkCell extends React.Component {

  shouldComponentUpdate(nextProps){
    let props = this.props;
    let field = this.props.field;
    if(props.rowIndex !== nextProps.rowIndex){
      return true;
    } else if(props.data[props.rowIndex][field] !== nextProps.data[nextProps.rowIndex][field]){
      return true;
    } else {
      return false;
    }
  }

  render() {
    const {rowIndex, data, field, idField, route} = this.props;
    const link = route + '/' + data[rowIndex][idField];
    return (
      <Cell height={50}>
        <Link to={link}>{data[rowIndex][field]}
      </Link></Cell>
    );
  }
}


/**
 * Button Cell
 * 
 * Cell that replaces it's content with a button, if there are any children
 * passed to the cell then they will be put in the button, else it will render
 * the text within data[rowIndex][field]
 * 
 * @class ButtonCell
 * @extends {React.Component}
 */
class ButtonCell extends React.Component {

  shouldComponentUpdate(nextProps){
    let props = this.props;
    let field = this.props.field;
    if(props.rowIndex !== nextProps.rowIndex){
      return true;
    } else if(props.data[props.rowIndex][field] !== nextProps.data[nextProps.rowIndex][field]){
      return true;
    } else {
      return false;
    }
  }

  render() {
    const {rowIndex, data, field, idField, route, children, title} = this.props;
    const link = route + '/' + data[rowIndex][idField];
    return (
      <Link to={link}>
        <Button title={title}>
          {children ? children : data[rowIndex][field]}
        </Button>
      </Link>
    );
  }
}

/**
 * Check Cell
 * 
 * Creates a checkbox cell, it requires an Id field to pass as a parameter when
 * the prop function "onChecked" is called
 * 
 * @class CheckCell
 * @extends {React.Component}
 */
class CheckCell extends React.Component {

  // Dropping this as we have a missing hook
  // shouldComponentUpdate(nextProps){
  //   let props = this.props;
  //   let {checklist,field} = this.props;
  //   let id = props.data[props.rowIndex][props.idField];
  //   let nextId = nextProps.data[nextProps.rowIndex][nextProps.idField];
  //   if(checklist[id] !== nextProps.checklist[nextId]){
  //     return true
  //   } if(props.rowIndex !== nextProps.rowIndex){
  //     return true;
  //   } else if(props.data[props.rowIndex][field] !== nextProps.data[nextProps.rowIndex][field]){
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    const {rowIndex, data, idField, onChecked, checklist,height=50,width=40} = this.props;
    const id = data[rowIndex][idField];
    return (
      <Cell height={height} width={width}>
					<div className="data-cell-align">
          <input type="checkbox" checked={checklist[id]||false}
            onChange={e=>onChecked({id:id,value:e.target.checked})}/>
					</div>
      </Cell>
    );
  }
}


/**
 * Approve Cell
 * 
 * Bespoke Cell for showing status in SLS
 * 
 * @class ApproveCell
 * @param {any} {rowIndex, data, field} 
 * @returns {JSXElement}
 */
const ApproveCell = ({rowIndex, data, field}) => {
    const status = data[rowIndex][field];
    const checkbox = genStatusIcon(status,20);

    return (
      <Cell width={50} height={50} className="data-cell-align">
        {checkbox}
      </Cell>
    );
  }

