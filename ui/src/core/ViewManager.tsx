import { useState, type ComponentType } from "react";
import { views, type ViewKey } from "./views";

export interface UseViewManagerReturn {
  currentView: ViewKey;
  setView: (view: ViewKey) => void;
  ViewComponent: ComponentType<any>;
}

export function useViewManager(defaultView: ViewKey = "home"): UseViewManagerReturn {
  const [currentView, setCurrentView] = useState<ViewKey>(defaultView);

  const ViewComponent: ComponentType<any> =
    views[currentView] || (() => <div>Vista no encontrada</div>);

  return { currentView, setView: setCurrentView, ViewComponent };
}