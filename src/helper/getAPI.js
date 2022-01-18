
export default async function getAPI(api) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('Access-Control-Allow-Credentials', 'true');
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        mode: "cors",
    };
    return await fetch(api, requestOptions)
        .then(async response => {
            if (response.status >= 400) {
                return await "401";
            }
            return await response.json();
        })
        .catch(error => console.log('error', error));
};

