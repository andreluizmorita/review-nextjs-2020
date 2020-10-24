import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { useState } from 'react';

// Import Default
// import AddToCartModal from '../../../components/AddToCartModal';

// Lazy load
const AddToCartModal = dynamic(
  () => import('../../../components/AddToCartModal'),
  { loading: () => <p>Loading</p>, ssr: false }
)

export default function Product() {
  const route = useRouter();
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);
  
  function handleAddToCart() {
    setIsAddToCartModalVisible(true);
  }

  return (
    <>
      <h1>{route.query.slug}</h1>

      <button onClick={handleAddToCart}>Add to cart</button>

      {isAddToCartModalVisible && <AddToCartModal /> }
    </>
  )
}