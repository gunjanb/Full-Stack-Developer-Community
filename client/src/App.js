import React from "react";
import { Provider } from "react-redux";
// import { StoreProvider } from './utils/GlobalState';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Home from "./pages/Home/Home.js";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login/Login.js";
import Signup from "./pages/Signup/Signup";
import Nav from "./components/Nav";
import Footer from "./components/Footer/Footer.js"
import UserDashboard from "./pages/UserDashboard/UserDashboard.js";
import UserProfile from "./pages/UserProfile/UserProfile.js";
import ContentPage from "./pages/ContentPage/ContentPage.js";
import store from "./utils/store";
import ContributionPage from "./pages/ContributionPage/ContributionPage";
import Detail from './pages/Detail/Detail';
import Success from './pages/Success/Success';
import OrderHistory from './pages/OrderHistory/OrderHistory';

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Provider store={store}>
            <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/user/:userId" component={UserDashboard} />
              <Route exact path="/contributionPage" component={ContributionPage} />
              <Route exact path="/success" component={Success} />
              <Route exact path="/orderHistory" component={OrderHistory} />
              <Route exact path="/products/:id" component={Detail} />
              <Route exact path="/profile/:profileId" component={UserProfile} />
              <Route exact path="/content/:contentId" component={ContentPage} />
              <Route exact path="/donate" component={ContributionPage} />
              <Route component={NoMatch} />
            </Switch>
            <Footer />
          </Provider>{" "}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
