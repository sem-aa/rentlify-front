import dynamic from "next/dynamic";
import {
  useState,
  useEffect,
  useMemo,
  FormEvent,
  useCallback,
  memo,
} from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Product, SearchParams } from "@/types";
import {
  fetchFilteredProductsApi,
  fetchAllProductsApi,
} from "@/pages/api/products";
import Layout from "@/components/Layout";
import Loader from "@/components/Loader";

const ProductList = dynamic(() => import("@/components/ProductList"), {
  loading: () => <Loader />,
});

const ProductDetailsModal = dynamic(
  () => import("@/components/ProductDetailsModal"),
  {
    loading: () => <Loader />,
  },
);

const SearchBar = dynamic(() => import("@/components/SearchBar"), {
  loading: () => <Loader />,
});

const CategoryList = dynamic(() => import("@/components/CategoryList"), {
  loading: () => <Loader />,
});

interface HomeProps {
  products: Product[];
}

const Home = ({ products }: HomeProps) => {
  const [searchLoading, setSearchLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchProducts, setSearchProducts] = useState<Product[]>([]);
  const [params, setParams] = useState<SearchParams>({
    search: "",
    minPrice: "",
    maxPrice: "",
    category: "",
    location: "",
  });

  useEffect(() => {
    setSearchProducts(products);
  }, [products]);

  const locations = useMemo(
    () => Array.from(new Set(products.map((product) => product.location))),
    [products],
  );

  const categories = useMemo(
    () => [
      "Всі категорії",
      ...Array.from(new Set(products.map((product) => product.category))),
    ],
    [products],
  );

  const fetchFilteredProducts = useCallback(async (params: SearchParams) => {
    setSearchLoading(true);
    try {
      const response = await fetchFilteredProductsApi(params);
      setSearchProducts(response);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  const handleSearch = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      fetchFilteredProducts(params);
    },
    [params, fetchFilteredProducts],
  );

  const handleProductClick = useCallback(
    (id: number) => {
      const product = products.find((p) => p.id === id);
      if (product) {
        setSelectedProduct(product);
      }
    },
    [products],
  );

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const resetFilter = useCallback(
    (filter: keyof SearchParams) => {
      const updateParams = { ...params, [filter]: "" };
      setParams(updateParams);
      fetchFilteredProducts(updateParams);
    },
    [params, fetchFilteredProducts],
  );

  const fetchCategories = useCallback(
    (category: string) => {
      const updateParams = {
        ...params,
        category: category === "Всі категорії" ? "" : category,
      };

      setParams(updateParams);
      fetchFilteredProducts(updateParams);
    },
    [params, fetchFilteredProducts],
  );

  const resetAllFilters = useCallback(() => {
    const clearFilters = {
      search: "",
      minPrice: "",
      maxPrice: "",
      category: "",
      location: "",
    };
    setParams(clearFilters);
    setSearchProducts(products);
  }, [products]);

  const fetchWhithLocation = useCallback(
    (location: string) => {
      const updateParams = { ...params, location };
      setParams(updateParams);
      fetchFilteredProducts(updateParams);
    },
    [params, fetchFilteredProducts],
  );

  return (
    <>
      <Head>
        <title>Rentlify</title>
        <meta
          name="description"
          content="Rentlify - Find and rent the best products easily."
        />
        <meta name="keywords" content="rent, products, rentlify, home" />
      </Head>
      <Layout>
        <SearchBar
          arrayLocations={locations}
          params={params}
          setParams={setParams}
          resetFilter={resetFilter}
          onSearch={handleSearch}
          resetAllFilters={resetAllFilters}
          fetchWhithLocation={fetchWhithLocation}
        />
        <CategoryList
          categories={categories}
          onCategoryClick={fetchCategories}
          activeCategory={params.category || "Всі категорії"}
        />

        <div className="m-4">
          {searchProducts.length ? (
            <>
              {searchLoading ? (
                <Loader />
              ) : (
                <ProductList
                  products={searchProducts}
                  onProductClick={handleProductClick}
                />
              )}
            </>
          ) : (
            <div className="flex items-center flex-col gap-4 p-4">
              <p className="text-gray-700 text-center">
                Ми не звайшли товарів з обраними фільтрами
              </p>
              <button
                onClick={resetAllFilters}
                className="px-4 py-2 bg-turquoise text-white rounded-lg hover:bg-turquoise-dark transition"
              >
                Переглянути всі товари
              </button>
            </div>
          )}
        </div>

        {selectedProduct && (
          <ProductDetailsModal
            product={selectedProduct}
            onClose={handleCloseModal}
          />
        )}
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetchAllProductsApi();
    return {
      props: {
        products: response,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
      },
    };
  }
};

export default memo(Home);
