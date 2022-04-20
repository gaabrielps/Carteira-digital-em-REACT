import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs'
import {App} from './App';


createServer({

  models: {
    transaction: Model,

  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'freelance de website',
          type: 'deposit',
          category: 'dev',
          amount: 6000,
          createdAt: new Date('2021-04-14 09:30:00'),
        },
        {
          id: 2,
          title: 'pc',
          type: 'withdraw',
          category: 'computador',
          amount: 5800,
          createdAt: new Date('2021-07-24 09:35:00'),
        }
      ],
    })
  },


  routes(){
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})


ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

