

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getProducts = async () => {
    const response = await fetch(`${url}/products`);
    const data = await response.json();
    return data;
}

export const getProductByCategory = async (category) => {
    const response = await fetch(`${url}/products/category/${encodeURIComponent(category)}`);
    const data = await response.json();    
    return data;
}

export const getProcutByCategotyID = async (id) => {
    const response = await fetch(`${url}/products/category${id}`);
    const data = await response.json();    
    return data;
}