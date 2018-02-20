// send new temperature to the server
export const sendPost = (id, temperature) => {
    return (
        fetch(`/city/${id}/measurement`, {
            method: 'POST',
            headers: {
                'Accept'        : 'application/json',
                'Content-Type'  : 'application/json',
            },
            body: JSON.stringify({
                temperature: temperature
            })
        })
            .then(res => { return res.json() })
            .catch(error => console.error(error))
    )
};