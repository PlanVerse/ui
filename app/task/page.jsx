import { DataTable } from "@/components/data-table";
import { columns } from "./columns"

async function getData() {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "seg00@playground.com",
    },
  ]
}

export default async function Page() {
  const data = await getData()

  return (
    (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    )
  );
}
