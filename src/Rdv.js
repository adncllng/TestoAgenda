

import React from 'react';
import { Resizable, ResizableBox } from 'react-resizable';
// import 'style-loader!css-loader!../css/styles.css';
// import 'style-loader!css-loader!./test.css';
import './rdv.css'

import Draggable from 'react-draggable'; // The default
// import {DraggableCore} from 'react-draggable'; // <DraggableCore>
// import Draggable, {DraggableCore} from 'react-draggable';



export default class Rdv extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            width: 200,
            height: this.props.gridSpacingY,
            offset: 10,
            selected: false,
            moveDisabled: false,
            activeDrags: 0,
            deltaPosition: {
              x: 0, y: 0
            },
        };
    }

    handleDrag = (e, ui) => {
        const {x, y} = this.state.deltaPosition;
        this.setState({
          deltaPosition: {
            x: x + ui.deltaX,
            y: y + ui.deltaY,
          }
        });
      };
    
      onDragStart = () => {
        this.setState({activeDrags: ++this.state.activeDrags});
      };
    
      onDragStop = () => {
        this.setState({activeDrags: --this.state.activeDrags});
      };


    onClick = () => {
        this.setState({ selected: !this.state.selected });
    };

    onResize = (event, { element, size, handle }) => {
        this.setState({ width: size.width, height: size.height });
    };

    onResizeStart = () => {
        this.setState({ moveDisabled: true })
    }


    //this will be where we could change calculate the new end date of the RDV; 
    onResizeStop = (event, data ) => {
        // this data.size.width does not represent the actually width rendered to the screen, 
        // we'll have to caluclate the rounding in the same way the do for the grid in 'ResizableBox', 
        const newWidth = data.size.width;
        this.setState({width:newWidth})
        this.setState({ selected: !this.state.selected });
    }

    render() {
        const { offset, gridSpacingX, gridSpacingY, master} = this.props;
        const { moveDisabled } = this.state.selected


        const rdvStyle = {
            position: 'absolute',
            left: offset,
            background: '#00A8A8',
            opacity: master ? 0.15 : 1,
            // transform: this.state.selected ? 'translate(-10px, -10px)' : '',
            zIndex: master ? 0 : 1,
            boxShadow: this.state.selected ? '15px 15px rgba(0, 0, 0, 0.5)' : '10px 10px rgba(0, 0, 0, 0.5)',
            margin: '-15px'
        }

        const lockIndicatorStyle = {
            position: 'absolute',
            right: '0px',
            bottom: '10px',
        }

        const getHandle = () => {
            //using false here to default to the built in handle. Eventually this could be a custom handle of somekind
            const handle = false;
            return this.state.selected ? handle : (<div />)
        }


    const dragHandlers = {onStart: this.onDragStart, onStop: this.onDragStop};
    const {deltaPosition,} = this.state;


        return (
            <div>
                <div className="layoutRoot">
                    <Draggable
                        grid={[gridSpacingX, gridSpacingY]}
                        disabled={this.state.selected}
                        onDrag={this.handleDrag}
                        {...dragHandlers}
                        
                    >
                        <div style={rdvStyle}  >
                            <ResizableBox className="box"
                                handle={getHandle()}
                                onResizeStop={this.onResizeStop}
                                handleSize={[8, 8]} 
                                axis={this.state.selected ? "x" : 'none'} 
                                width={200}
                                height={200}
                                draggableOpts={{ grid: [gridSpacingX, gridSpacingX] }}
                            >
                                <div style= {{margin:'20px'}}>TERRY'S BANK</div>
                                <div style= {{margin:'10px'}}> WIDTH: {this.state.width}</div>
                                <div style= {{margin:'10px'}}>CHANGE-X: {deltaPosition.x.toFixed(0)}</div>
                                <div style= {{margin:'10px'}}>Y: {deltaPosition.y.toFixed(0)}</div>
                                <div style= {{margin:'10px'}}>Y-INDEX: {deltaPosition.y.toFixed(0) / gridSpacingY}</div>
                                <div style= {{margin:'10px'}}>LOCK: {(!this.state.selected).toString()}</div>
                                <span className="lock-indicator" style={lockIndicatorStyle} onClick={this.onClick}> {this.state.selected ? '🔓' : '🔒'}</span>
                            </ResizableBox>

                        </div>
                    </Draggable>
                </div>
            </div>
        );
    }
}