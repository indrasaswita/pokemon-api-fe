import axios from 'axios';

export const Get = async (url: string, params: any, whendone: Function) => {
	axios
		.get(`${process.env.REACT_APP_ENDPOINT}/${url}`, 
			{
				params:params
			}
		)
		.then((response: any) => {
			if(whendone instanceof Function){
				const data = response.data;
				whendone(data);
			}
		})
		.catch((error: any) => {
			console.log('error', error.message);
		});
}

export const Post = async (url: string, params: any, whendone: Function) => {
	axios
		.post(`${process.env.REACT_APP_ENDPOINT}/${url}`,  
			{
				params:params
			}
		)
		.then((response: any) => {
			if(whendone instanceof Function){
				const data = response.data;
				if(data.api_status)
					whendone(data.data);
				else
					console.log('error 200', data.message);
			}
		})
		.catch((error: any) => {
			console.log('error', error.message);
		});
}

export const Get2 = async (url: string, params: any, whendone: Function) => {
	axios
		.get(`${process.env.REACT_APP_ENDPOINT2}/${url}`, 
			{
				params:params
			}
		)
		.then((response: any) => {
			if(whendone instanceof Function){
				const data = response.data;
				whendone(data);
			}
		})
		.catch((error: any) => {
			console.log('error', error.message);
		});
}

export const Post2 = async (url: string, params: any, whendone: Function) => {
	axios
		.post(`${process.env.REACT_APP_ENDPOINT2}/${url}`,  
			{
				params:params
			}
		)
		.then((response: any) => {
			if(whendone instanceof Function){
				const data = response.data;
				if(data.api_status)
					whendone(data.data);
				else
					console.log('error 200', data.message);
			}
		})
		.catch((error: any) => {
			console.log('error', error.message);
		});
}