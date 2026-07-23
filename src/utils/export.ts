export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  filename: string,
  headers?: { key: keyof T; label: string }[]
) {
  if (data.length === 0) {
    return;
  }

  const columns = headers || Object.keys(data[0]).map((k) => ({ key: k, label: k }));
  
  const csvContent = [
    columns.map((c) => `"${String(c.label).replace(/"/g, '""')}"`).join(","),
    ...data.map((row) =>
      columns
        .map((c) => {
          let val = row[c.key as keyof T];
          let strVal = val === null || val === undefined ? "" : String(val);
          strVal = strVal.replace(/"/g, '""');
          return `"${strVal}"`;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename.endsWith(".csv") ? filename : `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
