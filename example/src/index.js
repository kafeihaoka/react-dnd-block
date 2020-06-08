import React from "react";
import ReactDOM from "react-dom";
import DNDBlock from "./../../lib/index";
// import DNDBlock from "react-dnd-block";

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data:Array.from({length:30}).map((v,i) => ({label:'item' + i,value:i}))
		}
	}

    changeBlock = (v) => {
        console.log(v)
        this.setState({
            data: v
        })
    }

	render() {
	    const { data } = this.state;
		return (
            <div>
				<p>-----------------------  例1  -------------------------------</p>
				<DNDBlock
					data={data}
					onChange={this.changeBlock}
				/>
				<p>-----------------------  例2  -------------------------------</p>
				<DNDBlock
					width={'80%'}
					data={data}
					tagBorderRadius={['6px','6px']}
					clearButtonBorderRadius={'6px'}
					tagColor={'rgb(16, 142, 233)'}
					onChange={this.changeBlock}
				/>
				<p>------------------------  例3  ------------------------------</p>
				<DNDBlock
					width={'360px'}
					data={data}
					title={''}
					hint={''}
					tagBorderRadius={['6px','6px']}
					clearButtonBorderRadius={'6px'}
					tagColor={'rgb(16, 233, 173)'}
					onChange={this.changeBlock}
				/>
			</div>
		);
	}
}
ReactDOM.render(<App />, document.getElementById("example"));
