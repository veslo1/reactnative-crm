import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default class CRMPersonFamilyTreeView extends Component {
    constructor(props) {
        super(props);

        this.measured = {};

        this.state = {
            childrenRect: {
                width: 40,
                height: 40
            },
            svg: {
                width: 0,
                height: 0
            },
            firstLine: {
                width: 0,
                startPoint: {x: 0, y: 0},
                endPoint: {x: 0, y: 0}
            },
            secondLine: {
                width: 0,
                startPoint: {x: 0, y: 0},
                endPoint: {x: 0, y: 0}
            },
            thirdLine: {
                width: 0,
                startPoint: {x: 0, y: 0},
                endPoint: {x: 0, y: 0}
            },
            fourthLine: {
                width: 0,
                startPoint: {x: 0, y: 0},
                endPoint: {x: 0, y: 0}
            },
            childrenLines: []
        };
    }

    render() {
         return (
             <View ref='containerView' style={{flex: 1}}>
                <Svg width={ this.state.svg.width } height={ this.state.svg.height } style={{ position: 'absolute', left: 0, top: 0,}}>
                    {
                        [this.state.firstLine, this.state.secondLine, this.state.thirdLine, this.state.fourthLine].concat(
                            this.state.childrenLines
                        ).map(
                            (line, index) => <Path  
                                        d={`M${ line.startPoint.x },${  line.startPoint.y } L${ line.endPoint.x },${ line.endPoint.y }`}
                                        stroke="#000"
                                        strokeWidth={ line.width }
                                        key={index}
                                    ></Path>
                        )
                    }
                </Svg>

                <View ref='parentView' style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                    {
                        this.props.parent 
                        ? <Image
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 3,
                                backgroundColor: '#DDD'
                            }}
                            source={{
                                uri: this.props.parent.image
                            }}
                            key={this.props.parent.image}
                        />
                        : null
                    }
                </View>
                <View ref='selectedPersonView' style={{flex: 7, alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                        style={{
                            width: 160,
                            height: 160,
                            borderRadius: 10,
                            backgroundColor: '#DDD',
                        }}
                        source={{
                            uri: this.props.person.image
                        }}
                        key={this.props.person.image}
                    />
                </View>
                <View ref='childrenView' style={{flex: 2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                    {
                        this.props.children.map(
                            person => <Image
                                            style={{
                                                width: this.state.childrenRect.width,
                                                height: this.state.childrenRect.height,
                                                borderRadius: 3,
                                                backgroundColor: '#DDD'
                                            }}
                                            source={{
                                                uri: person.image
                                            }}
                                            key={person.image}
                                        />
                        )
                    }
                </View>
             </View>
         )
    }

    getInitialStateByLinesWidth(firstLineWidth = 0, childrenLinesWidth = 0) {
        return {
            svg: {
                width: 0,
                height: 0
            },
            firstLine: {
                width: firstLineWidth,
                startPoint: {x: 0, y: 0},
                endPoint: {x: 0, y: 0}
            },
            secondLine: {
                width: childrenLinesWidth,
                startPoint: {x: 0, y: 0},
                endPoint: {x: 0, y: 0}
            },
            thirdLine: {
                width: childrenLinesWidth,
                startPoint: {x: 0, y: 0},
                endPoint: {x: 0, y: 0}
            },
            fourthLine: {
                width: childrenLinesWidth,
                startPoint: {x: 0, y: 0},
                endPoint: {x: 0, y: 0}
            },
            childrenLines: []
        };
    }

    resetState() {
        let newState = this.getInitialStateByLinesWidth();
        this.setState(Object.assign({}, this.state, newState));
    }

    updateSVGByNextProps(nextProps) {
        nextProps = nextProps || this.props;
        let containerView = this.refs.containerView;
        let parentView = this.refs.parentView;
        let selectedPersonView = this.refs.selectedPersonView;
        let childrenView = this.refs.childrenView;

        let childrenLinesWidth = nextProps.children.length ? 1 : 0;
        let firstLineWidth = nextProps.parent ? 1 : 0;

        let newState = this.getInitialStateByLinesWidth(firstLineWidth, childrenLinesWidth);
        let dependenciesReadyCount = 0;
        let measureEndCall = () => ++dependenciesReadyCount >=4 && this.setState(Object.assign({}, this.state, newState));

        let containerViewMeasureCallback = ({fx, fy, width, height, px, py}) => {
            newState.svg.width = width;
            newState.svg.height = height;
            this.measured['containerView'] = {fx, fy, width, height, px, py};
            measureEndCall();
        };
        this.measured['containerView'] 
            ? containerViewMeasureCallback(this.measured['containerView'])
            : containerView.measure((fx, fy, width, height, px, py) => containerViewMeasureCallback({fx, fy, width, height, px, py}));

        let parentViewMeasureCallback = ({fx, fy, width, height, px, py}) => {
            newState.firstLine.startPoint.x = fx + width/2;
            newState.firstLine.startPoint.y = fy + height/2;
            this.measured['parentView'] = {fx, fy, width, height, px, py};
            measureEndCall();
        };
        this.measured['parentView'] 
            ? parentViewMeasureCallback(this.measured['parentView'])
            : parentView.measure((fx, fy, width, height, px, py) => parentViewMeasureCallback({fx, fy, width, height, px, py}));

        let selectedPersonViewMeasureCallback = ({fx, fy, width, height, px, py}) => {
            newState.firstLine.endPoint.x = newState.secondLine.startPoint.x = fx + width/2;
            newState.firstLine.endPoint.y = newState.secondLine.startPoint.y = fy + height/2;
            newState.secondLine.endPoint.x = newState.secondLine.startPoint.x;
            newState.secondLine.endPoint.y = fy + height;

            let childrenMargin = nextProps.children.length
                ? (width/nextProps.children.length - this.state.childrenRect.width)/2
                : 0;

            let childrenHalfSpaceWidth = childrenMargin + this.state.childrenRect.width/2;

            newState.thirdLine.startPoint.x = fx + childrenHalfSpaceWidth;
            newState.thirdLine.startPoint.y = newState.secondLine.endPoint.y;

            newState.thirdLine.endPoint.x = fx + childrenHalfSpaceWidth*(2*nextProps.children.length - 1);
            newState.thirdLine.endPoint.y = newState.secondLine.endPoint.y;

            nextProps.children.forEach((person, index) => {
                newState.childrenLines[index] = Object.assign({}, newState.childrenLines[index], {
                    startPoint: Object.assign(
                        {},
                        newState.childrenLines[index] ? newState.childrenLines[index].startPoint : null,
                        {
                            x: newState.thirdLine.startPoint.x + index*2*childrenHalfSpaceWidth,
                            y: newState.secondLine.endPoint.y
                        }
                    ),
                    endPoint: Object.assign(
                        {},
                        newState.childrenLines[index] ? newState.childrenLines[index].endPoint : null,
                        {
                            x: newState.thirdLine.startPoint.x + index*2*childrenHalfSpaceWidth
                        }
                    )
                })
            });
            this.measured['selectedPersonView'] = {fx, fy, width, height, px, py};
            measureEndCall();
        };
        this.measured['selectedPersonView'] 
            ? selectedPersonViewMeasureCallback(this.measured['selectedPersonView'])
            : selectedPersonView.measure((fx, fy, width, height, px, py) => selectedPersonViewMeasureCallback({fx, fy, width, height, px, py}));

        let childrenViewMeasureCallback = ({fx, fy, width, height, px, py}) => {
            nextProps.children.forEach((person, index) => {
                newState.childrenLines[index] = Object.assign({}, newState.childrenLines[index], {
                    width: childrenLinesWidth,
                    endPoint: Object.assign(
                        {},
                        newState.childrenLines[index] ? newState.childrenLines[index].endPoint : null,
                        {
                            y: fy + height/2
                        }
                    )
                })
            });
            this.measured['childrenView'] = {fx, fy, width, height, px, py};
            measureEndCall();
        };
        this.measured['childrenView'] 
            ? childrenViewMeasureCallback(this.measured['childrenView'])
            : childrenView.measure((fx, fy, width, height, px, py) => childrenViewMeasureCallback({fx, fy, width, height, px, py}));
    }

    componentWillReceiveProps(nextProps) {
        this.resetState();
        this.updateSVGByNextProps(nextProps);
    }

    componentDidMount() {
        setTimeout(this.updateSVGByNextProps.bind(this))
    }
}