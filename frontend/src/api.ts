let host = "http://localhost:7788";

export const getSchema = () => {
    return fetch(host + "/schema")
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const getClass = (className: string, offset: number, limit: number,keyword:string, properties: [any]) => {
    return fetch(`${host + className}/${offset}/${limit}/${keyword}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(properties),
        }
    )
        .then(response => response.json())
        .catch(error => console.log(error))

}

