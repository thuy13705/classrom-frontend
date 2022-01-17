export default async function getAPI(api) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        mode: "cors",
    };
    return await fetch(api, requestOptions)
        .then(async response => {
            console.log(response);
            if (response.status === 401) {
                return await "401";
            }
            return await response.json();
        })
        .catch(error => console.log('error', error));
};