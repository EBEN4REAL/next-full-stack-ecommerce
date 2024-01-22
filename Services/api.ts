
export enum HttpMethod  {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export async function fetchData<T>(url: string, method: HttpMethod, data?: unknown): Promise<T> {
    const headers = {
        'Content-Type': 'application/json',
    };

    const options: RequestInit = {
        method: HttpMethod[method],
        headers,
        body: data ? JSON.stringify(data) : undefined,
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json();
    } catch (error) {
        throw new Error('An error occurred during the fetch operation');
    }
}