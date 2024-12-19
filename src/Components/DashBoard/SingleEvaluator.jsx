import React,{useState} from 'react';
import Select from 'react-select';
import { tickers } from '@/Constants';
import { motion } from 'framer-motion';
import axios from 'axios';


const stocks = tickers.map((value)=>{
	return {
		"label":value,
		"value":value
	}
})

const conditions = [];

for(var i = 0;i <= 32;i++)
	conditions.push({value:i,label:i})


const url = "http://127.0.0.1:8000/api/tools/singlepredictor/";




const Inputs = () => {

	const [tickers,setTickers] = useState([]);
	const [condition,setConditions] = useState([]);
	const [ticker_id,setTickerId] = useState(-1);
	const [duration,setDuration] = useState(-1);


	const validateInput = () => {
		let result = condition.map((value)=>{
			return value.label;
		});

		console.log(result);


		const req = {
			stock_names: tickers.map(value => value.label),
			condition_ids: condition.map(value => value.label),
			ticker_size: ticker_id,
			duration: duration
		};
		axios.post(url,req)
			.then(req=>console.log(req))
			.catch(error=>console.log(error));
	}


	return <div className="flex flex-col">
		<Select isMulti options={stocks} onChange={value => setTickers(value)}/>
		<Select isMulti options={conditions} onChange={value => setConditions(value)}/>
		<input type="number" name="ticker_id" onChange={(e)=>setTickerId(e.target.value)}/>
		<input type="number" name="duration" onChange={e => setDuration(e.target.value)}/>
		<motion.button
			className=''
			onClick={()=>validateInput()}
			>
			Submit
		</motion.button>
	</div>
}


const SingleEvaluator = () => {
  return (
    <div>
      <Inputs />
    </div>
  )
}

export default SingleEvaluator;