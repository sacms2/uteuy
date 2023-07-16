const fetcher = async (...args) =>
    await fetch(...args).then(async (res) => {
        if (!res.ok) {
            throw await res.json();
        }
        return await res.json();
    });

export default fetcher;