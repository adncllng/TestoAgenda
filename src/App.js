import React from 'react'
import { render } from 'react-dom'
import CustomTimeline from './CustomTimeLine'
import 'react-calendar-timeline/lib/Timeline.css'
import Rdv from './Rdv';
import './App.css'

const GRID_INTERVAL_X = 25;
const ROW_HEIGHT = 200;
const viewWidth = 2000;


const viewStartDate = new Date('1995-12-10T03:24:00');
const viewEndDate = new Date('1995-12-17T03:24:00');
const rdvStartDate = new Date('1995-12-13T12:24:00');
const rdv2StartDate = new Date('1995-12-12T03:24:00');
const rdv3StartDate = new Date('1995-12-10T22:24:00');

const getLeftOffset = (
  viewWidth,
  rdvStartDate,
  viewStartDate,
  viewEndDate) => {
  const diff = viewEndDate - viewStartDate;
  const rdvDiff = viewEndDate - rdvStartDate;
  const offsetRatio = rdvDiff / diff

  return viewWidth - (offsetRatio * viewWidth);
}

const Column = (index, gridSpacingY)=>(
  <div className='dummyColumns'
    style={{
      height: ROW_HEIGHT + 'px',
      width: viewWidth + 'px',
      position: 'aboslute',
      margin:'6px',
      padding:0,
      backgroundColor: (index % 2 )? 'rgb(226, 226, 226)' : 'white',
      boxShadow: '-5px -6px rgba(255, 255, 255, 0.4)'
    }}></div>)


const App = () => (
  <div className='App'>
  <div style={{ height: '300px'}} className='header' />
    <div style = {{margin:'100px'}}>
    {/* <CustomTimeline /> */}
    <Rdv offset={getLeftOffset(viewWidth, rdvStartDate, viewStartDate, viewEndDate)} gridSpacingX={GRID_INTERVAL_X} gridSpacingY={ROW_HEIGHT} />
    <Rdv offset={getLeftOffset(viewWidth, rdv2StartDate, viewStartDate, viewEndDate)} gridSpacingX={GRID_INTERVAL_X} gridSpacingY={ROW_HEIGHT} />
    <Rdv master={true} offset={getLeftOffset(viewWidth, rdv3StartDate, viewStartDate, viewEndDate)} gridSpacingX={GRID_INTERVAL_X} gridSpacingY={ROW_HEIGHT} />
    {Array(10).fill('').map((nothing,i)=>Column(i, ROW_HEIGHT))}
    </div>
  </div>
)
export default App;
