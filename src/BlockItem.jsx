import React, { Component } from 'react';
import {findDOMNode} from 'react-dom'

import { DragSource, DropTarget } from 'react-dnd'

import { TYPE_BLOCK } from "./Types";
import './main.less'

const BlockSource = {
    beginDrag(props,monitor,component){
        return {
            index:props.index,
            targetIndex:null,
        }
    },
    endDrag(props, monitor){
        const {index, targetIndex} = monitor.getItem();//拖拽目标的Index 目标Index
        if(props.animate !== '-1') props.onAnimate('-1');//清除虚拟移动效果
        if(index !== targetIndex && targetIndex !== null) props.onDND(index,targetIndex);
    },
};
const collect = (connect,monitor) => {
    return{
        connectDragSource:connect.dragSource(),
        isDragging:monitor.isDragging()
    }
}
const BlockTarget = {
    canDrop(props,monitor){ //组件可以被放置时触发的事件

    },
    hover(props,monitor,component){ //组件在target上方时触发的事件
        const dragIndex = monitor.getItem().index;//拖拽目标的Index
        const hoverIndex = props.index; //目标Index

        if(monitor.getItem().targetIndex !== null) monitor.getItem().targetIndex = null;

        if(!component) return null;

        if(dragIndex === props.lastIndex || hoverIndex === props.lastIndex) return null;
        if(dragIndex === hoverIndex) return null;//如果拖拽目标和目标ID相同不发生变化
        const hoverBoundingRect = (findDOMNode(component)).getBoundingClientRect();//获取Block的边框矩形
        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;//获取X轴中点
        const clientOffset = monitor.getClientOffset();//获取拖拽目标偏移量
        const hoverClientX = (clientOffset).x - hoverBoundingRect.left;
        if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
            return null
        }
        if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
            return null
        }
        // props.onDND(dragIndex,hoverIndex);//放在拖放结束后执行
        monitor.getItem().targetIndex = hoverIndex;

        props.onAnimate(dragIndex < hoverIndex && hoverClientX > hoverMiddleX?hoverIndex + 1:hoverIndex);//虚拟移动效果
    },
};
const collect1 = (connect,monitor) => {
    return{
        connectDropTarget:connect.dropTarget(),
        isOver:monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType(),
    }
}

class BlockItem extends Component{

    constructor(props){
        super(props);
    }

    onClear(value){
        if(this.props.handleClear) this.props.handleClear(value);
    }

    render(){
        const { isDragging, connectDragSource, connectDropTarget, data, tagColor, tagBorderRadius, animate} = this.props; //isOverCurrent,

        let itemStyle = {
            float: 'left',
            marginRight: '24px',
            marginBottom: '16px',
            opacity: isDragging ? 0.7 : 1,
            cursor: 'all-scroll',
            // background:isOverCurrent ?'#e91e63':'#ffa101'
        };

        const selfBg = {
            background: tagColor
        }

        const tagLeftBorderRadius = {
            borderBottomLeftRadius: tagBorderRadius[0],
            borderTopLeftRadius: tagBorderRadius[0]
        }

        const tagRightBorderRadius = {
            borderBottomRightRadius: tagBorderRadius[1],
            borderTopRightRadius: tagBorderRadius[1]
        }

        return connectDragSource(
            connectDropTarget(<div className={`anDNDSelect ${animate?'marginLeft100':''}`} style={itemStyle}>
                <span style={{...selfBg, ...tagLeftBorderRadius}} title={data.label}>{data.label}</span>
                <img className={'divLine'} src={require('./images/dash-line.png')} alt=""/>
                <span style={{...selfBg, ...tagRightBorderRadius, cursor: 'pointer'}} onClick={this.onClear.bind(this,data)}>×</span>
            </div> )
        )
    }
}
let flow = require('lodash.flow');
export default flow(
    DragSource(TYPE_BLOCK,BlockSource, collect),
    DropTarget(TYPE_BLOCK,BlockTarget, collect1)
)(BlockItem)