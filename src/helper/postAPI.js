

    export default async function postAPI(api,myBody) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body:JSON.stringify(myBody),
            mode: "cors",
        };
        return await fetch(api, requestOptions)
            .then(async response => {
                if (response.status === 401) {
                    return await "401";
                }
                return await response.json();
            })
    };
