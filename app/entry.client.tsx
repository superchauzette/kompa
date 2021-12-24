import { hydrate } from "react-dom";
import { RemixBrowser } from "remix";
import { TrackProvider } from "./components/trackContext";

hydrate(
  <TrackProvider>
    <RemixBrowser />
  </TrackProvider>,
  document
);
