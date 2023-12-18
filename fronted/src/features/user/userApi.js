import axios from "axios";

export const fetchUserOrder=(userId)=>{
 let response;
 let data;
 return (
    new Promise(async(resolve,reject)=>{
        try{
            response=await axios.get(`http://localhost:8080/orders?user.id=${userId}`);
            data=await response.data
            resolve({data});
        }
        catch(e){
            reject(e);    
        }
    })
 )
}