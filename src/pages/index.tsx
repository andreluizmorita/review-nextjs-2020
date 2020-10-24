import SEO from '@/components/SEO';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

import { Title } from '../styles/pages/Home';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  products: IProduct[];
}

// TTFB - Time to First Byte
export default function Home({ products }: HomeProps) {
  const [total, setTotal] = useState<number>(0);
  async function handleSum() {
    const { sum } = (await import('../lib/math')).default;

    setTotal(sum(10, 20));
  }

  return (  
    <>
      <SEO
        title="Page 1"
        image="banner.png"
        shouldExcludeTitleSuffix={true}
      />
      <section>
        <Title>Products</Title>

        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.title}
            </li>
          ))}
        </ul>

        <button onClick={handleSum}>Sum</button>
        <p>{total}</p>
      </section>
    </>
  )
}

// client, server and static

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
  const products = await response.json();

  return {
    props: {
      products
    }
  }
}