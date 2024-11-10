async function getApi() {
    const request = await fetch('http://api.tvmaze.com/search/shows?q=golden%20girls');
    const data = await request.json();
    return data;
}

