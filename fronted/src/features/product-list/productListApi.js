import axios from "axios";
export function fetchAllProducts() {
    return new Promise(async (resolve) => {
        const response = axios.get(" http://localhost:8080/products?_limit=10");
        const data = (await response).data;
        resolve({ data });
    })
}

export function fetchProductsByFilter(filter,page,Default_Limit) {
  
    let limit=Default_Limit;
    let queryString = '';
    for (let key in filter) {
        queryString += `${key}=${filter[key]}` + "&";
    }

    return (new Promise(async (resolve) => {
        let  response;

        if(queryString.length>0) {
            response = await axios.get(`http://localhost:8080/products?${queryString}&_page=${page}&_limit=${limit}`);
        }
        else{
          
            response = await axios.get(`http://localhost:8080/products?_page=${page}&_limit=${limit}`);

        }
        const data = await response.data;
        const totalCount=await response.headers.get("X-Total-Count");

        console.log(data)
        console.log(totalCount)

        resolve({ data,totalCount });
    }));
}

export function sortProducts(filter,order) {
  
    let queryString = '';
    for (let key in filter) {
        queryString += `${key}=${filter[key]}` + "&";
    }
    console.log(queryString)
    return (new Promise(async(resolve)=>{
        const response = await axios.get(`http://localhost:8080/products?${queryString}_sort=price&_order=${order.order}`);
        const data=await response.data;
        resolve({data});
    }))
}

export function productDetail(id) {
    let response;
    return (
        new Promise(async (resolve)=>{
            response = await axios.get(`http://localhost:8080/products/${id}`);
            let data = await response.data;
            console.log(data)
            resolve({data});
        })
    )
}

export function category() {
    let response;
    return (
        new Promise(async (resolve)=>{
            response = await axios.get(`http://localhost:8080/category`)
            let data = await response.data;
            resolve({data});
        })
    )

}
export function brands() {
    let response;
    return (
        new Promise(async (resolve)=>{
            response = await axios.get(`http://localhost:8080/brands`)
            let data = await response.data;
            resolve({data});
        })
    )}