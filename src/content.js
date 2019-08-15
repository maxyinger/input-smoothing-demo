import { AppStates } from "./constants";

export default {
  [AppStates.SIMPLE]: {
    key: AppStates.SIMPLE,
    headline: ["Simple", "& Smooth"],
    backgroundColor: "#0e1fef"
  },
  [AppStates.STRETCH]: {
    key: AppStates.STRETCH,
    headline: ["Squash", "& Stretch"],
    backgroundColor: "#ec8632"
  },
  [AppStates.DOUBLE]: {
    key: AppStates.DOUBLE,
    headline: ["Playful", "& Double"],
    backgroundColor: "#e63323"
  }
};

// Possible Pallettes
// const BackgroundColors = ["#0e1fef", "#ec8632", "#e63323"];
// const BackgroundColors = ["#2E4036", "#033F63", "#F06543"];
