import React, { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

export let languages = Object.freeze({
  ar: "العربية",
  cn: "中文",
  cs: "čeština",
  da: "dansk",
  de: "Deutsch",
  el: "ελληνικά",
  en: "English",
  es: "Español",
  et: "eesti",
  fr: "français",
  hu: "magyar",
  it: "Italiano",
  ja: "日本語",
  lt: "lietuvių kalba",
  nl: "Nederlands",
  no: "Norsk",
  pl: "język polski",
  pt: "Português",
  ro: "Română",
  ru: "русский",
  sk: "Slovenčina",
  th: "ไทย",
  uk: "Українська",
});

export const Actions = Object.freeze({
  Select_Language: "Select_Language",
});

export const LanguageDropdown = () => {
  const { Global, Global_Dispatch } = useContext(GlobalContext);

  const Set_Lang_Inner = (iEvent) => {
    iEvent.preventDefault();
    Global_Dispatch({
      Type: Actions.Select_Language,
    });
  };

  return (
    <div id="language">
      <select
        className="control-right"
        onChange={Set_Lang_Inner}
        value={Global.Language}
        id="languageSelector"
      >
        {(() => {
          const options = [];

          Object.keys(languages).forEach((key) => {
            options.push(
              <option value={languages[key]} key={key}>
                {languages[key]}
              </option>
            );
          });

          return options;
        })()}
      </select>
    </div>
  );
};
