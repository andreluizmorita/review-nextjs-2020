import { GetStaticPaths, GetStaticProps } from 'next';
import { Router, useRouter } from 'next/router';

interface IProduct {
  id: string;
  title: string;
}

interface CategoryProps {
  products: IProduct[];
}

export default function Category({ products }: CategoryProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }
  
  return (
    <>
      <h1>{router.query.slug}</h1>

      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.title}
          </li>
        ))}
      </ul>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  const categories = await response.json();

  const paths = categories.map(category => {
    return {
      params: { slug: category.id }
    }
  });

  return {  
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
  const { slug } = context.params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?category_id=${slug}`);
  const products = await response.json();

  return {
    props: {
      products
    },
    revalidate: 60,
  }
}