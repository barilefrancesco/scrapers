import { ScraperRow } from "../../types";

function DownloadCsvButton({ data }: { data: ScraperRow[] }) {
  const createHeader = (row: ScraperRow) => {
    return Object.keys(row).join(";");
  };

  const downloadCsv = () => {
    // console.log("downloadCsv: ", data);
    const header = data.length > 0 ? createHeader(data[0]!) : null;
    const csv = data.map((row) => Object.values(row).join(";")).join("\n");

    const csvData = header ? header + "\n" + csv : csv;
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "data-" + Date.now() + ".csv");
    link.click();
  };

  return (
    <>
      <button
        type="button"
        className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
        onClick={() => downloadCsv()}
      >
        Download CSV
      </button>
    </>
  );
}

export default DownloadCsvButton;
