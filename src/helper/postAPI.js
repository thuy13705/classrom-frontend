

    export default async function postAPI(api,myBody) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('Access-Control-Allow-Credentials', 'true');
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body:JSON.stringify(myBody),
            mode: "cors",
        };
        return await fetch(api, requestOptions)
            .then(async response => {
                if (response.status >= 400) {
                    return await "401";
                }
                return await response.json();
            })
    };
