import { useReducer, useState } from "react";
import React from "react";
import { Fragment } from "react";

import { type NextPage } from "next";
import Image from "next/image";
import Head from "next/head";

import Select from "react-select";
import type { Options } from "react-select";
import makeAnimated from "react-select/animated";

import type { SubmitHandler } from "react-hook-form";
import { useForm, Controller } from "react-hook-form";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Option = { value: Scrapers; label: string };

enum Scrapers {
  WHATSAPP = "whatsapp",
  TELEGRAM = "telegram",
}

// Modal
type FormInput = { scrapers?: Scrapers[]; phone?: string; contacts?: string };

// Modal submit
const LINKS = {
  [Scrapers.WHATSAPP]: `/api/whatsapp/`,
  [Scrapers.TELEGRAM]: `/api/telegram/`,
};

// API Response
type Mention = {
  id: string;
  author: string;
  message: string;
};

type Message = {
  athor: string;
  message: string;
  date: string;
  day: string;
  hours: string;
  mention: Mention;
};

type Chat = {
  id: string;
  contact: string;
  messages: Message[];
};

type Chats = {
  conversations: Chat[];
  scraper: Scrapers;
};

// Table
type ScraperRow = {
  idConversazione: string; // Valore identificiativo sequenziiale
  contatto: string; // Tizio con cui si sta parlando (o gruppo)
  idMessaggio: string; // Valore identificiativo sequenziiale
  mittente: string; // Chi scrive il messaggio
  testo: string; // Testo del messaggio
  data: string; // Data del messaggio
  ora: string; // Ora del messaggio
  idMessaggioCitato: string; // Se esiste è il messaggio a cui ci si riferisce
  testoCitato: string; // Testo del messaggio citato
  mittenteCitato: string; // Chi scrive il messaggio
  scraper: string; // Tipologia di scraper
};
const defaultData: ScraperRow[] = [
  {
    idConversazione: "Empty",
    contatto: "",
    idMessaggio: "",
    mittente: "",
    testo: "",
    data: "",
    ora: "",
    idMessaggioCitato: "",
    testoCitato: "",
    mittenteCitato: "",
    scraper: "",
  },
];
const columnHelper = createColumnHelper<ScraperRow>();
const columns = [
  columnHelper.accessor("idConversazione", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("contatto", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("idMessaggio", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("mittente", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("testo", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("data", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("ora", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("idMessaggioCitato", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("testoCitato", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("mittenteCitato", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("scraper", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState(false);

  const animatedComponents = makeAnimated();
  const options: Options<Option> = [
    { value: Scrapers.WHATSAPP, label: "Whatsapp" },
    { value: Scrapers.TELEGRAM, label: "Telegram" },
    // add more options here
  ];

  const { register, control, handleSubmit } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = ({ scrapers }) => {
    if (scrapers) {
      {
        scrapers.forEach(async (scraper) => {
          const response = await (await fetch(LINKS[scraper])).json();
          console.log("response FROM " + scraper);
          // console.log(response);

          let datasToRender: ScraperRow[];

          response.conversazioni.forEach(
            (conversazione: Chat, indexC: number) => {
              conversazione.messages.forEach(
                (messaggio: Message, indexM: number) => {
                  console.log(messaggio);

                  datasToRender.push({
                    idConversazione: indexC.toString(),
                    contatto: conversazione.contact,
                    idMessaggio: indexM.toString(),
                    mittente: messaggio.athor,
                    testo: messaggio.message,
                    data: messaggio.date,
                    ora: messaggio.hours,
                    idMessaggioCitato: "0",
                    testoCitato: "",
                    mittenteCitato: "",
                    scraper: scraper,
                  });
                }
              );
              setData(datasToRender);
            }
          );

          setShowModal(false);
        });
      }
    }
  };

  const [data, setData] = useState(() => [...defaultData]);
  const rerender = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Fragment>
      <Head>
        <title>Scrapers - Dashboard</title>
        <meta
          name="description"
          content="This dashboard contains all web scrapings for chat app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="isolate bg-white">
        {/* <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div> */}
        <div className="border-b p-6">
          <div>
            <nav
              className="flex h-9 items-center justify-between"
              aria-label="Global"
            >
              <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Scrapers</span>
                  <Image
                    className="h-8"
                    src="/logo.svg"
                    alt=""
                    width={32}
                    height={32}
                  />
                </a>
              </div>
              {/* <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div> */}
              <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
                {[{ href: "#", name: "Scrapers - Dashboard" }].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="font-semibold text-gray-900 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
                <button
                  type="button"
                  className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                  onClick={() => setShowModal(true)}
                >
                  Estrai
                </button>
                {showModal ? (
                  <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                      <div className="relative w-4/6 max-w-3xl">
                        {/*content*/}
                        <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-3">
                            <h3 className="text-lg font-semibold">
                              Estrai i tuoi dati
                            </h3>
                            <button
                              className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                              onClick={() => setShowModal(false)}
                            ></button>
                          </div>
                          {/*body*/}
                          <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="relative flex-auto p-3">
                              <div className="flex flex-col p-4">
                                <label>
                                  Scegli gli scrapers{" "}
                                  <span className="text-red-600">*</span>
                                </label>
                                <Controller
                                  name="scrapers"
                                  control={control}
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <Select
                                      isMulti
                                      components={animatedComponents}
                                      {...field}
                                      onChange={(value) =>
                                        field.onChange(
                                          value.map((v) => v.value)
                                        )
                                      }
                                      options={options}
                                      value={options.filter((option) =>
                                        field.value?.find(
                                          (v) => v === option.value
                                        )
                                      )}
                                    />
                                  )}
                                />
                              </div>
                              <div className="flex flex-col p-4">
                                <label>
                                  Numero di telefono{" "}
                                  <span className="text-red-600">*</span>
                                </label>
                                <input
                                  className="inline-block rounded-lg px-3 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                                  type="text"
                                  placeholder="+39 3333333333"
                                  {...register("phone", { required: true })}
                                />
                              </div>
                              <div className="flex flex-col p-4">
                                <label>Lista contatti (opzionale)</label>
                                <input
                                  className="inline-block rounded-lg px-3 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                                  type="text"
                                  placeholder="Mario,Sara,+393333333333"
                                  {...register("contacts")}
                                />
                              </div>
                            </div>
                            <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-3">
                              <button
                                className="mx-3 inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                                type="button"
                                onClick={() => setShowModal(false)}
                              >
                                Chiudi
                              </button>
                              <button
                                className="inline-block rounded-lg bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                                type="submit"
                                // onClick={() => setShowModal(false)}
                              >
                                Avvia
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                  </>
                ) : null}
              </div>
            </nav>
          </div>
        </div>
        <main>
          <div className="relative px-6 lg:px-8">
            <div className="mx-auto max-w-5xl pt-20 pb-32 sm:pt-48 sm:pb-40">
              <div>
                {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  <span className="text-gray-600">
                    Announcing our next round of funding.{' '}
                    <a href="#" className="font-semibold text-indigo-600">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Read more <span aria-hidden="true">&rarr;</span>
                    </a>
                  </span>
                </div>
              </div> */}
                <div>
                  <h4 className="text-xl font-bold tracking-tight sm:text-center sm:text-xl">
                    Export your chats from this tool!
                  </h4>
                  <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                    {/* {JSON.stringify(telegramData.data)} */}
                  </p>
                  <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                    {/* {JSON.stringify(whatsappData.data)} */}
                  </p>

                  <div className="overflow-auto">
                    <table className="border-collapse border border-slate-400">
                      <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                          <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                              <th
                                className="border border-slate-300 p-1"
                                key={header.id}
                              >
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>
                      <tbody>
                        {table.getRowModel().rows.map((row) => (
                          <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                              <td
                                className="border border-slate-300 p-1"
                                key={cell.id}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        {table.getFooterGroups().map((footerGroup) => (
                          <tr key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                              <th
                                className="border border-slate-300 p-1"
                                key={header.id}
                              >
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.footer,
                                      header.getContext()
                                    )}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </tfoot>
                    </table>
                  </div>
                  {/* <div className="mt-8 flex gap-x-4 sm:justify-center">
                  <a
                    href="#"
                    className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                  >
                    Get started
                    <span className="text-indigo-200" aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                  <a
                    href="#"
                    className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                  >
                    Live demo
                    <span className="text-gray-400" aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                </div> */}
                </div>
                {/* <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                <svg
                  className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                  viewBox="0 0 1155 678"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                    fillOpacity=".3"
                    d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                  />
                  <defs>
                    <linearGradient
                      id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                      x1="1155.49"
                      x2="-78.208"
                      y1=".177"
                      y2="474.645"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#9089FC" />
                      <stop offset={1} stopColor="#FF80B5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div> */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  );
};

export default Home;
