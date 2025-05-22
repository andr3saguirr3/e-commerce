import Card from "@/components/products/card";
import { getProductByCategoryID } from "@/lib/categories";  

export default async function Category({ params }) {
    const { category } = params;
    const products = await getProductByCategoryID(category);
    
        return (
        <div>
            <h1 className="m-8 pl-18 text-4xl font-bold">{products[0].brand}</h1>
            <div className="flex flex-wrap justify-center gap-4">
                {products.map((product) => (
                    <Card key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
