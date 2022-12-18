import { useReducer, useState } from "react";
import React from "react";
import { Fragment } from "react";

import { type NextPage } from "next";
import Image from "next/image";
import Head from "next/head";

import { ScraperRow } from "../types";
import MessagesTable from "../components/messages-table";
import ExtractButton from "../components/extract-button";
import ImportCsvButton from "../components/import-csv-button";

import "../i18n";
import { useTranslation } from "react-i18next";

const Home: NextPage = () => {
  const { t, i18n } = useTranslation(["home"]);

  const [data, setData] = useState<ScraperRow[]>([]);
  const rerender = useReducer(() => ({}), {})[1];

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
              <div className="lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
                {[{ href: "/", name: "Scrapers - Dashboard" }].map((item) => (
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
                <ExtractButton setData={setData} />
              </div>
            </nav>
          </div>
        </div>
        <main>
          <div className="relative px-6 lg:px-8">
            <div className="max-w-8xl mx-auto pt-6 pb-32">
              <div>
                <div>
                  <h4 className="text-center text-xl font-bold tracking-tight sm:text-xl">
                    {t("export-your-chats-from-this-tool", { ns: ["home"] })}
                  </h4>
                  <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                    {/* {JSON.stringify(telegramData.data)} */}
                  </p>
                  <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                    {/* {JSON.stringify(whatsappData.data)} */}
                  </p>
                  {data.length == 0 ? (
                    <div className="flex flex-col justify-center gap-2 text-center">
                      <p>
                        {t("no-data-available", {
                          ns: ["home"],
                        })}
                      </p>{" "}
                      <div className="mx-auto flex">
                        <div className="mx-1">
                          <ExtractButton setData={setData} />
                        </div>
                        <div className="mx-1">
                          <ImportCsvButton setData={setData} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <MessagesTable data={data} setData={setData} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  );
};

export default Home;
