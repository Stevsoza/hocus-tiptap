import HomeView from "../views/HomeView";
import ProfileView from "../views/ProfileView";
// import SettingsView from "../views/SettingsView";
import TiptapView from "../views/TiptapView";

export const views = {
  home: HomeView,
  profile: ProfileView,
  // settings: SettingsView,
  tiptap: TiptapView,
};

export type ViewKey = keyof typeof views;