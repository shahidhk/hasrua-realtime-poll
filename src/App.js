import React, { Component } from 'react';
import logo from './img/logo-white.svg';
import './App.css';
import { ApolloProvider } from 'react-apollo';
import client from './apollo';
import Poll from './Poll';
import { getUserId } from './session';
import hasura_logo from './img/hasura_logo_200.png';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {loading: true, userId: ''};
  }

  componentWillMount() {
    getUserId().then((userId) => {
      this.setState({loading: false, userId});
    });
  }

  render() {
    if (this.state.loading) return <p>Loading...</p>;
    return (
      <ApolloProvider client={client}>
        <div className="App">

          <header className="App-header displayFlex">
            <div className="container displayFlex">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Realtime Poll</h1>
            </div>
          </header>

          <Poll userId={this.state.userId}/>

          <footer className="App-footer displayFlex">
            <div className="container hasura-logo">
              <a href="https://hasura.io" target="_blank">
                Powered by <img src={hasura_logo} />
              </a>
            </div>
          </footer>

        </div>
      </ApolloProvider>
    );
  }
}

export default App;
