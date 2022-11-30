const ImportCsvButton = () => {
  const importCsv = ({}) => {
    console.log("importCsv");
  };

  return (
    <>
      <button
        type="button"
        className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
        onClick={() => importCsv(true)}
      >
        Import from CSV
      </button>
    </>
  );
};

export default ImportCsvButton;
