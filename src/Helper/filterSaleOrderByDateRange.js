export function filterSaleOrderByDateRange(filter, salesData) {
  const now = new Date();
  console.log("range:", filter);
  console.log("salesData:", salesData.data);

  return salesData?.data?.filter((sale) => {
    const createdAt = new Date(sale?.createdAt);
    if (filter === "Weekly") {
      // Check if the sale was created within the last 7 days
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(now.getDate() - 7);
      return createdAt >= oneWeekAgo && createdAt <= now;
    } else if (filter === "Monthly") {
      // Check if the sale was created in the same month and year
      return (
        createdAt.getFullYear() === now.getFullYear() &&
        createdAt.getMonth() === now.getMonth()
      );
    } else if (filter === "Yearly") {
      // Check if the sale was created in the same year
      return createdAt.getFullYear() === now.getFullYear();
    }
    return false; // Default case if an unknown filter is passed
  });
}
