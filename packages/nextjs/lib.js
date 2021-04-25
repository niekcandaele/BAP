export async function fetchAPI(model) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/${model}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })


    const json = await res.json()
    console.log(json);
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }

    return json
}

