import React from 'react';
import PropTypes from 'prop-types';
import { FilterHeader } from 'common/dataTable/Headers';
import { DataCell } from 'common/dataTable/Cells';
import {Table, Column, Cell} from 'fixed-data-table-2';
import * as Svg from 'common/SVGs';
import { areEqualShallow } from 'lib/utils';

import './gridcomponent.css';

export default class GridComponent extends React.Component {
  constructor(props) {
    super(props);
    this.filterChange = this.filterChange.bind(this);
    this.sortChange = this.sortChange.bind(this);
    this.refreshGrid = this.refreshGrid.bind(this);
  }

  componentDidMount(){
    if(this.props.responsive){
      this.refreshGrid();
      window.addEventListener('resize',this.refreshGrid)
    }
  }

  componentWillUnmount(){
    if(this.props.responsive) window.removeEventListener('resize',this.refreshGrid)
  }

  shouldComponentUpdate(nextProps){
    let props = this.props;
    if(!areEqualShallow(props.filter,nextProps.filter)){
      return true;
    }
    if(!areEqualShallow(props.sort,nextProps.sort)){
      return true;
    }
    if(props.data.length !== nextProps.data.length){
      return true;
    } else {
      if(!areEqualShallow(props.data.map(d=>d.id),nextProps.data.map(d=>d.id))){
        return true;
      }
    }
    return props.data.reduce((acc,val,i)=>!areEqualShallow(val,nextProps.data[i]),false);
  }

  filterChange(e){
    this.props.onFilter({[e.target.id.match(/(.*)Header$/)[1]] : e.target.value});
  }

  sortChange(id){
    this.props.onSort(id.match(/(.*)Header$/)[1]);
  }

  refreshGrid(){
    this.forceUpdate();
  }

  render(){
    let {
      data,
      isLoaded,
      responsive,
      header,
      rowHeight=50,
      headerHeight=40,
      columns,
    } = this.props;

    //We steal the width and height directly from the container
    let width = this.refs._gridContainer ?
      this.refs._gridContainer.clientWidth : 0;
    let height = this.refs._gridContainer ?
      this.refs._gridContainer.clientHeight : 0;

    return(
      <div className="data-grid-layout">
        <div className="data-grid-heading">
          {header}
        </div>
        <div ref="_gridContainer"
          className={`data-grid-${responsive?'flex':'static'}`}>
          {!isLoaded ? <div className="data-grid-loader"> <Svg.loaderloading_animate height="100px" width="100px" fill="#737373"/></div> :
          <Table touchScrollEnabled rowHeight={rowHeight} rowsCount={data.length}
            width={width} height={height} headerHeight={headerHeight}>
            {columns.map((column,index)=>{
                let columnProps = {};

                columnProps.key = `_gridContainer${index}`
                columnProps.width = column.width || 90;
                columnProps.flexGrow = column.flexGrow || 0;

                if(!column.name) return <Column {...columnProps}/>
                //By default, use a filter header
                if(!column.header){
                  if(column.suppressFilter){
                    columnProps.header = <Cell className="data-cell-align">{column.name}</Cell>
                  } else {
                    columnProps.header = <FilterHeader
                      id={`${column.field}Header`}
                      placeholder={column.name}
                      value={this.props.filter[column.field]}
                      sort={this.props.sort[column.field]}
                      onFilter={this.filterChange}
                      onSort={this.sortChange}
                    />
                  }
                } else {
                  columnProps.header = column.header;
                }

                //Select the kind of cell required
                if(column.cell){
                  if(column.cell.custom){
                    columnProps.cell = column.cell.custom;
                  } else {
                    let CellComponent = column.cell.component || DataCell;
                    let cellProps = column.cell.props || {};
                    columnProps.cell=<CellComponent data={data} field={column.field} {...cellProps}/>
                  }
                } else {
                  columnProps.cell=<DataCell data={data} field={column.field}/>
                }

                return (<Column {...columnProps}/>)
            })}
          </Table>}

        </div>
      </div>
    );
  }


}

GridComponent.propTypes = {
  data: PropTypes.array.isRequired,
  filter: PropTypes.object.isRequired,
  sort: PropTypes.object.isRequired,
  responsive: PropTypes.bool,
  rowHeight: PropTypes.number,
  onSort: PropTypes.func,
  onFilter: PropTypes.func
}
