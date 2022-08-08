import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Reducer } from './Redux/Reducer';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';


const renderwithredux = (component, {initialstate, store = configureStore({reducer: Reducer}) } = {}) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store
  }
}
describe('Functional test', () => {
  it('Filter button is here', () => {
    renderwithredux(<App />)
    expect(screen.getByText('Filter')).toBeInTheDocument();
  });

  it('Data is coming', async () => {
    renderwithredux(<App />)
    const data = await waitFor(() => screen.getByText('ABC Business Center Hamburg HafenCity'))
    
    expect(data).toBeInTheDocument();
  });

  it('Execute filtering', async ()=> {
    const user = userEvent.setup()
    renderwithredux(<App />)
    await user.click(screen.getByPlaceholderText('Enter id'))
    await user.keyboard('60')
    await user.click(screen.getByText('Filter'))
    
    const data = await waitFor(() => screen.getByText('25hours Hotel Hamburg Number One'))
    
    expect(data).toBeInTheDocument();
    expect(await waitFor(() => screen.queryByText('ABC Business Center Hamburg HafenCity'))).not.toBeInTheDocument();
  })
})