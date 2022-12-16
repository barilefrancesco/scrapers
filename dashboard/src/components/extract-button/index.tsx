import { useRef, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Options } from "react-select";
import Select from "react-select";
import {
  FormInput,
  ScraperRow,
  Scrapers,
  Option,
  TelegramIDs,
} from "../../types";
import makeAnimated from "react-select/animated";
import { Portal } from "react-portal";

import "../../i18n";
import { useTranslation } from "react-i18next";
import parserWhatsapp from "../../utils/parsers/whatsapp";
import parserTelegram from "../../utils/parsers/telegram";
import { string } from "zod";

const LINKS = {
  [Scrapers.WHATSAPP]: `http://127.0.0.1:5002/messages`,
  [Scrapers.TELEGRAM]: `http://127.0.0.1:5001/telegram_messages?`,
};

const options: Options<Option> = [
  { value: Scrapers.WHATSAPP, label: "Whatsapp" },
  { value: Scrapers.TELEGRAM, label: "Telegram" },
  // add more options here
];

const animatedComponents = makeAnimated();

const PARSERS = {
  [Scrapers.TELEGRAM]: parserTelegram,
  [Scrapers.WHATSAPP]: parserWhatsapp,
};
const ExtractButton = ({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<ScraperRow[]>>;
}) => {
  const { t, i18n } = useTranslation(["btns"]);
  const [showModal, setShowModal] = useState(false);

  const { register, control, handleSubmit } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async ({
    scrapers,
    phone,
    contacts_wa,
    contacts_tl,
    telegram_api_id,
    telegram_api_hash,
    telegram_session_code,
  }) => {
    if (scrapers) {
      {
        let dataScrapers: ScraperRow[] = [];
        for (const scraper of scrapers) {
          if (scraper === Scrapers.TELEGRAM) {
            if (phone) {
              const response = await (
                await fetch(
                  LINKS[scraper] +
                    new URLSearchParams({
                      api_id: telegram_api_id
                        ? telegram_api_id
                        : TelegramIDs.API_ID,
                      api_hash: telegram_api_hash
                        ? telegram_api_hash
                        : TelegramIDs.API_HASH,
                      session_code: telegram_session_code
                        ? telegram_session_code
                        : TelegramIDs.FIRST_SESSION_CODE,
                      phone: phone,
                      // contacts: contacts_tl ? contacts_tl : "",
                    }),
                  {
                    method: "GET",
                    headers: {},
                  }
                )
              ).json();

              dataScrapers = [...dataScrapers, ...PARSERS[scraper](response)];
            } else {
              console.error("Phone is required");
            }
          } else if (scraper === Scrapers.WHATSAPP) {
            let params = "";
            if (contacts_wa) {
              params = `?contacts=${contacts_wa}`;
            }
            const response = await (
              await fetch(LINKS[scraper] + params, {
                method: "GET",
                headers: {},
              })
            ).json();

            dataScrapers = [
              ...dataScrapers,
              ...PARSERS[scraper](JSON.parse(response.messages)),
            ];
          }
        }

        setData(dataScrapers);
        setShowModal(false);
      }
    }
  };

  return (
    <>
      <button
        type="button"
        className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
        onClick={() => setShowModal(true)}
      >
        {t("extract", {
          ns: ["btns"],
        })}
      </button>
      {showModal ? (
        <Portal node={document && document.body}>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative w-4/6 max-w-4xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-3">
                  <h3 className="text-lg font-semibold">
                    {t("modal-extract-header", {
                      ns: ["labels"],
                    })}
                  </h3>
                  <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                {/*body*/}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="relative flex-auto p-3">
                    <div className="flex w-full justify-between">
                      <div className="flex w-full flex-col p-4">
                        <label>
                          {t("modal-extract-choose-scrapers", {
                            ns: ["labels"],
                          })}{" "}
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
                              onChange={(value) => {
                                field.onChange(value.map((v) => v.value));
                              }}
                              options={options}
                              value={options.filter((option) =>
                                field.value?.find((v) => v === option.value)
                              )}
                            />
                          )}
                        />
                      </div>
                      <div className="flex w-full flex-col p-4">
                        <label>
                          {t("modal-extract-phone-number", {
                            ns: ["labels"],
                          })}{" "}
                          <span className="text-red-600">*</span>
                        </label>
                        <input
                          className="inline-block rounded-lg px-3 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                          type="text"
                          placeholder="3333333333"
                          {...register("phone", { required: true })}
                        />
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="flex w-full flex-col p-4">
                        <label>
                          {" "}
                          {t("modal-extract-contacts-list-wa", {
                            ns: ["labels"],
                          })}
                        </label>
                        <input
                          className="inline-block rounded-lg px-3 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                          type="text"
                          placeholder="Mario,Sara,+393333333333"
                          {...register("contacts_wa")}
                        />
                      </div>
                      <div className="flex w-full flex-col p-4">
                        <label>
                          {" "}
                          {t("modal-extract-contacts-list-tl", {
                            ns: ["labels"],
                          })}
                        </label>
                        <input
                          className="inline-block rounded-lg px-3 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                          type="text"
                          placeholder="Mario,Sara,+393333333333"
                          {...register("contacts_tl")}
                        />
                      </div>
                    </div>
                    <div
                      id="telegramFields"
                      className="flex w-full justify-between"
                    >
                      <div className="flex w-full flex-col p-4">
                        <label>
                          {" "}
                          {t("modal-extract-telegram-api-id", {
                            ns: ["labels"],
                          })}
                        </label>
                        <input
                          className="inline-block rounded-lg px-3 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                          type="text"
                          placeholder="Set your Telegram API ID"
                          {...register("telegram_api_id")}
                        />
                      </div>
                      <div className="flex w-full flex-col p-4">
                        <label>
                          {" "}
                          {t("modal-extract-telegram-session-code", {
                            ns: ["labels"],
                          })}
                        </label>
                        <input
                          className="inline-block rounded-lg px-3 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                          type="text"
                          placeholder="Set your Telegram API HASH"
                          {...register("telegram_api_hash")}
                        />
                      </div>
                      <div className="flex w-full flex-col p-4">
                        <label>
                          {" "}
                          {t("modal-extract-telegram-session-code", {
                            ns: ["labels"],
                          })}
                        </label>
                        <input
                          className="inline-block rounded-lg px-3 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                          type="text"
                          placeholder="Set your Telegram Session Code"
                          {...register("telegram_session_code")}
                        />
                      </div>
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
                      className="flex items-center rounded-lg bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                      type="submit"
                      // onClick={() => setShowModal(false)}
                    >
                      {/* <svg
                        id="btnLaunchSvg"
                        className="mr-3 hidden h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg> */}
                      <p id="btnLaunchText">
                        {t("launch", {
                          ns: ["btns"],
                        })}
                      </p>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </Portal>
      ) : null}
    </>
  );
};

export default ExtractButton;
