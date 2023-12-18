import axios from "axios";
import { useSelector } from "react-redux";
export const addToCart = (value) => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return (
        new Promise(async (resolve, reject) => {
            try {
                if (value) {
                    console.log(value)
                    let response
                    let data
                    try {
                        response = await axios.post(`http://localhost:8080/carts`, value, config);
                        data = await response.data;
                        resolve({ data });
                    } catch (e) {
                        reject(e); // add this line to properly handle the rejection
                    }
                }
            } catch (e) {
                reject(e); // add this line to properly handle the rejection
            }
        })
    );
}

export const removeToCart = (id) => {
    return (
        new Promise(async (resolve, reject) => {
            try {
                if (id) {
                    console.log(id)
                    let response
                    let data
                    try {
                        response = await axios.delete(`http://localhost:8080/carts/${id}`);
                        data = await response.data;
                        resolve({ data });
                    } catch (e) {
                        reject(e); // add this line to properly handle the rejection
                    }
                }
            } catch (e) {
                reject(e); // add this line to properly handle the rejection
            }
        })
    );
}

export const getToCart=(user)=>{

    console.log(user);
    
    return(
        new Promise(async (resolve,reject)=>{
           let response;
           let data; 
           try{

           response=user && await axios.get(`http://localhost:8080/carts?user=${user.id}`)
           console.log(data);
           data=response.data;
           resolve({data})
        }
        catch(e){
            reject(e);
        }
        })
    )
}

export const updataToCart=(vl)=>{
    let config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return(
        new Promise(async(resolve,reject)=>{
            let response;
            let data;
            try{
                console.log(vl);
            response=await axios.patch(`http://localhost:8080/carts/${vl.id}`,vl,config);
            data=response.data;
            resolve({data});

            }
            catch(e){
                reject(e);
            }
        })
    )
}

export function resetCart(user) {
    // get all items of user's cart - and then delete each
    console.log(user);
    return new Promise(async (resolve) => {
      const response = await getToCart(user);
      const items = response.data;
      console.log(items);
      for (let item of items) {
        await removeToCart(item.id);
      }
      resolve({ status: 'success' });
    });
}
