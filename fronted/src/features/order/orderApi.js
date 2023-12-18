import axios from "axios";
export const  createOrder=(value)=>{
    let config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return (
        new Promise(async(resolve,reject)=>{
            let response;
            let data;
            try{
                response=await axios.post(`http://localhost:8080/orders`,value,config);
                data=await response.data;
                console.log(data)
                resolve({data});

            }
            catch(e){
                reject(e);
            }
        
        })
    )

}