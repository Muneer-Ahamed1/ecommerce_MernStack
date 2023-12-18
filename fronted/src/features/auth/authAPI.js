import axios from "axios"
export const register = (data) => {
    let response;
    let config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const { email, password } = data;
    return (new Promise(async (resolve,reject) => {
        try{
            let user = await axios.get(`http://localhost:8080/users?email=${email}`);
            console.log(user)
            user=user.data[0];


        if(!user) {

        response = await axios.post(`http://localhost:8080/users`, {
            email: email,
            password: password
        }, config);
        const data = await response.data;
        resolve({ data });
    }
    else{
        reject(e);
    }
    }
    catch(e) {
        console.log("asddsdfsdfdfsdsf")
        reject(e);
    }

    }))
}
export const Login = (data) => {
    let response;
    const { email, password } = data;

    return (new Promise(async (resolve, reject) => {
        response = await axios.get(`http://localhost:8080/users?email=${email}`);

        let data = await response.data;
        console.log(data);
        if (data && data.length > 0) {

            if (data[0].password === password) {
                data = data[0];
                resolve({ ...data });
            }
            else {
                reject({ data: "Auth failed" });
            }
        }
        else {
            console.log("dassda")
            reject({ data: "Field are not filled" });
        }
    }))

}

export const updateUser = (value) => {
    let config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    return (
        new Promise(async (resolve, reject) => {
            let response;
            let data;
            try {
                response = axios.patch(`http://localhost:8080/users/${value.id}`, value, config)

                data = (await response).data;
                console.log(data);
                resolve({ data: data });


            }
            catch (e) {
                reject(e);

            }
        })
    )

}