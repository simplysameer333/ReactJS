/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import LifeLine from './LifeLine';

describe("LifeLine Component",()=>{
    it("should render a loading state if there is no status",()=>{
        const lifeline = shallow(<LifeLine visible={true}/>);
        expect(
            lifeline.find('.life-line-bar').hasClass('ll-loading')
        ).toEqual(true);
    });

    it("should not render if it has not been set to visible",()=>{
        const lifeline = shallow(<LifeLine visible={false}/>);
        expect(
            lifeline.find('.life-line').hasClass('hidden')
        ).toEqual(true);
    });

    it("should render with a ToolTip wrapper",()=>{
        const lifeline = shallow(<LifeLine/>);
        expect(
            !!lifeline.find('ToolTip')
        ).toBe(true);
    });

    it("should render with all valid status bars if given a valid status object",()=>{
        const status = {
            safe: 0,
            hospitalised: 3,
            fatality: 5,
            unaccounted: 2
        }
        const lifeline = shallow(<LifeLine status={status}/>);
        expect(
            lifeline.find('.ll-safe').length
        ).toEqual(1);
        expect(
            lifeline.find('.ll-hospitalised').length
        ).toEqual(1);
        expect(
            lifeline.find('.ll-fatality').length
        ).toEqual(1);
        expect(
            lifeline.find('.ll-unaccounted').length
        ).toEqual(1);
    })
})
