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

export const fetchUserAddress=(userId)=>{
    let response;
    let data;
    return (
        new Promise(async(resolve,reject)=>{
            try{
            response=await axios.get(`http://localhost:8080/users/${userId}`);
            data=response.data;
            resolve({data});
            }
            catch(e){
                reject(e);
            }
        })
    )
}

export const updateUser=(vl)=>{
    let response;
    let data;
    let config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    return(
        new Promise(async(resolve,reject)=>{
            try{
                console.log(vl);
                response=await axios.patch(`http://localhost:8080/users/${vl.id}`,vl,config)
                data=response.data
                resolve({data})
                
            }
            catch(e){
                reject(e);
            }
        })
    )
}

