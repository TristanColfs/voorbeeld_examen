import { Actions } from "./Language";

export const GlobalReducer = (state, action) => {
  switch (action.Type) {
    case Actions.Select_Language:
      let e = document.getElementById("languageSelector");
      let newLanguage = e.options[e.selectedIndex].value;

      alert(
        "global language set to: " + newLanguage + " from: " + state.Language
      );
      return {
        ...state,
        ...{ Language: newLanguage },
      };
    default:
      return state;
  }
};
