import { Card, Col, Row, Skeleton } from "antd";
import type { Product } from "../../../Props";
import { useNavigate } from "react-router-dom";
import { ShoppingOutlined } from "@ant-design/icons";

interface ProductCardProps {
  products?: Product[];
  loading?: boolean;
}

export const ProductCard = ({ products, loading }: ProductCardProps) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Row gutter={[24, 24]}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4.8} key={i}>
            <Card className="rounded-2xl border-none shadow-sm h-full">
              <Skeleton.Image className="w-full !min-h-[220px] !mb-4 rounded-xl" active />
              <Skeleton active paragraph={{ rows: 2 }} />
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="w-full py-16 text-center text-gray-500 bg-gray-50 rounded-2xl border border-gray-100 mt-4">
        <ShoppingOutlined className="text-4xl mb-3 text-gray-300" />
        <p className="text-lg">No products found in this category.</p>
      </div>
    );
  }

  return (
    <Row gutter={[24, 24]}>
      {products.map((product: Product) => (
        <Col
          key={product._id as string}
          xs={24}
          sm={12}
          md={8}
          lg={6}
          xl={4.8}
          className="flex"
        >
          <Card
            hoverable
            className="w-full rounded-2xl border-none shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
            styles={{ body: { padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 } }}
            onClick={() => navigate(`/products/${product.slug || product._id}`)}
            cover={
              <div className="relative pt-[120%] bg-gray-50 overflow-hidden">
                <img
                  alt={product.name as string}
                  src={product.imageUrl}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />
                {/* Optional Badge */}
                {Math.random() > 0.7 && (
                  <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10">
                    New
                  </div>
                )}
              </div>
            }
          >
            <div className="flex-1 flex flex-col">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1 block">
                {product.brand || "Brand"}
              </span>
              <h3 className="text-base font-bold text-gray-900 leading-tight mb-2 line-clamp-2 title-font">
                {product.name}
              </h3>
              
              <div className="mt-auto pt-3 flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    ${product.price as number}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
