import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Options } from "react-select";
import Select from "react-select";
import { Chats, FormInput, ScraperRow, Scrapers, Option } from "../../types";
import makeAnimated from "react-select/animated";
import { Portal } from "react-portal";

import "../../i18n";
import { useTranslation } from "react-i18next";
import parserWhatsapp from "../../utils/parsers/whatsapp";
import parserTelegram from "../../utils/parsers/telegram";

const LINKS = {
  [Scrapers.WHATSAPP]: `http://127.0.0.1:5002/messages?contacts=triage forense`,
  [Scrapers.TELEGRAM]: `http://127.0.0.1:5001/telegram_messages?api_id=24332766&api_hash=167bf4d4000402e3e835ca4fd81e620c&session_code=60146&phone=`,
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
  const onSubmit: SubmitHandler<FormInput> = async ({ scrapers, phone }) => {
    if (scrapers) {
      {
        let dataScrapers: ScraperRow[] = [];
        for (const scraper of scrapers) {
          if (scraper === Scrapers.TELEGRAM) {
            const response = await (
              await fetch(LINKS[scraper] + phone, {
                method: "GET",
                headers: {},
              })
            ).json();

            console.log("response: ", response);

            dataScrapers = [...dataScrapers, ...PARSERS[scraper](response)];
          } else if (scraper === Scrapers.WHATSAPP) {
            const response = await (
              await fetch(LINKS[scraper], {
                method: "GET",
                headers: {},
              })
            ).json();

            console.log("response: ", response);

            dataScrapers = [...dataScrapers, ...PARSERS[scraper](response)];
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
            <div className="relative w-4/6 max-w-3xl">
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
                    <div className="flex flex-col p-4">
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
                            onChange={(value) =>
                              field.onChange(value.map((v) => v.value))
                            }
                            options={options}
                            value={options.filter((option) =>
                              field.value?.find((v) => v === option.value)
                            )}
                          />
                        )}
                      />
                    </div>
                    <div className="flex flex-col p-4">
                      <label>
                        {t("modal-extract-phone-number", {
                          ns: ["labels"],
                        })}{" "}
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
                      <label>
                        {" "}
                        {t("modal-extract-contacts-list", {
                          ns: ["labels"],
                        })}
                      </label>
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
                      {t("close", {
                        ns: ["btns"],
                      })}
                    </button>
                    <button
                      className="inline-block rounded-lg bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                      type="submit"
                      // onClick={() => setShowModal(false)}
                    >
                      {t("launch", {
                        ns: ["btns"],
                      })}
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