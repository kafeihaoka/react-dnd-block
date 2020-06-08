import React, { Component } from 'react';
import BlockItem from './BlockItem'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import PropTypes from 'prop-types';
import classNames from 'classnames'

class DNDBlock extends Component {
    constructor(props){
        super(props);
        this.state={
            ArriveIndex:'-1'
        }
    }

    static displayName = 'DNDBlock';

    static propTypes = {
        /**
         * 设置拖拽区域宽度
         */
        width: PropTypes.string,
        /**
         * 拖拽区域样式自定义
         */
        className: PropTypes.string,
        /**
         * 拖拽区域label文字
         */
        title: PropTypes.string,
        /**
         * 是否开启全部清除按键
         */
        clearButton: PropTypes.bool,
        /**
         * 拖拽区域底部提示段落
         */
        hint: PropTypes.string,
        /**
         * 拖拽区域标签颜色自定义
         */
        tagColor: PropTypes.string,
        /**
         * 拖拽区域标签自定义圆角
         */
        tagBorderRadius: PropTypes.array,
        /**
         * 拖拽区域清空标签自定义圆角
         */
        clearButtonBorderRadius: PropTypes.string,
        /**
         * 拖拽区域数据
         */
        data: PropTypes.array,
        /**
         * function 更新数据
         */
        onChange: PropTypes.func,
    };

    static defaultProps = {
        width:'100%',
        className:'',
        title:'已选标签',
        tagColor:'#fd9f2f',
        tagBorderRadius:['0px', '0px'],
        clearButtonBorderRadius:'0px',
        clearButton:true,
        hint:'可随意拖拽改变标签顺序',
        data: []
    };

    //保存拖拽后的顺序
    handleDND = (dragIndex,hoverIndex) => {
        let BlockList = this.props.data.concat([]);
        let tmp = BlockList[dragIndex] //临时储存文件

        BlockList.splice(dragIndex,1) //移除拖拽项
        BlockList.splice(hoverIndex,0,tmp) //插入放置项

        this.setState({
            ArriveIndex:'-1'
        })
        if(this.props.onChange) this.props.onChange(BlockList);
    };

    //drop中的动画效果
    handleAnimate = (hoverIndex) => {
        this.setState({
            ArriveIndex:hoverIndex
        })
    };

    //删除
     handleClear = (value) => {
         const { onChange, data} =this.props;
        if(value === '-1'){
            // console.log('clear ALL!')
            if(onChange) onChange([]);
        }else{
            // console.log(`clear ${value}!`)
            let newData = data.filter(v => v.value !== value.value);
            if(onChange) onChange(newData);
        }
    };

    render() {
        const { ArriveIndex } = this.state;
        const { title, hint, width, className, clearButton, tagColor, tagBorderRadius, clearButtonBorderRadius, data } =this.props;

        const dndPlace = classNames('dndPlace', className);

        const selfClearBtn = {
            border: `1px solid ${tagColor}`,
            color: tagColor
        }

        const clearButtonRadius = {
            borderRadius: clearButtonBorderRadius
        }

        return (
            <DndProvider backend={HTML5Backend}>
                <div className={dndPlace} style={{width:width}}>
                    <div className='dndPlaceTitle'>{title}</div>
                    <div className='dndPlaceContent'>
                        {data.map((item,index) => {
                            return(
                                <BlockItem //向次级界面传递参数
                                    tagColor={tagColor}
                                    tagBorderRadius={tagBorderRadius}
                                    data={item}
                                    index={index}
                                    key={index}
                                    animate={ArriveIndex === index}
                                    onDND={this.handleDND}
                                    onAnimate={this.handleAnimate}
                                    handleClear={this.handleClear}
                                />
                            )
                        })}
                        {
                            clearButton && data.length > 2?
                                <div className='dndPlaceClearBtn' style={{...selfClearBtn, ...clearButtonRadius}} onClick={this.handleClear.bind(this,'-1')}>
                                    <span>全部清除</span>
                                </div>:null
                        }
                    </div>
                    <p className="dndPlaceHint">{hint}</p>
                </div>
            </DndProvider>
        );
    }
}

export default DNDBlock;
