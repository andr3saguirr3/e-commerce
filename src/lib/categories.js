

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getCategories = async () => {
    const response = await fetch(`${url}/categories`);
    const data = await response.json();
    return data;
}

export const getProductByCategory = async (category) => {
    const response = await fetch(`${url}/categories/${category}`);
    const data = await response.json();
    return data;
}

export const getProductByCategoryID = async (id) => {
    const response = await fetch(`${url}/products/category/${id}`);
    const data = await response.json();    
    return data;
}
