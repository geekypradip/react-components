import axios from "axios";
import { Children, useEffect, useRef, useState } from "react";
import { ProductCard } from "./card";
import { Spinner } from "react-bootstrap";
interface Iproducts {
  loading: boolean;
  data: any[];
}
const initialState: Iproducts = {
  loading: false,
  data: [],
};

export const ProductsContainer = () => {
  const [products, setProducts] = useState<Iproducts>(initialState);
  const productContainerRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const pageRef = useRef(0);

  /**function to fetch products */
  const fetchProducts = (page: number) => {
    setProducts((prev) => ({
      ...prev,
      loading: true,
    }));
    axios
      .get(
        `https://api.escuelajs.co/api/v1/products?offset=${page * 5}&limit=5`
      )
      .then((res) =>
        setProducts((prev) => ({
          ...prev,
          data: [...prev?.data, ...res.data],
          loading: false,
        }))
      );
  };

  const handleInfiniteScroll = () => {
    const scrollHeight = productContainerRef.current.scrollHeight,
      clientHeight = productContainerRef.current.clientHeight,
      scrollTop = productContainerRef.current.scrollTop;

    if (clientHeight + scrollTop + 100 > scrollHeight && !products.loading) {
      fetchProducts(pageRef.current + 1);
      pageRef.current += 1;
    }
  };

  useEffect(() => {
    fetchProducts(0);

    return () => setProducts(initialState);
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "500px",
          border: "1px solid #dfdcdc",
          overflow: "scroll",
          display: "flex",
          flexWrap: "wrap",
          gap: 15,
        }}
        ref={productContainerRef}
        onScroll={handleInfiniteScroll}
      >
        {Children.toArray(
          products?.data?.map((product) => <ProductCard {...product} />)
        )}
      </div>
      <div style={{ textAlign: "center" }}>
        {products.loading && <Spinner animation="border" variant="primary" />}
      </div>
    </>
  );
};
