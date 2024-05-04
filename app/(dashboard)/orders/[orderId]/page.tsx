import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orderItems/OrderItemsColumns";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(`http:localhost:3000/api/orders/${params.orderId}`);

  const { orderDetails, customer } = await res.json();

  const { street, city, state, postalCode, country } =
    orderDetails.shippingAddress;

  return (
    <div className="flex flex-col p-10 gap-5">
      <p className="text-2xl font-bold">
        Order Id: <span className="text-base">{orderDetails._id}</span>
      </p>
      <p className="font-bold">
        Customer name: <span className="text-base">{customer.name}</span>
      </p>
      <p className="font-bold">
        Shipping Address:
        <span className="text-base">
          {street}, {city}, {state}, {postalCode},{country}
        </span>
      </p>
      <p className="font-bold">
        Total Paid:
        <span className="text-base">${orderDetails.totalAmount}</span>
      </p>
      <p className="font-bold">
        Shipping rate ID:
        <span className="text-base">${orderDetails.shippingRate}</span>
      </p>

      <DataTable
        columns={columns}
        data={orderDetails.products}
        searchKey="product"
      />
    </div>
  );
};

export default OrderDetails;
