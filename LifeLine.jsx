import React from 'react';
import { Tooltip } from 'react-tippy';
import './lifeline.css';
import 'react-tippy/dist/tippy.css'

const barWidth = (count,total) => (Math.floor((count/total) * 50) || 1) * 2;

const LifeLine = ({visible,status}) => {
  let bars;
  let sanitised_data;
  if(!status){
    bars = (<div className="life-line-bar ll-loading">Loading...</div>);
  } else {

    sanitised_data = {
      safe: status.safe,
      hospitalised: status.hospitalised,
      fatality: status.fatality,
      unaccounted: status.unaccounted + (status.confirmedMissing || 0)
    }

    let total = sanitised_data.safe + sanitised_data.hospitalised + sanitised_data.fatality + sanitised_data.unaccounted || 0;

    //Sort Keys in ascending order
    let sortedKeys = Object.keys(sanitised_data).sort((a,b)=>{
      if(sanitised_data[a] < sanitised_data[b]) return -1;
      if(sanitised_data[a] > sanitised_data[b]) return 1;
      return 0;
    });
    // Define the largest key and the rest
    let maxKey = sortedKeys[sortedKeys.length-1];
    let otherKeys = sortedKeys.slice(0,sortedKeys.length-1);

    let weighted = {
      safe: 1,
      hospitalised:1,
      fatality:1,
      unaccounted:1
    }

    otherKeys.map(key=>{
      weighted[key] = barWidth(status[key],total);
    });

    weighted[maxKey] = otherKeys.reduce((acc,key)=>acc-weighted[key],100);

    bars = (
      <div>
        <div className="life-line-bar ll-safe" style={{width: weighted.safe + '%'}}>{sanitised_data.safe}</div>
        <div className="life-line-bar ll-hospitalised" style={{width: weighted.hospitalised + '%'}}>{sanitised_data.hospitalised}</div>
        <div className="life-line-bar ll-fatality" style={{width: weighted.fatality + '%'}}>{sanitised_data.fatality}</div>
        <div className="life-line-bar ll-unaccounted ll-striped" style={{width: weighted.unaccounted + '%'}}>{sanitised_data.unaccounted}</div>
      </div>
    );
  }
  
  let tooltip = status ? (
    <div>
      Safe: {status.safe}
      <br/>Hospitalised: {status.hospitalised}
      <br/>Fatality: {status.fatality}
      <br/>Unaccounted: {status.unaccounted} + {isNaN(status.confirmedMissing) ? '?' : status.confirmedMissing } confirmed missing
    </div>
  ) : (<div> Loading... </div>);

  return (<Tooltip html={tooltip} animation="shift" arrow arrowSize="small" delay={500}>
      <div className={`life-line${visible ? '' : ' hidden'}`}>{bars}</div>
  </Tooltip>)
};

export default LifeLine;
