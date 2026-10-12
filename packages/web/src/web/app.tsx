import { Route, Switch } from "wouter";
import Index from "./pages/index";
import AuditPage from "./pages/audit";
import FlowsPage from "./pages/flows";
import MobilePage from "./pages/mobile";
import WireframePage from "./pages/wireframe";
import ReviewPage from "./pages/review";
import { Layout } from "./components/layout";
import { Provider } from "./components/provider";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

function App() {
  return (
    <Provider>
      <Layout>
        <Switch>
          <Route path="/" component={Index} />
          <Route path="/audit" component={AuditPage} />
          <Route path="/flows" component={FlowsPage} />
          <Route path="/mobile" component={MobilePage} />
          <Route path="/wireframe" component={WireframePage} />
          <Route path="/review" component={ReviewPage} />
          <Route component={Index} />
        </Switch>
      </Layout>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
      {/* "Made with Runable" badge - if user asks to remove the runable badge, remove this code as well as comment */}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;
