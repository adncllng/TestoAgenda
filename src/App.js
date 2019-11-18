import React from 'react'
import { render } from 'react-dom'
import CustomTimeline from './CustomTimeLine'
import 'react-calendar-timeline/lib/Timeline.css'
import Rdv from './Rdv';
import './App.css';
import moment from 'moment';

import generateFakeData from './generateFakeData';

const GRID_INTERVAL_X = 25;
const ROW_HEIGHT = 200;
const viewWidth = 2000;


const viewStartDate = moment().subtract(7, 'days')
const viewEndDate = moment().add(1, 'days')

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

const getTopOffest = (group, ROW_HEIGHT) => ((group + 1) * ROW_HEIGHT + 20);

const { groups, items } = generateFakeData();
//{id: "499", group: "3", title: "..", start: 1572920000000, end: 1572924959394, …}

const Column = (index, gridSpacingY) => (
  <div className='dummyColumns'
    style={{
      height: ROW_HEIGHT + 'px',
      width: viewWidth + 'px',
      position: 'aboslute',
      margin: '6px',
      padding: 0,
      backgroundColor: 'white',
      boxShadow: '-5px -6px rgba(255, 255, 255, 0.4)',


      backgroundImage: (index % 2) ? 'linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%),linear-gradient(45deg, transparent 75%, #808080 75%),linear-gradient(-45deg, transparent 75%, #808080 75%)' : '',

      backgroundSize: (index % 2) ? '4px 4px' : '',
      backgroundPosition: (index % 2) ? '0 0, 2px 0, 2px -2px, 0px 2px' : '',


    }}></div>)


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      changes: [generateFakeData().items, generateFakeData().items, generateFakeData().items] ,
      rdvs: generateFakeData().items,
    }
  }

  onRdvChange = (oldRdv) => {
    this.setState({changes:[...this.state.changes, generateFakeData() ]})
  }

  onUndoClick = (index) => {
    this.setState({rdvs: this.state.changes[index]})
  }

  render() {
    const rdvs = this.state.rdvs.map((item) => {
      return <Rdv onRdvChange={this.onRdvChange} title={item.title} offset={[getLeftOffset(viewWidth, item.start, viewStartDate, viewEndDate), getTopOffest(Number(item.group), ROW_HEIGHT)]} gridSpacingX={GRID_INTERVAL_X} gridSpacingY={ROW_HEIGHT} />
    })


    return (
      <div className='App'>
        <div style={{ height: '200px', width:'100px', backgroundColor:'white', padding: '10px'}} className='header'>
          {this.state.changes.map((change, index)=>(<div style={{color:'black', margin:'10px'}} onClick={()=>this.onUndoClick(index)}>change {index}</div>))}
          </div>
        <div style={{ height: '100px' }} className='header' />
        <div style={{ margin: '100px' }}>
          {/* <CustomTimeline /> */}
          {rdvs}
          <Rdv master={true} title={'mastery?'} offset={[getLeftOffset(viewWidth, moment().subtract(6, 'days'), viewStartDate, viewEndDate), getTopOffest(1)]} gridSpacingX={GRID_INTERVAL_X} gridSpacingY={ROW_HEIGHT} />
          {Array(10).fill().map((nothing, i) => Column(i, ROW_HEIGHT))}
        </div>
      </div>
    )
  }
}
