/*eslint-disable no-undef*/
import columns from './gridColumns.js';
import {Validator} from 'jsonschema';

let v = new Validator();
let gridSchema = {
  "id" : "/gridSchema",
  "type": "array",
  "items":{
    "type":"object",
    "properties": {
      "name" : {"type":"string"},
      "field": {"type":"string"},
      "cell": {"type":"object"},
      "width": {"type":"number"},
      "flexGrow": {"type":"number"}
    }
  }
}

describe('Incident Grid config',()=>{
  test('should have valid fields for each column',()=>{
    expect(v.validate(columns(x=>x),gridSchema).errors).toEqual([])
  })
});
