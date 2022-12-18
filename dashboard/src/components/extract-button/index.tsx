import { Fragment, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { MultiValue, Options } from "react-select";
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
import { Transition, Dialog } from "@headlessui/react";

import { useSelector, useDispatch } from "react-redux";
import { show, hide } from "../../redux/features/loading/loadingSlice";

import LoadingSpinner from "../loadingSpinner";

// This priority is used to determine which scraper to use first
// I chose to use telegram first because if there is no session for telegram it will require code and then run both scrapers.
const SCRPAER_PRIORITY = {
  [Scrapers.TELEGRAM]: 1,
  [Scrapers.WHATSAPP]: 2,
};

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

  const [showTelegramSessionModal, setshowTelegramSessionModal] =
    useState(false);

  const dispatch = useDispatch();

  const { register, control, handleSubmit, watch } = useForm<FormInput>();

  const onChangeSelectHandler = (selectedOption: MultiValue<Option>) => {
    const hasTelegram = selectedOption.some(
      (option) => option.value === Scrapers.TELEGRAM
    );

    const hasWhatsapp = selectedOption.some(
      (option) => option.value === Scrapers.WHATSAPP
    );

    if (hasTelegram) {
      document.getElementById("telegramFields")?.classList.remove("hidden");
      document.getElementById("telegramFields")?.classList.add("lg:flex");

      document
        .getElementById("contacts_tl_container")
        ?.classList.remove("hidden");
      document
        .getElementById("contacts_tl_container")
        ?.classList.add("md:flex");
    } else {
      document.getElementById("telegramFields")?.classList.add("hidden");
      document.getElementById("telegramFields")?.classList.remove("lg:flex");

      document.getElementById("contacts_tl_container")?.classList.add("hidden");
      document
        .getElementById("contacts_tl_container")
        ?.classList.remove("md:flex");
    }

    if (hasWhatsapp) {
      document
        .getElementById("contacts_wa_container")
        ?.classList.remove("hidden");
      document
        .getElementById("contacts_wa_container")
        ?.classList.add("md:flex");
    } else {
      document.getElementById("contacts_wa_container")?.classList.add("hidden");
      document
        .getElementById("contacts_wa_container")
        ?.classList.remove("md:flex");
    }
  };

  async function safeParseJSON(response: Response) {
    const body = await response.text();
    try {
      return JSON.parse(body);
    } catch (err: any) {
      // throw err;
      return { err_code: 500 };
    }
  }

  const onOpenModal = () => {
    const previous_scrapers = watch("scrapers");

    const hasTelegram = previous_scrapers?.includes(Scrapers.TELEGRAM);
    const hasWhatsapp = previous_scrapers?.includes(Scrapers.WHATSAPP);

    setShowModal(true);

    setTimeout(() => {
      if (hasTelegram) {
        document.getElementById("telegramFields")?.classList.remove("hidden");
        document.getElementById("telegramFields")?.classList.add("md:flex");

        document
          .getElementById("contacts_tl_container")
          ?.classList.remove("hidden");
        document
          .getElementById("contacts_tl_container")
          ?.classList.add("md:flex");
      } else {
        document.getElementById("telegramFields")?.classList.add("hidden");
        document.getElementById("telegramFields")?.classList.remove("flex");

        document
          .getElementById("contacts_tl_container")
          ?.classList.add("hidden");
        document
          .getElementById("contacts_tl_container")
          ?.classList.remove("flex");
      }

      if (hasWhatsapp) {
        document
          .getElementById("contacts_wa_container")
          ?.classList.remove("hidden");
        document
          .getElementById("contacts_wa_container")
          ?.classList.add("md:flex");
      } else {
        document
          .getElementById("contacts_wa_container")
          ?.classList.add("hidden");
        document
          .getElementById("contacts_wa_container")
          ?.classList.remove("flex");
      }
    }, 1);
  };

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
        dispatch(show());

        scrapers.sort((a, b) => {
          var important_a = SCRPAER_PRIORITY[a],
            important_b = SCRPAER_PRIORITY[b],
            ret;

          if (important_a && !important_b) {
            ret = -1;
          } else if (important_b && !important_a) {
            ret = 1;
          } else if (important_a && important_b) {
            ret = important_a - important_b;
          } else {
            ret = 0;
          }

          return ret;
        });

        let dataScrapers: ScraperRow[] = [];
        for (const scraper of scrapers) {
          if (scraper === Scrapers.TELEGRAM) {
            if (phone) {
              const response = await await fetch(
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
              ).then(safeParseJSON);

              // check if response has err_code
              if (response.err_code) {
                // console.error("Error code: ", response.err_code);

                setShowModal(false);
                setshowTelegramSessionModal(true);
                dispatch(hide());
                return;
              }

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
        setshowTelegramSessionModal(false);

        dispatch(hide());
      }
    }
  };

  const isLoading = useSelector((state: any) => state.loading.value);

  return (
    <>
      <button
        type="button"
        className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
        onClick={() => onOpenModal()}
      >
        {t("extract", {
          ns: ["btns"],
        })}
      </button>
      {showModal ? (
        <Portal node={document && document.body}>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            {isLoading && <LoadingSpinner />}
            <div className="relative sm:w-4/6 ">
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
                    <div className="w-full justify-between md:flex">
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
                                onChangeSelectHandler(value);
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
                    <div className="w-full justify-between md:flex">
                      <div
                        id="contacts_wa_container"
                        className="hidden w-full flex-col p-4"
                      >
                        <label>
                          {" "}
                          {t("modal-extract-contacts-list-wa", {
                            ns: ["labels"],
                          })}
                        </label>
                        <input
                          className="inline-block w-full rounded-lg px-3 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                          type="text"
                          placeholder="Mario,Sara,+393333333333"
                          {...register("contacts_wa")}
                        />
                      </div>
                      <div
                        id="contacts_tl_container"
                        className="hidden w-full flex-col p-4"
                      >
                        <label>
                          {" "}
                          {t("modal-extract-contacts-list-tl", {
                            ns: ["labels"],
                          })}
                        </label>
                        <input
                          className="inline-block w-full rounded-lg px-3 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                          type="text"
                          placeholder="Mario,Sara,+393333333333"
                          {...register("contacts_tl")}
                        />
                      </div>
                    </div>
                    <div
                      id="telegramFields"
                      className="hidden w-full justify-between"
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
                          {t("modal-extract-telegram-api-hash", {
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
                    >
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

      <Transition.Root show={showTelegramSessionModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={setshowTelegramSessionModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            {isLoading && <LoadingSpinner />}
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:items-start md:flex">
                      {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div> */}
                      <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          {t("modal-get-telegram-session-code-title", {
                            ns: ["labels"],
                          })}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {t("modal-get-telegram-session-code-message", {
                              ns: ["labels"],
                            })}
                          </p>
                        </div>
                        <div className="mt-3 flex w-full flex-col">
                          <input
                            className="inline-block rounded-lg px-3 py-1.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                            type="text"
                            placeholder="Set your Telegram Session Code"
                            {...register("telegram_session_code")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-3">
                    <button
                      className="mx-3 inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                      type="button"
                      onClick={() => setshowTelegramSessionModal(false)}
                    >
                      {t("close", {
                        ns: ["btns"],
                      })}
                    </button>
                    <button
                      className="flex items-center rounded-lg bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                      type="button"
                      onClick={handleSubmit(onSubmit)}
                    >
                      <p id="btnLaunchText">
                        {t("launch", {
                          ns: ["btns"],
                        })}
                      </p>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ExtractButton;
