import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orders/OrderColumns";
import { Separator } from "@/components/ui/separator";

const Orders = async () => {
  const res = await fetch("http://localhost:3000/api/orders");
  const orders = await res.json();
  console.log(orders);
  return (
    <div className="px-10 py-5">
      <p className="">Orders</p>
      <Separator className="bg-gray-500 my-5" />
      <DataTable columns={columns} data={orders} searchKey="_id" />
    </div>
  );
};

export default Orders;
