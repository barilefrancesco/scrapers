import { useState } from "react";
import { ScraperRow } from "../../types";
import { Portal } from "react-portal";
import { FileUploader } from "react-drag-drop-files";
import Papa from "papaparse";

import "../../i18n";
import { useTranslation } from "react-i18next";

const fileTypes = ["CSV"];

const ImportCsvButton = ({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<ScraperRow[]>>;
}) => {
  const { t, i18n } = useTranslation(["btns", "labels"]);

  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<File>();

  // It state will contain the error when
  const [error, setError] = useState("");

  const handleChange = (file: File) => {
    console.log(file);
    setFile(file);
  };

  const importCsv = () => {
    if (file?.type != "text/csv") return console.log("Enter a valid file");
    Papa.parse(file, {
      header: true,
      complete: (results: Papa.ParseResult<ScraperRow>) => {
        setData(results.data);
      },
    });
    setShowModal(false);
  };

  return (
    <>
      <button
        type="button"
        className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
        onClick={() => setShowModal(true)}
      >
        {t("import-from-csv", {
          ns: ["btns"],
        })}
      </button>
      {showModal ? (
        <Portal node={document && document.body}>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative w-4/6 max-w-3xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-3">
                  <h3 className="text-lg font-semibold">
                    {t("modal-import-header", {
                      ns: ["labels"],
                    })}
                  </h3>
                  <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                {/*body*/}
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <div className="relative flex-auto p-3">
                  <div className="flex flex-col p-4">
                    <FileUploader
                      multiple={false}
                      handleChange={handleChange}
                      name="file"
                      types={fileTypes}
                      children={
                        <div>
                          <div className="flex w-full items-center justify-center">
                            <label className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                  aria-hidden="true"
                                  className="mb-3 h-10 w-10 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                  ></path>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">
                                    {t("modal-import-click-upl", {
                                      ns: ["labels"],
                                    })}
                                  </span>{" "}
                                  {t("modal-import-drag-drop", {
                                    ns: ["labels"],
                                  })}
                                </p>
                                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                                  {t("modal-import-only-csv", {
                                    ns: ["labels"],
                                  })}
                                </p>
                                {file ? (
                                  <p className="font-semibold text-green-500">
                                    {t("modal-import-file-name", {
                                      ns: ["labels"],
                                    })}
                                    : {file.name}
                                  </p>
                                ) : (
                                  <p className="font-semibold text-gray-500">
                                    {t("modal-import-no-file-yet", {
                                      ns: ["labels"],
                                    })}
                                  </p>
                                )}
                              </div>
                              <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-3">
                  <button
                    className="mx-3 inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    {t("close", {
                      ns: ["btns"],
                    })}
                  </button>
                  <button
                    className="inline-block rounded-lg bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                    type="submit"
                    onClick={() => importCsv()}
                  >
                    {t("import", {
                      ns: ["btns"],
                    })}
                  </button>
                </div>
                {/* </form> */}
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </Portal>
      ) : null}
    </>
  );
};

export default ImportCsvButton;
