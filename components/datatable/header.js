/**
 * These components are used to fill the header of fixed data table
 * 
 * @module Common/Cell Header Components
 */

//Node Modules
import React from 'react';
import {Cell} from 'fixed-data-table-2';

//Common Components
import {carets as SVGCarets} from 'common/SVGs';

//CSS
import './headers.css';

// Exports
export {
  FilterHeader,
  CheckHeader
};


/**
 * Filter Header
 * 
 * Custom header which allows a column to be filtered and sorted
 * 
 * @param {props} {id,placeholder, value, sort, onFilter, onSort} 
 * @returns {JSXElement} Header Cell with a sort and a filterbox
 */
const FilterHeader = ({id,placeholder, value, sort, onFilter, onSort}) => {
  let colours = {};
  colours.up = (sort==='ASC') ?  "#CA2420" : "#474A56";
  colours.down = (sort==='DESC') ?  "#CA2420" : "#474A56";
  return(
    <Cell style={{width:'100%'}}>
      <input
        required
        id={id}
        type="text"
        placeholder={placeholder}
        value={typeof value === 'string' ? value : ''}
        className="cell-header-filter"
        onInput={onFilter}/>
      <button className="cell-header-sort" onClick={()=>{onSort(id)}}> <SVGCarets fillup={colours.up} filldown={colours.down}/> </button>
    </Cell>
  )
};


/**
 * Check Header
 * 
 * Custom header to allow a whole dataset to be selected, needs to be controlled
 * 
 * @param {props} {onCheckAll,checked} 
 * @returns {JSXElement} Header Cell with a checkbox
 */
const CheckHeader = ({onCheckAll,checked}) => {
  return(
    <Cell style={{width:'100%',height:'100%'}}>
      <div className="cell-header-align">
        <input type="checkbox" checked={checked} onChange={e=>onCheckAll(e.target.checked)} />
      </div>
    </Cell>
  )
}
