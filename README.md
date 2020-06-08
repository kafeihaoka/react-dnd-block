# react-dnd-block
react-dnd-block 为一款基于react-dnd实现的标签维度拖拽排序组件，可自定义UI样式。

此分支为demo示例分支，源码如下：
```
import React from "react";
import ReactDOM from "react-dom";
import DNDBlock from "react-dnd-block";

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data0:Array.from({length:30}).map((v,i) => ({label:'item' + i,value:i})),
			data1:Array.from({length:30}).map((v,i) => ({label:'item' + i,value:i})),
			data2:Array.from({length:30}).map((v,i) => ({label:'item' + i,value:i}))
		}
		this.changeBlock = this.changeBlock.bind(this);
	}

    changeBlock(i, v) {
        this.setState({
            [`data${i}`]: v
        })
    }

	render() {
	    const { data0, data1, data2 } = this.state;
		return (
            <div>
				<p>-----------------------  例1  -------------------------------</p>
				<DNDBlock
					data={data0}
					onChange={this.changeBlock.bind(this,0)}
				/>
				<p>-----------------------  例2  -------------------------------</p>
				<DNDBlock
					width={'80%'}
					data={data1}
					tagBorderRadius={['6px','6px']}
					clearButtonBorderRadius={'6px'}
					tagColor={'rgb(16, 142, 233)'}
					onChange={this.changeBlock.bind(this,1)}
				/>
				<p>------------------------  例3  ------------------------------</p>
				<DNDBlock
					width={'360px'}
					data={data2}
					title={''}
					hint={''}
					tagBorderRadius={['6px','6px']}
					clearButtonBorderRadius={'6px'}
					tagColor={'rgb(16, 233, 173)'}
					onChange={this.changeBlock.bind(this,2)}
				/>
			</div>
		);
	}
}
ReactDOM.render(<App />, document.getElementById("example"));
```
