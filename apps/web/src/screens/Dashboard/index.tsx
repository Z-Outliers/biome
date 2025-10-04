import PapersRow from "./PapersRow";

export default function Dashboard() {
  return (
    <div>
      <PapersRow
        title="Recently Added"
        filters={{ sortBy: "createdAt", order: "desc", pageSize: 4 }}
      />
      <PapersRow
        title="Recently Viewed"
        filters={{ sortBy: "title", order: "asc", pageSize: 4 }}
      />
      <PapersRow
        title="Popular Papers"
        filters={{ sortBy: "createdAt", order: "asc", pageSize: 4 }}
      />
    </div>
  );
}
